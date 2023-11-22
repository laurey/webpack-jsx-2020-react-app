import { setupFetch } from './index';

describe('Utils:', () => {
    let responseMock = [{ id: 1 }, { id: 3 }, { id: 5 }];
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('setupFetch method', async () => {
        fetch.mockResponse(JSON.stringify(responseMock));

        const result = await setupFetch('http://aa.bb.com/api/posts');

        expect(fetch.mock.calls.length).toEqual(1);
        expect(result).toEqual(responseMock.map(item => ({ ...item, key: item.id })));
        // expect(response.totalCount).toEqual(fakeData.totalCount);
        expect(result[1]).toEqual(
            expect.objectContaining({
                key: expect.any(Number)
            })
        );
        expect(result[1]).toEqual(expect.objectContaining({ id: 3, key: 3 }));
    });
});
