import { Component, Input, Output, OnInit, inject } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-modal.component.html',
  styleUrl: './todo-modal.component.css'
})
export class TodoModalComponent {
  @Input() showModal: boolean = false;
  @Input() isNewNote: boolean = true;
  @Input() hasNote: string = '';
  @Output() closeModal: EventEmitter<string> = new EventEmitter<string>();
  @Output() addNewNote: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo: EventEmitter<string> = new EventEmitter<string>();

  userNote: string = ''

  constructor() {

  }

  ngOnChanges() {
    if (!this.isNewNote) {
      this.userNote = this.hasNote
    }

  }

  close() {
    let message: any = 'This is a massage from todo modal'
    this.closeModal.emit(message);
  }


  onMessageChange(newMessage: string): void {
    this.userNote = newMessage

  }

  addNote() {

    if (this.userNote == '') {

    } else {
      const addNewNote = {
        id: Math.floor(100000 + Math.random() * 900000),
        title: this.userNote,
        completed: false
      }
      console.log("addNewNote", addNewNote)
      this.addNewNote.emit(addNewNote);
      this.userNote = ''
    }

  }

  editNote() {
    this.editTodo.emit(this.userNote)
    this.userNote = ''
  }


}
