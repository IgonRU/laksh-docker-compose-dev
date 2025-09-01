#!/usr/bin/env python
import os
import sys
import django

sys.path.append('/app/src')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from wagtail.images.models import Image
from projects.models import Project, Plant

print("=== Checking Images ===")
print(f"Total Wagtail images: {Image.objects.count()}")

for img in Image.objects.all():
    print(f"Image {img.id}: {img.title} - {img.file.url if img.file else 'No file'}")

print("\n=== Checking Projects ===")
for project in Project.objects.all():
    print(f"Project {project.id}: {project.title}")
    print(f"  Main image: {project.image.title if project.image else 'None'}")

print("\n=== Checking Plants ===")
for plant in Plant.objects.all():
    print(f"Plant {plant.id}: {plant.name}")
    print(f"  Image: {plant.image.title if plant.image else 'None'}")
