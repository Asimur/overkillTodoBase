import {TodoDetailsComponent} from './todo-details.component';
import {provideMockStore} from '@ngrx/store/testing';
import {MockBuilder, MockedComponentFixture, MockRender, ngMocks} from 'ng-mocks';
import {activeTodo} from '../shared/stores/todos/selectors';
import {RouterLink} from '@angular/router';

describe('TodoDetailsComponent', () => {
  let fixture: MockedComponentFixture<TodoDetailsComponent>;

  beforeEach(() => MockBuilder(TodoDetailsComponent)
    .provide(provideMockStore({
      selectors: [
        {selector: activeTodo, value: {id: 1, title: 'todo 1', isClosed: false, toggleTime: 0, description: 'A description'}}
      ]
    }))
  );

  beforeEach(() => {
    fixture = MockRender(TodoDetailsComponent);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display a title', () => {
    expect(ngMocks.formatText(ngMocks.find('mat-card-title'))).toEqual('todo 1');
  });

  it('should display todo details', () => {
    expect(ngMocks.formatText(ngMocks.find('mat-card-content'))).toEqual('A description');
  });

  it('should display OK button', () => {
    expect(ngMocks.formatText(ngMocks.find('button'))).toEqual('OK');
    expect(ngMocks.get(ngMocks.find('button'), RouterLink).routerLink).toEqual('../..');
  });

});
