from datetime import datetime
from django.db import utils
from django.db.models import Q
from django.http import HttpRequest, HttpResponseRedirect
from django.contrib.auth import authenticate, update_session_auth_hash, login, logout
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.sessions.models import Session
from django.views.decorators.csrf import csrf_exempt
from .utils import decode_request_body
from .models import Ticket, FeedbackMessage
from ujson import JSONDecodeError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from pages.models import MainPageSettings
from projects.models import Project
from projects.serializers import ProjectListSerializer
from django.core.mail import send_mail, BadHeaderError
from django.conf import settings


@csrf_exempt
@api_view(["POST"]) 
@permission_classes([AllowAny])
@authentication_classes([])
def add_ticket(request: HttpRequest):
    try:
        body = decode_request_body(request.body.decode("utf-8"))
    except JSONDecodeError:
        return Response({"message": "Invalid request body"}, status=status.HTTP_400_BAD_REQUEST)
    name = body.get('name')
    email = body.get('email')
    phone = body.get('phone')
    if not all([name, email, phone]):
        return Response({"message": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)
    ticket = Ticket(name=name, email=email, phone=phone)
    ticket.save()
    return Response({"ticket_id": ticket.ticket_id, "message": "Ticket added successfully"}, status=status.HTTP_201_CREATED)


@csrf_exempt
@api_view(["POST"]) 
@permission_classes([AllowAny])
@authentication_classes([])
def submit_feedback(request: HttpRequest):
    try:
        body = decode_request_body(request.body.decode("utf-8"))
    except JSONDecodeError:
        return Response({"ok": False, "message": "Invalid request body"}, status=status.HTTP_400_BAD_REQUEST)

    name = (body.get('name') or '').strip()
    request_text = (body.get('request') or '').strip()
    phone = (body.get('phone') or '').strip()
    source_page = (body.get('source_page') or '').strip()

    if not name or not request_text:
        return Response({"ok": False, "message": "Missing required fields", "errors": {
            "name": ["Обязательное поле"] if not name else [],
            "request": ["Обязательное поле"] if not request_text else []
        }}, status=status.HTTP_400_BAD_REQUEST)

    ip = request.META.get('REMOTE_ADDR')
    ua = request.META.get('HTTP_USER_AGENT', '')[:512]

    feedback = FeedbackMessage(
        name=name,
        phone=phone or None,
        request=request_text,
        source_page=source_page or None,
        user_agent=ua,
        ip_address=ip,
    )
    feedback.save()

    # Пытаемся отправить уведомление на почту
    try:
        subject = "Новая заявка с сайта Laksh"
        message_lines = [
            f"Имя: {name}",
            f"Телефон: {phone or '—'}",
            f"Страница: {source_page or '—'}",
            f"IP: {ip}",
            f"User-Agent: {ua}",
            "",
            "Сообщение:",
            request_text,
        ]
        send_mail(
            subject,
            "\n".join(message_lines),
            getattr(settings, 'DEFAULT_FROM_EMAIL', 'no-reply@laksh.ru'),
            getattr(settings, 'FEEDBACK_NOTIFY_TO', ['mail@laksh.ru']),
            fail_silently=True,
        )
    except BadHeaderError:
        pass

    return Response({"ok": True, "message": "Спасибо! Мы свяжемся с вами."}, status=status.HTTP_201_CREATED)


@api_view(["GET"]) 
@permission_classes([AllowAny])
@authentication_classes([])
def mainpage(request: HttpRequest):
    """Отдаёт настройки главной страницы и список проектов для портфолио.

    Требования:
    - В админке настройки позволяют выбрать проекты (только с mainpage=True),
      но в API всегда отдаём проекты, у которых mainpage=True.
    """
    # Настройки главной страницы: читаем из Wagtail Settings (глобальные)
    settings_obj = MainPageSettings.objects.first()
    title = settings_obj.title if settings_obj else ''
    lead = settings_obj.lead if settings_obj else ''

    qs = Project.objects.filter(mainpage=True).order_by('-created_at')
    items = ProjectListSerializer(qs, many=True).data

    return Response({
        'title': title,
        'lead': lead,
        'portfolio': items
    }, status=status.HTTP_200_OK)
