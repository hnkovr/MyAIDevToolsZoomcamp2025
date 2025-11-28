# Justfile for Django TODO Application
# AI Dev Tools Zoomcamp 2025 - Homework 1

# Default recipe to display help information
default:
    @just --list

# Install dependencies
install:
    uv sync

# Install Django
install-django:
    uv add django

# Create migrations
makemigrations:
    uv run python manage.py makemigrations

# Apply migrations
migrate:
    uv run python manage.py migrate

# Run both makemigrations and migrate
db-update: makemigrations migrate

# Run development server
run:
    uv run python manage.py runserver

# Run development server on custom port
run-port PORT:
    uv run python manage.py runserver {{PORT}}

# Create superuser
createsuperuser:
    uv run python manage.py createsuperuser

# Run all tests
test:
    uv run python manage.py test

# Run tests with verbose output
test-verbose:
    uv run python manage.py test --verbosity=2

# Run tests for specific app
test-app APP:
    uv run python manage.py test {{APP}}

# Run Django shell
shell:
    uv run python manage.py shell

# Check for issues
check:
    uv run python manage.py check

# Collect static files
collectstatic:
    uv run python manage.py collectstatic --noinput

# Clean Python cache files
clean:
    find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
    find . -type f -name "*.pyc" -delete
    find . -type f -name "*.pyo" -delete
    find . -type f -name ".DS_Store" -delete

# Clean database (WARNING: deletes db.sqlite3)
clean-db:
    rm -f db.sqlite3
    rm -rf todos/migrations/0*.py

# Reset database (clean, makemigrations, migrate)
reset-db: clean-db db-update

# Update documentation and commit changes
docs-update:
    git add docs/ CLAUDE.md README.md HOMEWORK_ANSWERS.md
    git commit -m "Update documentation"

# Run tests and generate coverage report
coverage:
    uv run coverage run --source='.' manage.py test
    uv run coverage report
    uv run coverage html

# Lint Python code with flake8
lint:
    uv run flake8 todos/ todoproject/

# Format code with black
format:
    uv run black todos/ todoproject/

# Check code formatting
format-check:
    uv run black --check todos/ todoproject/

# Security check
security:
    uv run python manage.py check --deploy

# Show migrations status
showmigrations:
    uv run python manage.py showmigrations

# Create a new Django app
startapp APP:
    uv run python manage.py startapp {{APP}}

# Git: status
git-status:
    git status

# Git: add all and commit
git-commit MESSAGE:
    git add -A
    git commit -m "{{MESSAGE}}"

# Git: add all, commit, and push
git-push MESSAGE:
    git add -A
    git commit -m "{{MESSAGE}}"
    git push origin main

# Full development setup (install, migrate, createsuperuser)
setup: install migrate
    @echo "Setup complete! Now create a superuser:"
    @just createsuperuser

# Full test and check before commit
pre-commit: clean test check
    @echo "All checks passed! Ready to commit."

# Quick development workflow: migrate and run server
dev: migrate run

# CI/CD: Run all checks
ci: clean test check security
    @echo "All CI checks passed!"

# Show Django version
version:
    uv run python -c "import django; print(f'Django version: {django.get_version()}')"

# Show project info
info:
    @echo "=== Django TODO Application ==="
    @echo "Project: AI Dev Tools Zoomcamp 2025 - Homework 1"
    @echo ""
    @just version
    @echo ""
    @echo "Python version:"
    @python3 --version
    @echo ""
    @echo "Git branch:"
    @git branch --show-current
    @echo ""
    @echo "Git status:"
    @git status --short

# Open Django admin in browser (macOS)
admin:
    open http://127.0.0.1:8000/admin/

# Open main app in browser (macOS)
open:
    open http://127.0.0.1:8000/

# Backup database
backup:
    cp db.sqlite3 "db.sqlite3.backup.$(date +%Y%m%d_%H%M%S)"

# Restore database from latest backup
restore:
    #!/usr/bin/env bash
    LATEST_BACKUP=$(ls -t db.sqlite3.backup.* 2>/dev/null | head -1)
    if [ -n "$LATEST_BACKUP" ]; then
        cp "$LATEST_BACKUP" db.sqlite3
        echo "Restored from $LATEST_BACKUP"
    else
        echo "No backup found"
        exit 1
    fi

# Show all TODO items in database
show-todos:
    uv run python manage.py shell -c "from todos.models import Todo; [print(f'{t.id}: {t.title} - Resolved: {t.is_resolved}') for t in Todo.objects.all()]"

# Count TODO items
count-todos:
    uv run python manage.py shell -c "from todos.models import Todo; print(f'Total TODOs: {Todo.objects.count()}'); print(f'Pending: {Todo.objects.filter(is_resolved=False).count()}'); print(f'Completed: {Todo.objects.filter(is_resolved=True).count()}')"
