from django.test import TestCase, Client
from django.urls import reverse
from datetime import date, timedelta
from .models import Todo


class TodoModelTest(TestCase):
    def setUp(self):
        self.todo = Todo.objects.create(
            title="Test Todo",
            description="Test Description",
            due_date=date.today() + timedelta(days=7),
            is_resolved=False
        )

    def test_todo_creation(self):
        self.assertEqual(self.todo.title, "Test Todo")
        self.assertEqual(self.todo.description, "Test Description")
        self.assertFalse(self.todo.is_resolved)
        self.assertIsNotNone(self.todo.created_at)

    def test_todo_str_method(self):
        self.assertEqual(str(self.todo), "Test Todo")

    def test_todo_ordering(self):
        todo2 = Todo.objects.create(title="Newer Todo")
        todos = Todo.objects.all()
        self.assertEqual(todos[0], todo2)
        self.assertEqual(todos[1], self.todo)


class TodoViewsTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.todo = Todo.objects.create(
            title="Test Todo",
            description="Test Description",
            due_date=date.today() + timedelta(days=7)
        )

    def test_todo_list_view(self):
        response = self.client.get(reverse('todo_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Test Todo")
        self.assertTemplateUsed(response, 'todos/home.html')

    def test_todo_create_view_get(self):
        response = self.client.get(reverse('todo_create'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'todos/todo_form.html')

    def test_todo_create_view_post(self):
        data = {
            'title': 'New Todo',
            'description': 'New Description',
            'due_date': date.today() + timedelta(days=3),
            'is_resolved': False
        }
        response = self.client.post(reverse('todo_create'), data)
        self.assertEqual(response.status_code, 302)
        self.assertTrue(Todo.objects.filter(title='New Todo').exists())

    def test_todo_update_view_get(self):
        response = self.client.get(reverse('todo_update', args=[self.todo.pk]))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'todos/todo_form.html')

    def test_todo_update_view_post(self):
        data = {
            'title': 'Updated Todo',
            'description': 'Updated Description',
            'due_date': date.today() + timedelta(days=5),
            'is_resolved': True
        }
        response = self.client.post(reverse('todo_update', args=[self.todo.pk]), data)
        self.assertEqual(response.status_code, 302)
        self.todo.refresh_from_db()
        self.assertEqual(self.todo.title, 'Updated Todo')
        self.assertTrue(self.todo.is_resolved)

    def test_todo_delete_view_get(self):
        response = self.client.get(reverse('todo_delete', args=[self.todo.pk]))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'todos/todo_confirm_delete.html')

    def test_todo_delete_view_post(self):
        response = self.client.post(reverse('todo_delete', args=[self.todo.pk]))
        self.assertEqual(response.status_code, 302)
        self.assertFalse(Todo.objects.filter(pk=self.todo.pk).exists())

    def test_toggle_todo_view(self):
        self.assertFalse(self.todo.is_resolved)
        response = self.client.get(reverse('todo_toggle', args=[self.todo.pk]))
        self.assertEqual(response.status_code, 302)
        self.todo.refresh_from_db()
        self.assertTrue(self.todo.is_resolved)

    def test_empty_todo_list(self):
        Todo.objects.all().delete()
        response = self.client.get(reverse('todo_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "No todos yet!")


class TodoFormTest(TestCase):
    def test_valid_form(self):
        from .forms import TodoForm
        data = {
            'title': 'Test Todo',
            'description': 'Test Description',
            'due_date': date.today() + timedelta(days=7),
            'is_resolved': False
        }
        form = TodoForm(data=data)
        self.assertTrue(form.is_valid())

    def test_form_missing_title(self):
        from .forms import TodoForm
        data = {
            'description': 'Test Description',
            'due_date': date.today() + timedelta(days=7),
            'is_resolved': False
        }
        form = TodoForm(data=data)
        self.assertFalse(form.is_valid())
        self.assertIn('title', form.errors)
