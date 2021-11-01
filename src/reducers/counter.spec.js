import counter from './counter';

describe('counter reducer', () => {
    test('should provide the initial state', () => {
        expect(counter(undefined, {})).toStrictEqual({ value: 0 });
    });

    test('should handle INCREMENT action', () => {
        expect(counter({ value: 1 }, { type: 'INCREMENT' })).toStrictEqual({
            value: 2
        });
    });

    test('should handle INCREMENTBY action', () => {
        expect(counter({ value: 1 }, { type: 'INCREMENTBY', payload: 11 })).toStrictEqual({
            value: 12
        });
    });

    test('should handle DECREMENT action', () => {
        expect(counter({ value: 1 }, { type: 'DECREMENT' })).toStrictEqual({
            value: 0
        });
    });

    test('should handle DECREMENTBY action', () => {
        expect(counter({ value: 1 }, { type: 'DECREMENTBY', payload: 10 })).toStrictEqual({
            value: -9
        });
    });

    test('should ignore unknown actions', () => {
        expect(counter({ value: 1 }, { type: 'unknown' })).toStrictEqual({
            value: 1
        });
    });
});
