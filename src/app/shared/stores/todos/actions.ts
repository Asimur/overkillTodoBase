import { createAction, props } from '@ngrx/store';
import { Todo } from '../../../models/todo';

export const loadTodos = createAction('[Todos] Load todos');

export const loadTodosSuccess = createAction(
  '[Todos] Load todos success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailed = createAction('[Todos] Load todos failed');

export const toggleTodo = createAction(
  '[Todos] toggle todo',
  props<{ todo: Todo }>()
);

export const getTodoById = createAction(
  '[Todo] Get todo by ID',
  props<{ id: number }>()
);

export const loadTodoSuccess = createAction(
  '[Todos] Load todo success',
  props<{ todo: Todo | undefined }>()
);

export const loadTodoFailed = createAction('[Todos] Load todo failed');



