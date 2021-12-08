import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '@/constants/CounterActionTypes';
import * as actions from './counter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Counter async actions Test', () => {
    let store;
    beforeEach(() => {
        jest.useFakeTimers();
        store = mockStore({ value: 10 });
    });

    test('asyncIncrement should dispatch action after 1 second', () => {
        const dispatch = jest.fn();
        actions.asyncIncrement()(dispatch);

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    });

    test('asyncDecrement wait 2 seconds should dispatch DECREMENT action', () => {
        const expectedActions = [{ type: types.DECREMENT }];
        const result = store.dispatch(actions.asyncDecrement(2000)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
        jest.runAllTimers();
        return result;
    });
});
