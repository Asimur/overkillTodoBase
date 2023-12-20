import {State} from './reducer';
// import {activeTodo, selectTodos} from './selectors';
import * as fromSelector from './selectors';

describe('Selectors', () => {
  const initialState: State = {
    todos: [
      {id: 1, title: 'todo1Title', isClosed: true, toggleTime: 1000, description: 'A description'},
      {id: 2, title: 'todo2Title', isClosed: false, toggleTime: 10, description: 'A description'},
      {id: 3, title: 'todo3Title', isClosed: true, toggleTime: 10, description: 'A description'},
      {id: 4, title: 'todo4Title', isClosed: false, toggleTime: 0, description: 'A description'},
    ],
    activeTodo: {id: 2, title: 'todo2Title', isClosed: false, toggleTime: 10, description: 'A description'}
  };
  const sortedState: State = {
    todos: [
      {id: 2, title: 'todo2Title', isClosed: false, toggleTime: 10, description: 'A description'},
      {id: 4, title: 'todo4Title', isClosed: false, toggleTime: 0, description: 'A description'},
      {id: 3, title: 'todo3Title', isClosed: true, toggleTime: 10, description: 'A description'},
      {id: 1, title: 'todo1Title', isClosed: true, toggleTime: 1000, description: 'A description'},
    ]
  };

  it('should select todos list', () => {
    const result = fromSelector.selectTodos.projector(initialState);
    expect(result).toEqual(sortedState.todos);
  });

  it('should select activeTodo', () => {
    const result = fromSelector.activeTodo.projector(initialState);
    expect(result).toEqual(initialState.activeTodo);
    expect(fromSelector.activeTodo.projector(sortedState)).toEqual(undefined);
  });
});
