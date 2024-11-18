import { Injectable } from '@angular/core';
import { Todo } from '../shared/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: Todo[] = []

  constructor() {
    this.todos = this.getTodos()
  }

  getTodos(): Todo[] {

    if (typeof window !== 'undefined' && window.localStorage) {
      const todosString = localStorage.getItem('todos');

      return todosString ? JSON.parse(todosString) : [];
    }
    return [];
  }

  getTodo(id: number): Todo[] {
    let list = this.todos
    let todo = list.filter(todo => todo.id == id)

    return todo
  }

  addTodo(newTodo: Todo): void {
    this.todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(this.todos))

  }

  changeTodoStatus(id: number, status: boolean): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = status;
      localStorage.setItem("todos", JSON.stringify(this.todos))

    }
  }

  editTodo(id: number, text: string): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.title = text;
      localStorage.setItem("todos", JSON.stringify(this.todos))
    }
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id)
    localStorage.setItem("todos", JSON.stringify(this.todos))


  }
}
