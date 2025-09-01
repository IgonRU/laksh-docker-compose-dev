import os
import sys
import django

sys.path.append('/app/src')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from wagtail.images.models import Image
from projects.models import Project, Plant
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
import requests
from urllib.parse import urlparse

def download_and_create_image(image_url, title):
    try:
        response = requests.get(image_url)
        response.raise_for_status()
        
        filename = os.path.basename(urlparse(image_url).path)
        if not filename or '.' not in filename:
            filename = f"{title.lower().replace(' ', '_')}.jpg"
        
        with NamedTemporaryFile(delete=False, suffix=os.path.splitext(filename)[1]) as temp_file:
            temp_file.write(response.content)
            temp_file.flush()
            
            with open(temp_file.name, 'rb') as f:
                wagtail_image = Image.objects.create(
                    title=title,
                    file=File(f, name=filename)
                )
            
            os.unlink(temp_file.name)
            return wagtail_image
    except Exception as e:
        print(f"Error downloading image {image_url}: {e}")
        return None

def update_project_images():
    print("Updating project images...")
    
    try:
        project = Project.objects.get(id=1)
        print(f"Found project: {project.title}")
        
        if not project.image:
            print("Updating main project image...")
            main_image_url = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80"
            main_image = download_and_create_image(main_image_url, f"Main image for {project.title}")
            if main_image:
                project.image = main_image
                project.save()
                print(f"Updated main project image: {main_image.title}")
        
        print("Updating plant images...")
        plant_image_urls = [
            "https://images.unsplash.com/photo-1615485923070-4d4b1b4b2c12?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600718374942-b3e6f0d5eafb?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1615485923255-2c1a6d2e2e7e?auto=format&fit=crop&w=800&q=80"
        ]
        
        plants = Plant.objects.all()
        for i, plant in enumerate(plants):
            if not plant.image and i < len(plant_image_urls):
                print(f"Updating image for plant: {plant.name}")
                plant_image = download_and_create_image(plant_image_urls[i], f"Image for {plant.name}")
                if plant_image:
                    plant.image = plant_image
                    plant.save()
                    print(f"Updated plant image: {plant_image.title}")
        
        
    except Project.DoesNotExist:
    except Exception as e:
        print(f"Error updating project images: {e}")

if __name__ == '__main__':
    update_project_images()
