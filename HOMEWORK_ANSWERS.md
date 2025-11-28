# AI Dev Tools Zoomcamp 2025 - Homework 1 Answers

## Project Information
- **Student:** [Your Name]
- **Repository:** https://github.com/hnkovr/MyAIDevToolsZoomcamp2025
- **Date:** 2025-11-29

## Overview
This project implements a Django TODO application as required for Homework 1 of the AI Dev Tools Zoomcamp 2025.

## Homework Answers

### Question 1: Install Django
**Question:** What command was used to install Django?

**Answer:** `uv add django`

**Explanation:** Using the `uv` package manager, I installed Django with the command `uv add django`. This added Django 5.2.8 to the project dependencies and updated the `pyproject.toml` file.

---

### Question 2: Project and App Configuration
**Question:** After creating a Django project and app, which file must be edited to register the app?

**Answer:** `settings.py`

**Explanation:** The Django app must be registered in the `INSTALLED_APPS` list located in the `todoproject/settings.py` file. I added `"todos"` to this list on line 40 of settings.py.

**Code location:** `todoproject/settings.py:40`

---

### Question 3: Django Models - Next Step
**Question:** After implementing models for the TODO application, what is the next required step?

**Answer:** Run migrations

**Explanation:** After creating the model in `todos/models.py`, the next step is to create and apply migrations:
1. `python manage.py makemigrations` - Creates migration files
2. `python manage.py migrate` - Applies migrations to the database

This creates the database tables based on the model definition.

**Commands executed:**
```bash
uv run python manage.py makemigrations
uv run python manage.py migrate
```

---

### Question 4: TODO Logic Location
**Question:** Where should the application logic be implemented?

**Answer:** `views.py`

**Explanation:** The application logic for handling TODO operations (create, read, update, delete, toggle) is implemented in `todos/views.py`. This file contains:
- `TodoListView` - Display all TODOs
- `TodoCreateView` - Create new TODOs
- `TodoUpdateView` - Edit existing TODOs
- `TodoDeleteView` - Delete TODOs
- `toggle_todo` - Toggle TODO resolved status

**Code location:** `todos/views.py:1-41`

---

### Question 5: Template Directory Registration
**Question:** Where do you register the template directory?

**Answer:** `TEMPLATES['DIRS']`

**Explanation:** Template directories are registered in the `TEMPLATES` configuration in `settings.py`. Specifically, in the `DIRS` list within the `TEMPLATES` dictionary. I added `BASE_DIR / "templates"` to this list.

**Code location:** `todoproject/settings.py:58`

---

### Question 6: Running Tests
**Question:** What is the command for running tests?

**Answer:** `python manage.py test`

**Explanation:** Django's built-in test command is used to run tests. The full command I used was:
```bash
uv run python manage.py test
```

This runs all tests in the `todos/tests.py` file. All 14 tests passed successfully:
- 3 model tests
- 9 view tests
- 2 form tests

---

## Application Features

### Implemented Requirements
- **Create TODOs:** Users can create new TODO items with title, description, and due date
- **Edit TODOs:** Users can update existing TODO items
- **Delete TODOs:** Users can delete TODO items with confirmation
- **Assign Due Dates:** Due dates can be set for each TODO
- **Mark as Resolved:** TODOs can be marked as completed/resolved

### Additional Features
- Separate columns for pending and completed tasks
- Visual indication of overdue tasks (red border)
- Strike-through styling for completed tasks
- Quick toggle button to mark tasks as done/pending
- Bootstrap-based responsive UI
- Admin panel integration for backend management

## Project Structure
```
MyAIDevToolsZoomcamp2025/
├── todoproject/              # Django project settings
│   ├── settings.py          # Project configuration
│   ├── urls.py              # URL routing
│   └── wsgi.py              # WSGI configuration
├── todos/                    # TODO application
│   ├── models.py            # Todo model (Question 3)
│   ├── views.py             # Application logic (Question 4)
│   ├── forms.py             # Todo form
│   ├── urls.py              # App URL routing
│   ├── admin.py             # Admin configuration
│   ├── tests.py             # Test cases (Question 6)
│   └── migrations/          # Database migrations
├── templates/                # HTML templates (Question 5)
│   ├── base.html            # Base template
│   └── todos/
│       ├── home.html        # TODO list view
│       ├── todo_form.html   # Create/Edit form
│       └── todo_confirm_delete.html
├── docs/                     # Documentation
│   ├── TODO.md
│   ├── CLAUDE-curr-status.md
│   ├── .PROMPTS-LOG.md
│   └── PROMPTS-LOG-ru.md
├── CLAUDE.md                 # Project instructions
├── HOMEWORK_ANSWERS.md       # This file
├── manage.py                 # Django management script
└── pyproject.toml            # Project dependencies

## Running the Application

### Setup
```bash
# Install dependencies
uv sync

# Run migrations
uv run python manage.py migrate

# Create superuser (optional)
uv run python manage.py createsuperuser

# Run development server
uv run python manage.py runserver
```

### Access Points
- **Main Application:** http://127.0.0.1:8000/
- **Admin Panel:** http://127.0.0.1:8000/admin/

### Running Tests
```bash
uv run python manage.py test
```

## Technologies Used
- **Python:** 3.13
- **Django:** 5.2.8
- **Database:** SQLite3
- **Package Manager:** uv
- **CSS Framework:** Bootstrap 5.1.3

## Learning Outcomes
Through this homework, I learned:
1. How to set up a Django project from scratch
2. Django's MVT (Model-View-Template) architecture
3. Creating and applying database migrations
4. Implementing CRUD operations using Class-Based Views
5. Django's template system and template inheritance
6. Writing comprehensive tests for Django applications
7. Using AI assistance effectively for web development

## Submission
- GitHub Repository: [Add your GitHub URL]
- Submission Portal: https://courses.datatalks.club/ai-dev-tools-2025/homework/hw1
