import { setupFetch } from './index';

const fakeData = [{ id: 1 }, { id: 3 }, { id: 5 }];
// global.fetch = jest.fn().mockImplementation(() =>
//     Promise.resolve({
//         json: () => Promise.resolve(fakeData)
//     })
// );

describe('Utils', () => {
    beforeEach(() => {
        // jest.resetAllMocks();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe.skip('jest-fetch-mock', () => {
        test('setupFetch method', async () => {
            fetch.mockResponse(JSON.stringify(fakeData));

            const result = await setupFetch('http://aa.bb.com/api/posts');

            expect(fetch.mock.calls.length).toEqual(1);
            expect(result).toEqual(fakeData.map(item => ({ ...item, key: item.id })));
            expect(result[1]).toEqual(
                expect.objectContaining({
                    key: expect.any(Number)
                })
            );
            expect(result[1]).toEqual(expect.objectContaining({ id: 3, key: 3 }));
        });
    });

    describe('spyon-fetch', () => {
        test('should resolved with data', async () => {
            const spy = jest.spyOn(global, 'fetch').mockImplementation(() =>
                Promise.resolve({
                    json: () => Promise.resolve(fakeData)
                })
            );

            // below also works
            // const spy = jest.spyOn(global, 'fetch').mockResolvedValue({
            //     json: jest.fn().mockResolvedValue(fakeData)
            // });

            const result = await setupFetch('http://aa.bb.com/api/posts');

            expect(spy).toHaveBeenCalledTimes(1);
            expect(result).toEqual(fakeData.map(item => ({ ...item, key: item.id })));
            expect(result[1]).toEqual(
                expect.objectContaining({
                    key: expect.any(Number)
                })
            );
            expect(result[1]).toEqual(expect.objectContaining({ id: 3, key: 3 }));
        });
    });
});
