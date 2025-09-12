from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Ticket(models.Model):
    ticket_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=False, unique=False)
    email = models.EmailField(null=False, unique=False)
    phone = PhoneNumberField(null=False, unique=False)

    REQUIRED_FIELDS = [
        "name",
        "email",
        "phone"
    ]

    class Meta:
        db_table = "user_tickets"
        verbose_name = "Заявка пользователя"
        verbose_name_plural = "Заявки пользователей"

    def __str__(self):
        return f"{self.name} {self.email} {self.phone}"


class FeedbackMessage(models.Model):
    """Сообщение из формы обратной связи"""
    name = models.CharField(max_length=150, blank=False, null=False, verbose_name="Имя")
    phone = PhoneNumberField(blank=True, null=True, verbose_name="Телефон")
    request = models.TextField(blank=False, null=False, verbose_name="Сообщение")
    source_page = models.CharField(max_length=512, blank=True, null=True, verbose_name="Страница")
    user_agent = models.CharField(max_length=512, blank=True, null=True, verbose_name="User-Agent")
    ip_address = models.GenericIPAddressField(blank=True, null=True, verbose_name="IP")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Создано")

    class Meta:
        db_table = "feedback_messages"
        ordering = ["-created_at"]
        verbose_name = "Сообщение обратной связи"
        verbose_name_plural = "Сообщения обратной связи"

    def __str__(self) -> str:
        return f"{self.created_at:%Y-%m-%d %H:%M} - {self.name}"
