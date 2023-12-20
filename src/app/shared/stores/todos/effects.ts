import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {getTodoById, loadTodoFailed, loadTodos, loadTodosFailed, loadTodosSuccess, loadTodoSuccess} from './actions';
import {catchError, concatMap, map, mergeMap} from 'rxjs/operators';
import {TodoService} from '../../../services/todo.service';
import {ROUTER_NAVIGATION} from '@ngrx/router-store';
import {Store} from '@ngrx/store';
import {routeParams} from '../router/router.selectors';

@Injectable()
export class Effects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      mergeMap(() =>
        this.todoService.list().pipe(
          map((todos) => loadTodosSuccess({todos})),
          catchError(() => [loadTodosFailed()])
        )
      )
    )
  );

  getTodoByID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTodoById),
      concatMap(({id}) =>
        this.todoService.getTodoByID(id).pipe(
          map((todo) => loadTodoSuccess({todo})),
          catchError(() => [loadTodoFailed()])
        )
      )
    )
  );

  onRouteChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      concatLatestFrom(() => [this.store.select(routeParams)]),
      map(([, params]) => params.id ? getTodoById({id: params.id}) : loadTodoSuccess({todo: undefined}))
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService, private store: Store) {
  }
}
