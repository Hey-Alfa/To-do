import { Component, OnInit, signal } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { TodoService } from '../services/todo.service';
import { Todo } from '../shared/models/todo.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = []
  darkMode: boolean = false
  isShowDropDown: boolean = false
  listOfTodos = signal<any>([])
  filterListTodo: any
  isModalVisible: boolean = false
  isNewNote = signal(true)
  hasId = signal<number>(0)
  hasNote = signal<string>('')

  constructor(private themeService: ThemeService, private todoService: TodoService) {

  }

  ngOnInit(): void {
    this.getListTodo()
  }

  getListTodo() {
    this.listOfTodos.set(this.todoService.getTodos())
    this.filterListTodo = this.listOfTodos()

  }

  onRemove(id: number): void {
    this.todoService.removeTodo(id)
  }



  toggleTheme(): void {
    const isDarkMode = this.themeService.isDarkMode()
    this.isShowDropDown = false
    this.themeService.setTheme(!isDarkMode)
    this.darkMode = !isDarkMode
  }

  openModal(params: boolean): void {
    this.isNewNote.set(params ? true : false)
    this.isShowDropDown = false
    this.isModalVisible = true;
  }

  closeModal(data: any): void {

    this.isModalVisible = false;
  }

  addTodo(todo: Todo): void {

    this.todoService.addTodo(todo)

    this.isModalVisible = false;
    this.listOfTodos.update((todos) => [...todos, todo]);
    this.filterListTodo = this.listOfTodos()

  }

  openEditModal(id: number, text: string): void {
    this.hasId.set(id)
    this.hasNote.set(text)
    this.openModal(false)
  }

  editTodo(text: string): void {

    this.todoService.editTodo(this.hasId(), text)
    const todo = this.listOfTodos().find((t: { id: number; }) => t.id === this.hasId());
    if (todo) {
      todo.title = text;
    }
    this.isModalVisible = false;
  }



  onCheckboxChange(id: number, event: Event): void {
    let isChecked = (event.target as HTMLInputElement).checked;
    this.todoService.changeTodoStatus(id, isChecked)
    const todo = this.listOfTodos().find((t: { id: number; }) => t.id === id);
    if (todo) {
      todo.completed = isChecked;
    }
  }

  romoveTodo(id: number): void {
    this.filterListTodo = this.listOfTodos().filter((todo: { id: number; }) => todo.id !== id)
    this.listOfTodos.set(this.filterListTodo)
    this.todoService.removeTodo(id)
  }

  filterTodos(type: string): void {
    this.isShowDropDown = false
    if (type == 'all') {
      this.filterListTodo = this.listOfTodos()
    }

    if (type == 'complete') {
      this.filterListTodo = this.listOfTodos().filter((todo: { completed: boolean; }) => todo.completed == true)
    }

    if (type == 'inComplete') {
      this.filterListTodo = this.listOfTodos().filter((todo: { completed: boolean; }) => todo.completed == false)
    }


  }

  onSearchChange(evt: any): void {
    let val = evt.target.value;
    if (val == '') {
      this.filterListTodo = this.listOfTodos()
    } else {
      this.filterListTodo = this.listOfTodos().filter((todo: { title: string; }) => todo.title.toLowerCase().includes(val.toLowerCase()))
    }
  }


}
