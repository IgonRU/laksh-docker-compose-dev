from datetime import datetime
from django.db import utils
from django.db.models import Q
from django.http import HttpRequest, HttpResponseRedirect, JsonResponse
from django.contrib.auth import authenticate, update_session_auth_hash, login, logout
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.sessions.models import Session
from django.views.decorators.csrf import csrf_exempt
from .utils import decode_request_body
from .models import Ticket
from ujson import JSONDecodeError


@csrf_exempt
def add_ticket(request: HttpRequest):
    if request.method == 'POST':
        try:
            body = decode_request_body(request.body.decode("utf-8"))
        except JSONDecodeError:
            return JsonResponse({"status": 500, "message": "Invalid request body"}, status=500)
        name = body['name']
        email = body['email']
        phone = body['phone']
        ticket = Ticket(name=name, email=email, phone=phone)
        ticket.save()
        return JsonResponse({"status": 200, "message": "Ticket added successfully", "ticket_id": ticket.ticket_id},
                            status=200)
    else:
        return JsonResponse({"status": 300, "message": "Method not allowed"}, status=300)
