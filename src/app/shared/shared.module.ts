import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoModalComponent } from './todo-modal/todo-modal.component';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    TodoModalComponent
  ],
  exports: [
    TodoModalComponent
  ]
})
export class SharedModule { }
