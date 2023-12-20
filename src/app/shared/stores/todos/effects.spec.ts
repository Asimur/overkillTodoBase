import {TestBed} from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {Effects} from './effects';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of} from 'rxjs';
import {Actions} from '@ngrx/effects';
import {todosReducer} from './reducer';
import {TodoService} from '../../../services/todo.service';
import {cold, hot} from 'jasmine-marbles';
import {getTodoById, loadTodoFailed, loadTodos, loadTodosFailed, loadTodosSuccess, loadTodoSuccess} from './actions';
import {Todo} from '../../../models/todo';
import {BaseRouterStoreState, ROUTER_NAVIGATION, RouterNavigationAction, RouterNavigationPayload} from '@ngrx/router-store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {routeParams} from '../router/router.selectors';

export const fakeRouterNavigationAction = <T extends BaseRouterStoreState = BaseRouterStoreState>(
  routerState: Partial<T>
): RouterNavigationAction<T> => ({
  type: ROUTER_NAVIGATION,
  payload: {routerState, event: {id: 0}} as RouterNavigationPayload<T>,
});
describe('Effects', () => {
  let effects: Effects;
  let actions: Observable<Actions>;
  const todoService = jasmine.createSpyObj<TodoService>('TodoService', ['list', 'getTodoByID']);
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({todosStore: todosReducer})],
      providers: [
        Effects,
        provideMockActions(() => actions),
        {
          provide: TodoService,
          useValue: todoService,
        },
        provideMockStore({
          selectors: [
            {selector: routeParams, value: {id: 1}}
          ]
        })
      ],
    });

    effects = TestBed.inject(Effects);
    store = TestBed.inject(MockStore);
    todoService.getTodoByID.calls.reset();
    todoService.list.calls.reset();
  });

  describe('loadTodos$', () => {
    it('should dispatch loadTodosSuccess action when todoService.list return a result', () => {
      const mockedTodos: Todo[] = [{id: 1, title: 'aTitle', isClosed: true, toggleTime: 1000, description: 'A description'}];
      todoService.list.and.returnValue(of(mockedTodos));

      actions = hot('-a-', {
        a: loadTodos(),
      });
      const expected = cold('-b-', {
        b: loadTodosSuccess({todos: mockedTodos}),
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });

    it('should dispatch loadTodosFailed action when todoService.list fails', () => {
      todoService.list.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: loadTodos(),
      });
      const expected = cold('-b-', {
        b: loadTodosFailed(),
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });

    // getTodoById
    it('should dispatch loadTodoSuccess action when todoService.getTodoById return a result', () => {
      const mockedActiveTodo: Todo = {id: 1, title: 'aTitle', isClosed: true, toggleTime: 1000, description: 'A description'};
      todoService.getTodoByID.and.returnValue(of(mockedActiveTodo));
      actions = hot('-a-', {
        a: getTodoById({id: 2}),
      });
      const expected = cold('-b-', {
        b: loadTodoSuccess({todo: mockedActiveTodo}),
      });
      expect(effects.getTodoByID$).toBeObservable(expected);
      expect(todoService.getTodoByID).toHaveBeenCalledOnceWith(2);
    });

    it('should dispatch loadTodoFailed action when todoService.getTodoById fails', () => {
      todoService.getTodoByID.and.returnValue(cold('#'));
      actions = hot('-a-', {
        a: getTodoById({id: 2}),
      });
      const expected = cold('-b-', {
        b: loadTodoFailed(),
      });
      expect(effects.getTodoByID$).toBeObservable(expected);
    });
    //   onRouteChange
    it('should dispatch getTodoById action when root change with id', () => {
      actions = hot('-a-', {
        a: fakeRouterNavigationAction({url: `/details/1`}),
      });
      const expected = cold('-a-', {
        a: getTodoById({id: 1})
      });
      expect(effects.onRouteChange$).toBeObservable(expected);
    });

    //   onRouteChange
    it('should dispatch loadTodoSuccess action when root change without id', () => {
      routeParams.setResult({});
      store.refreshState();

      actions = hot('-a-', {
        a: fakeRouterNavigationAction({url: `/details/1`}), // url
      });
      const expected = cold('-a-', {
        a: loadTodoSuccess({todo: undefined})
      });
      expect(effects.onRouteChange$).toBeObservable(expected);
    });
  });
});
