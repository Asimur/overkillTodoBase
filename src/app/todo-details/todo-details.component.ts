import {Component, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {activeTodo} from '../shared/stores/todos/selectors';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {AsyncPipe, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, AsyncPipe, NgIf, RouterLink]
})
export class TodoDetailsComponent {
  private readonly store = inject(Store);
  readonly todo$ = this.store.select(activeTodo);
}
