import {Todo} from '../../../models/todo';
import {createReducer, on} from '@ngrx/store';
import {loadTodosSuccess, loadTodoSuccess, toggleTodo} from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: ReadonlyArray<Todo>;
  activeTodo?: Readonly<Todo>;
}

export const initialState: State = {
  todos: [],
};

export const todosReducer = createReducer(
  initialState,
  on(
    loadTodosSuccess,
    (state, {todos}) => ({
      ...state,
      todos
    })
  ),
  on(
    toggleTodo,
    (state, {todo}) => (
      {
        ...state,
        todos: state.todos.reduce<Todo[]>((acc, val) => {
          if (val.id === todo.id) {
            acc.push({
              ...val,
              isClosed: !val.isClosed,
              toggleTime: Date.now()
            });
          } else {
            acc.push(val);
          }
          return acc;
        }, [])
      })
  ),
  on(
    loadTodoSuccess,
    (state, {todo}) => (
      {
        ...state,
        activeTodo: todo
      })
  )
);
