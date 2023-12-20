import {routeParams} from './router.selectors';

describe('Router selectors', () => {
  it('should select route params', () => {
    const initialState = {id: 1};
    expect(routeParams.projector(initialState)).toEqual(initialState);
  });
});
