import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../../services/todo.service';
import { Todo } from '../../../../models/todo.model';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-todo-list',
  template: `
    <div class="todo-container">
      <h1>Todo List</h1>
      <app-todo-form (todoCreated)="onTodoCreated($event)"></app-todo-form>
      
      <mat-card class="todo-list">
        <mat-list>
          <app-todo-item
            *ngFor="let todo of todos"
            [todo]="todo"
            (todoUpdated)="onTodoUpdated($event)"
            (todoDeleted)="onTodoDeleted($event)">
          </app-todo-item>
        </mat-list>
      </mat-card>
    </div>
  `,
  styles: [`
    .todo-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    h1 {
      text-align: center;
      margin-bottom: 30px;
      color: #3f51b5;
    }

    .todo-list {
      margin-top: 20px;
    }
  `]
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
      },
      error: (error) => {
        this.alertService.error('Failed to load todos');
      }
    });
  }

  onTodoCreated(todo: Todo): void {
    this.todos.unshift(todo);
    this.alertService.success('Todo created successfully');
  }

  onTodoUpdated(updatedTodo: Todo): void {
    const index = this.todos.findIndex(t => t.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.alertService.success('Todo updated successfully');
    }
  }

  onTodoDeleted(todoId: number): void {
    this.todos = this.todos.filter(t => t.id !== todoId);
    this.alertService.success('Todo deleted successfully');
  }
} 