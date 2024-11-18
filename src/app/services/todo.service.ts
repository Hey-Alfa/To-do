import { Injectable } from '@angular/core';
import { Todo } from '../shared/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: Todo[] = []

  constructor() { }

  getTodos(): Todo[] {
    console.table(this.todos)
    return this.todos
  }

  addTodo(newTodo: Todo): void {
    this.todos.push(newTodo)
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }
}
