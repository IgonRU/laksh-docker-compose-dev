from django.db import migrations, models
import django.db.models.deletion


def forwards(apps, schema_editor):
    Service = apps.get_model('services', 'Service')
    ServiceGroupItem = apps.get_model('services', 'ServiceGroupItem')

    group_items = ServiceGroupItem.objects.select_related('service').order_by('sort_order', 'id')
    for item in group_items:
        service = item.service
        if service.group_id:
            continue
        service.group_id = item.group_id
        service.sort_order = item.sort_order or 0
        service.save(update_fields=['group', 'sort_order'])


def backwards(apps, schema_editor):
    Service = apps.get_model('services', 'Service')
    ServiceGroupItem = apps.get_model('services', 'ServiceGroupItem')

    services = Service.objects.exclude(group__isnull=True)
    for service in services:
        ServiceGroupItem.objects.create(
            group_id=service.group_id,
            service_id=service.id,
            sort_order=service.sort_order,
        )


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='group',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='services', to='services.servicegroup', verbose_name='Группа'),
        ),
        migrations.AddField(
            model_name='service',
            name='sort_order',
            field=models.IntegerField(default=0, verbose_name='Порядок в группе'),
        ),
        migrations.RunPython(forwards, backwards),
        migrations.DeleteModel(
            name='ServiceGroupItem',
        ),
    ]


