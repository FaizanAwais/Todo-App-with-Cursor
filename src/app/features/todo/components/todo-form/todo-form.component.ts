import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../../../services/todo.service';
import { Todo } from '../../../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  template: `
    <mat-card class="todo-form">
      <form [formGroup]="todoForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>New Todo</mat-label>
          <input matInput formControlName="title" placeholder="Enter todo title">
          <mat-error *ngIf="todoForm.get('title')?.hasError('required')">
            Title is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="3"></textarea>
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="!todoForm.valid">
          Add Todo
        </button>
      </form>
    </mat-card>
  `,
  styles: [`
    .todo-form {
      margin-bottom: 20px;
      padding: 20px;
    }

    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }

    button {
      width: 100%;
    }
  `]
})
export class TodoFormComponent {
  @Output() todoCreated = new EventEmitter<Todo>();
  todoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService
  ) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const newTodo: Todo = {
        ...this.todoForm.value,
        completed: false
      };

      this.todoService.createTodo(newTodo).subscribe({
        next: (todo) => {
          this.todoCreated.emit(todo);
          this.todoForm.reset();
        },
        error: () => {
          // Error handling is done by the interceptor
        }
      });
    }
  }
} 