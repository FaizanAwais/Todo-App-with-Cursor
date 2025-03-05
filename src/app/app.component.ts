import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>Todo App</span>
    </mat-toolbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
  `]
})
export class AppComponent {
  title = 'angular-todo-app';
} 