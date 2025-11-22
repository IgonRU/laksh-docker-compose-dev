import os
import sys
import django

sys.path.append('/app/src')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from wagtail.images.models import Image
from projects.models import Project
from django.core.files import File
import requests
import tempfile

def create_test_image():
    print('Creating test image...')
    
    # Download image
    url = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80'
    response = requests.get(url)
    
    # Create temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as temp_file:
        temp_file.write(response.content)
        temp_file.flush()
        
        # Create Wagtail image
        with open(temp_file.name, 'rb') as f:
            img = Image.objects.create(
                title='Test Project Image',
                file=File(f, name='test_project.jpg')
            )
        
        # Clean up
        os.unlink(temp_file.name)
    
    print(f'Created image: {img.title}')
    
    # Update project
    project = Project.objects.get(id=1)
    project.image = img
    project.save()
    print('Updated project image')

if __name__ == '__main__':
    create_test_image()
