import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { TodoService } from '../services/todo.service';
import { Todo } from '../shared/models/todo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = []
  darkMode: boolean = false
  isShowDropDown: boolean = false
  listOfTodo: any


  constructor(private themeService: ThemeService, private todoService: TodoService) {

  }

  ngOnInit(): void {
    // this.listOfTodo = [{
    //   id: 1,
    //   title: "this list ",
    //   completed: false,
    // }]
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


}
