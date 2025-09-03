from datetime import datetime
from django.db import utils
from django.db.models import Q
from django.http import HttpRequest, HttpResponseRedirect
from django.contrib.auth import authenticate, update_session_auth_hash, login, logout
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.sessions.models import Session
from django.views.decorators.csrf import csrf_exempt
from .utils import decode_request_body
from .models import Ticket
from ujson import JSONDecodeError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny


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
