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
