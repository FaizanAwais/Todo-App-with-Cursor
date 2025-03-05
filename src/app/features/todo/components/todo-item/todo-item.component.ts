import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../../models/todo.model';
import { TodoService } from '../../../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  template: `
    <mat-list-item>
      <mat-checkbox
        [checked]="todo.completed"
        (change)="onToggleComplete()"
        color="primary">
      </mat-checkbox>
      
      <div class="todo-content" [class.completed]="todo.completed">
        <h3>{{ todo.title }}</h3>
        <p *ngIf="todo.description">{{ todo.description }}</p>
      </div>

      <button mat-icon-button color="warn" (click)="onDelete()">
        <mat-icon>delete</mat-icon>
      </button>
    </mat-list-item>
  `,
  styles: [`
    .todo-content {
      flex: 1;
      margin: 0 16px;
    }

    .completed {
      text-decoration: line-through;
      color: #888;
    }

    h3 {
      margin: 0;
      font-size: 16px;
    }

    p {
      margin: 4px 0 0;
      font-size: 14px;
      color: #666;
    }

    mat-list-item {
      height: auto !important;
      padding: 16px;
    }
  `]
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() todoUpdated = new EventEmitter<Todo>();
  @Output() todoDeleted = new EventEmitter<number>();

  constructor(private todoService: TodoService) { }

  onToggleComplete(): void {
    const updatedTodo = {
      ...this.todo,
      completed: !this.todo.completed
    };

    this.todoService.updateTodo(this.todo.id!, updatedTodo).subscribe({
      next: (todo) => {
        this.todoUpdated.emit(todo);
      },
      error: () => {
        // Error handling is done by the interceptor
      }
    });
  }

  onDelete(): void {
    if (this.todo.id) {
      this.todoService.deleteTodo(this.todo.id).subscribe({
        next: () => {
          this.todoDeleted.emit(this.todo.id);
        },
        error: () => {
          // Error handling is done by the interceptor
        }
      });
    }
  }
} 