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

## Using Just (Task Runner)

This project includes a Justfile for easy task automation. Install `just` if you haven't already:
```bash
# macOS
brew install just

# Linux
cargo install just
```

### Quick Start with Just
```bash
# Show all available commands
just

# Full setup (install deps, run migrations)
just setup

# Run development server
just run

# Run tests
just test

# Development workflow (migrate + run server)
just dev
```

### Common Just Commands
```bash
just install              # Install dependencies
just migrate             # Run migrations
just test                # Run all tests
just test-verbose        # Run tests with verbose output
just run                 # Run development server
just shell               # Open Django shell
just clean               # Clean Python cache files
just info                # Show project information
just pre-commit          # Run all checks before commit
```

See `just --list` for all available commands or check the Justfile.

## Frequently Used Commands

### Django Setup
```bash
# Install Django
uv add django
# OR with Just:
just install-django

# Create Django project
django-admin startproject todoproject .

# Create Django app
python manage.py startapp todos
# OR with Just:
just startapp todos

# Run migrations
python manage.py makemigrations
python manage.py migrate
# OR with Just:
just db-update

# Create superuser
python manage.py createsuperuser
# OR with Just:
just createsuperuser

# Run development server
python manage.py runserver
# OR with Just:
just run
```

### Testing
```bash
# Run all tests
python manage.py test
# OR with Just:
just test

# Run specific app tests
python manage.py test todos
# OR with Just:
just test-app todos

# Run with verbosity
python manage.py test --verbosity=2
# OR with Just:
just test-verbose
```

### Git & Documentation
```bash
# Update docs and commit
git add .
git commit -m "Update documentation and project files"
# OR with Just:
just git-commit "Update documentation and project files"

# Add, commit, and push
just git-push "Update documentation and project files"
```

### Project Maintenance
```bash
# Clean Python cache files
just clean

# Check project for issues
just check

# Run pre-commit checks
just pre-commit

# Show project info
just info

# Backup database
just backup

# Show all TODOs in database
just show-todos

# Count TODOs
just count-todos
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
