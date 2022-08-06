import { urlToList } from './pathTools';

describe('test urlToList', () => {
  it('A path', () => {
    expect(urlToList('/user')).toEqual(['/user']);
  });
  it('Secondary path', () => {
    expect(urlToList('/user/123')).toEqual(['/user', '/user/123']);
  });
  it('Three paths', () => {
    expect(urlToList('/user/123/blogs')).toEqual(['/user', '/user/123', '/user/123/blogs']);
  });
});
