import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { first } from 'rxjs/operators';
import { Todo } from '../models/todo';
import { environment } from '../../environments/environment';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;
  const mockedTodoList: Todo[] = [
    { id: 1, title: 'todoTitle', isClosed: true, toggleTime: 1000, description: 'A description' },
    { id: 2, title: 'todoTitle', isClosed: false, toggleTime: 0, description: 'A description 2' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list todos', (done: DoneFn) => {

    service
      .list()
      .pipe(first())
      .subscribe((res: Todo[]) => {
        expect(res).toEqual(mockedTodoList);
        done();
      }, done.fail);

    const req = httpMock.expectOne(
      (r) => r.url === `${environment.baseUrl}/api/todos`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockedTodoList);
  });

  it('should provide todo by id', (done: DoneFn) => {
    const id = mockedTodoList[1].id;
    service
      .getTodoByID(id)
      .pipe(first())
      .subscribe((res: Todo) => {
        expect(res).toEqual(mockedTodoList[1]);
        done();
      }, done.fail);

    const req = httpMock.expectOne(
      (r) => r.url === `${environment.baseUrl}/api/todos/${id}`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockedTodoList[1]);
  });
});
