import { urlToList } from './pathTools';

describe('test urlToList', () => {
    it('One path', () => {
        expect(urlToList('/posts')).toEqual(['/posts']);
    });

    it('Secondary path', () => {
        expect(urlToList('/posts/18998')).toEqual(['/posts', '/posts/18998']);
    });

    it('More paths', () => {
        expect(urlToList('/posts/18998/comments')).toEqual(['/posts', '/posts/18998', '/posts/18998/comments']);
    });
});
