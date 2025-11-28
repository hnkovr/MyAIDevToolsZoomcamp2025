# Django TODO Application

**AI Dev Tools Zoomcamp 2025 - Homework 1**

A full-featured TODO application built with Django, demonstrating CRUD operations, database management, and modern web development practices.

## Features

- Create, read, update, and delete TODO items
- Set due dates for tasks
- Mark tasks as resolved/completed
- Visual separation of pending and completed tasks
- Overdue task indicators
- Responsive Bootstrap UI
- Django admin panel integration
- Comprehensive test suite

## Quick Start

### Prerequisites
- Python 3.13
- uv package manager
- (Optional) [just](https://github.com/casey/just) - command runner for task automation

### Installation

#### Option A: Using Just (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/hnkovr/MyAIDevToolsZoomcamp2025.git
cd MyAIDevToolsZoomcamp2025
```

2. Install just (if not already installed):
```bash
# macOS
brew install just

# Linux
cargo install just
```

3. Run full setup:
```bash
just setup
```

4. Start the development server:
```bash
just run
```

5. Open your browser and navigate to:
   - Main app: http://127.0.0.1:8000/
   - Admin panel: http://127.0.0.1:8000/admin/

#### Option B: Manual Setup

1. Clone the repository:
```bash
git clone https://github.com/hnkovr/MyAIDevToolsZoomcamp2025.git
cd MyAIDevToolsZoomcamp2025
```

2. Install dependencies:
```bash
uv sync
```

3. Run migrations:
```bash
uv run python manage.py migrate
```

4. (Optional) Create a superuser for admin access:
```bash
uv run python manage.py createsuperuser
```

5. Start the development server:
```bash
uv run python manage.py runserver
```

6. Open your browser and navigate to:
   - Main app: http://127.0.0.1:8000/
   - Admin panel: http://127.0.0.1:8000/admin/

## Using Just Commands

This project includes a Justfile with many useful commands. Run `just` to see all available commands.

### Common Commands

```bash
just                  # Show all available commands
just run              # Run development server
just test             # Run all tests
just test-verbose     # Run tests with verbose output
just dev              # Run migrations and start server
just shell            # Open Django shell
just clean            # Clean Python cache files
just info             # Show project information
just pre-commit       # Run all checks before committing
```

See the [Justfile](Justfile) for all available commands.

## Running Tests

Run the complete test suite:
```bash
# Using Just
just test

# Or manually
uv run python manage.py test
```

Run with verbose output:
```bash
just test-verbose
# Or manually
uv run python manage.py test --verbosity=2
```

## Project Structure

```
MyAIDevToolsZoomcamp2025/
├── todoproject/              # Django project configuration
│   ├── settings.py          # Main settings
│   ├── urls.py              # Project URL routing
│   └── wsgi.py              # WSGI configuration
├── todos/                    # TODO application
│   ├── models.py            # Todo model
│   ├── views.py             # View logic
│   ├── forms.py             # Todo form
│   ├── urls.py              # App URL routing
│   ├── admin.py             # Admin configuration
│   └── tests.py             # Test suite
├── templates/                # HTML templates
│   ├── base.html            # Base template
│   └── todos/               # Todo-specific templates
├── docs/                     # Documentation
├── CLAUDE.md                 # Development instructions
├── HOMEWORK_ANSWERS.md       # Homework answers
└── README.md                 # This file
```

## Documentation

- **Homework Answers:** See [HOMEWORK_ANSWERS.md](HOMEWORK_ANSWERS.md)
- **Development Guide:** See [CLAUDE.md](CLAUDE.md)
- **Project Status:** See [docs/CLAUDE-curr-status.md](docs/CLAUDE-curr-status.md)

## Technology Stack

- **Backend:** Django 5.2.8
- **Database:** SQLite3
- **Frontend:** Bootstrap 5.1.3
- **Package Manager:** uv
- **Python Version:** 3.13

## Development

### Key Files

- `todos/models.py` - Defines the Todo model with fields for title, description, due_date, and is_resolved
- `todos/views.py` - Contains view classes for list, create, update, delete operations
- `todos/forms.py` - Django ModelForm for Todo with Bootstrap styling
- `todos/tests.py` - Comprehensive test suite with 14 tests

### Database Model

The `Todo` model includes:
- `title` (CharField) - Required, max 200 characters
- `description` (TextField) - Optional
- `due_date` (DateField) - Optional
- `is_resolved` (BooleanField) - Default False
- `created_at` (DateTimeField) - Auto-generated
- `updated_at` (DateTimeField) - Auto-updated

## Testing

The project includes comprehensive tests covering:
- Model creation and methods
- All CRUD views
- Form validation
- Edge cases (empty lists, missing data)

All 14 tests pass successfully.

## License

This project is part of the AI Dev Tools Zoomcamp 2025 educational program.

## Acknowledgments

- DataTalks.Club for organizing the AI Dev Tools Zoomcamp
- Django documentation and community
- Bootstrap team for the CSS framework
