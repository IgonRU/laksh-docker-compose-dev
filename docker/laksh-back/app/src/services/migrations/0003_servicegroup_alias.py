from django.db import migrations, models
from django.utils.text import slugify


def populate_aliases(apps, schema_editor):
    ServiceGroup = apps.get_model('services', 'ServiceGroup')

    existing_aliases = set(
        ServiceGroup.objects.exclude(alias__isnull=True).exclude(alias__exact='').values_list('alias', flat=True)
    )

    for group in ServiceGroup.objects.all().order_by('id'):
        if group.alias:
            continue

        base_alias = slugify(group.title) or f"group-{group.pk}"
        candidate = base_alias
        suffix = 2

        while candidate in existing_aliases:
            candidate = f"{base_alias}-{suffix}"
            suffix += 1

        group.alias = candidate
        group.save(update_fields=['alias'])
        existing_aliases.add(candidate)


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0002_service_group_relation'),
    ]

    operations = [
        migrations.RunSQL(
            sql="DROP INDEX IF EXISTS services_servicegroup_alias_edcd539b_like;",
            reverse_sql=migrations.RunSQL.noop,
        ),
        migrations.AddField(
            model_name='servicegroup',
            name='alias',
            field=models.SlugField(blank=True, db_index=False, max_length=200, null=True, verbose_name='Алиас'),
        ),
        migrations.RunPython(populate_aliases, migrations.RunPython.noop),
        migrations.AlterField(
            model_name='servicegroup',
            name='alias',
            field=models.SlugField(db_index=False, max_length=200, unique=True, verbose_name='Алиас'),
        ),
    ]


