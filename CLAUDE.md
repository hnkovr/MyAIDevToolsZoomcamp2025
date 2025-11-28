# AI Dev Tools Zoomcamp 2025 - Django TODO Application

## Project Overview
This project implements a Django TODO application as part of the AI Dev Tools Zoomcamp 2025, Homework 1.

## Homework Requirements
Build a Django TODO application with the following features:
- Create, edit, and delete TODOs
- Assign due dates
- Mark TODOs as resolved

## Homework Questions & Answers

### Question 1: Install Django
**Command used:** `pip install django` or `uv add django`

### Question 2: Project and App Configuration
**Answer:** `settings.py` - This file contains INSTALLED_APPS where the app must be registered

### Question 3: Django Models - Next Step
**Answer:** Run migrations - After creating models, need to run `python manage.py makemigrations` and `python manage.py migrate`

### Question 4: TODO Logic Location
**Answer:** `views.py` - Application logic is implemented in views

### Question 5: Template Directory Registration
**Answer:** `TEMPLATES['DIRS']` - Template directories are registered in settings.py under TEMPLATES configuration

### Question 6: Running Tests
**Answer:** `python manage.py test` - Django's built-in test command

## Frequently Used Commands

### Django Setup
```bash
# Install Django
uv add django

# Create Django project
django-admin startproject todoproject .

# Create Django app
python manage.py startapp todos

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

### Testing
```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test todos

# Run with verbosity
python manage.py test --verbosity=2
```

### Git & Documentation
```bash
# Update docs and commit
git add .
git commit -m "Update documentation and project files"
```

## Project Structure
```
MyAIDevToolsZoomcamp2025/
├── todoproject/          # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── todos/                # TODO app
│   ├── models.py        # TODO model definition
│   ├── views.py         # Application logic
│   ├── urls.py          # URL routing
│   ├── admin.py         # Admin configuration
│   ├── tests.py         # Test cases
│   └── templates/       # HTML templates
├── docs/                # Documentation
├── .claude/_RnD/        # R&D logs
└── manage.py            # Django management script
```

## Development Notes
- Using Python 3.13
- Using uv for package management
- Django version: (to be determined after installation)
