import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoListComponent} from './todo-list.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {MatCheckbox} from '@angular/material/checkbox';
import {MockBuilder, MockedComponent, MockRender, ngMocks} from 'ng-mocks';
import {By} from '@angular/platform-browser';
import {loadTodos, toggleTodo} from '../shared/stores/todos/actions';
import {selectTodos} from '../shared/stores/todos/selectors';

describe('TodoListComponent', () => {
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore;

  beforeEach(() => MockBuilder(TodoListComponent)
    .provide(provideMockStore({
      selectors: [
        {
          selector: selectTodos, value: [
            {id: 1, title: 'todo 1', isClosed: false, toggleTime: 0, description: 'A description'},
            {id: 2, title: 'todo 2', isClosed: true, toggleTime: 1000, description: 'A description'},
          ]
        }
      ]
    }))
  );

  beforeEach(() => {
    fixture = MockRender(TodoListComponent, undefined, {detectChanges: false});
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledOnceWith(loadTodos());
  });

  it('should display a title', () => {
    expect(fixture.debugElement.query(By.css('mat-card-title')).nativeElement.innerText).toEqual(
      'Todos'
    );
  });

  it('should display todos', () => {
    const todoElements = ngMocks.findAll('mat-list mat-list-item');
    expect(todoElements.length).toEqual(2);
    expect(todoElements[0].query(By.css('h4')).nativeElement.innerText).toContain('todo 1');
    expect(todoElements[1].query(By.css('h4')).nativeElement.innerText).toContain('todo 2');

    const todoCheckboxes: MockedComponent<MatCheckbox>[] =
      todoElements.map(item => item.query(By.css('mat-checkbox'))).map(item => item.componentInstance);
    expect(todoCheckboxes[0].checked).toBeFalse();
    expect(todoCheckboxes[1].checked).toBeTrue();

  });

  it('should check todo on click on checkbox', () => {
    (store.dispatch as jasmine.Spy).calls.reset();
    const checkboxes = fixture.debugElement.queryAll(By.css('mat-checkbox'));
    checkboxes[1].triggerEventHandler('change');
    expect(store.dispatch).toHaveBeenCalledOnceWith(
      toggleTodo({todo: {id: 2, title: 'todo 2', isClosed: true, toggleTime: 1000, description: 'A description'}})
    );
  });

  it('should append class checked on todo element when closed', () => {
    expect(ngMocks.findAll('mat-list mat-list-item h4').map((e) => e.classes['checked'] ?? false)).toEqual([false, true]);
  });

});
