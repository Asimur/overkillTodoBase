import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class MockTodoApi implements InMemoryDbService {

  createDb(): {} {
    const todos: Todo[] = [
      { id: 1, title: 'todo in memory 1', isClosed: false, description: 'A description for todo 1', toggleTime: 0 },
      { id: 2, title: 'todo in memory 2', isClosed: false, description: 'A description for todo 2', toggleTime: 0 },
      { id: 3, title: 'todo in memory 3', isClosed: true, description: 'A description for todo 3', toggleTime: 0 },
      { id: 4, title: 'todo in memory 4', isClosed: false, description: 'A description for todo 4', toggleTime: 0 },
    ];
    return { todos };
  }

}
