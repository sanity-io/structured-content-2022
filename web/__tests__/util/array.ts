import { partition } from '../../util/array';

describe('partition', () => {
  it('should partition an array into two arrays', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const { even, odd } = partition(array, (x) =>
      x % 2 === 0 ? 'even' : 'odd'
    );
    expect(even).toEqual([2, 4, 6, 8, 10]);
    expect(odd).toEqual([1, 3, 5, 7, 9]);
  });
});
