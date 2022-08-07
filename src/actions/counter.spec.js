import * as types from '@/constants/CounterActionTypes';
import * as actions from './counter';

describe('Counter actions Test', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    it('increment should create INCREMENT action', () => {
        expect(actions.increment()).toEqual({
            type: types.INCREMENT
        });
    });

    it('incrementBy should create INCREMENTBY action', () => {
        expect(actions.incrementBy(1)).toEqual({
            type: types.INCREMENTBY,
            payload: { factor: 1 }
        });
    });

    it('decrement should create DECREMENT action', () => {
        expect(actions.decrement()).toEqual({
            type: types.DECREMENT
        });
    });

    it('decrementBy should create DECREMENTBY action', () => {
        expect(actions.decrementBy(1)).toEqual({
            type: types?.DECREMENTBY,
            payload: { factor: 1 }
        });
    });
});
