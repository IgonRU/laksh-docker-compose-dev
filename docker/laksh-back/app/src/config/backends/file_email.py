from django.core.mail.backends.base import BaseEmailBackend
from django.core.mail.message import EmailMessage
from django.conf import settings
from datetime import datetime
import os


class FileEmailBackend(BaseEmailBackend):
    """
    Email backend that appends all outgoing emails to a single file.
    Intended for non-production environments.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Where to write logs. Default to /laksh-back/mail-sent.txt (mounted from host)
        self.output_path = getattr(
            settings,
            'FILE_EMAIL_OUTPUT',
            '/laksh-back/mail-sent.txt'
        )
        os.makedirs(os.path.dirname(self.output_path), exist_ok=True)

    def send_messages(self, email_messages):
        if not email_messages:
            return 0
        written = 0
        try:
            with open(self.output_path, 'a', encoding='utf-8') as f:
                for message in email_messages:
                    self._write_message(f, message)
                    written += 1
        except Exception:
            # Fail silently like console backend in dev
            return 0
        return written

    def _write_message(self, f, message: EmailMessage):
        timestamp = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')
        headers = [
            f"Time: {timestamp}",
            f"Subject: {message.subject}",
            f"From: {message.from_email}",
            f"To: {', '.join(message.to or [])}",
        ]
        if message.cc:
            headers.append(f"Cc: {', '.join(message.cc)}")
        if message.bcc:
            headers.append(f"Bcc: {', '.join(message.bcc)}")
        f.write("\n" + "=" * 80 + "\n")
        f.write("\n".join(headers) + "\n\n")
        # Message body
        if message.content_subtype == 'html' and message.alternatives:
            # Prefer plain version if provided among alternatives
            plain_alt = next((c for c, t in message.alternatives if t == 'text/plain'), None)
            if plain_alt:
                f.write(plain_alt)
            else:
                f.write(message.body)
        else:
            f.write(message.body)
        f.write("\n")


