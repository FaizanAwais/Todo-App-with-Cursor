import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent
  }
];

@NgModule({
  declarations: [
    TodoListComponent,
    TodoFormComponent,
    TodoItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TodoModule { } 