import {Component, inject, OnInit} from '@angular/core';
import {Todo} from '../models/todo';
import {Store} from '@ngrx/store';
import {selectTodos} from '../shared/stores/todos/selectors';
import {loadTodos, toggleTodo} from '../shared/stores/todos/actions';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AsyncPipe, NgClass, NgForOf} from '@angular/common';
import {RouterLinkWithHref} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatListModule, MatCheckboxModule, AsyncPipe, NgForOf, NgClass, RouterLinkWithHref]
})
export class TodoListComponent implements OnInit {
  private readonly store = inject(Store);

  protected readonly todos$ = this.store.select(selectTodos);

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }

  toggleTodo(todo: Todo): void {
    this.store.dispatch(toggleTodo({todo}));
  }
}
