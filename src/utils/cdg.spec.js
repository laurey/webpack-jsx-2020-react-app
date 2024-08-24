import { handleEval, computeAndExpression, computeOrExpression, handleLogicComputation, input } from './cdg';

describe('cdg utils Tester', () => {
    beforeEach(() => {
        // jest.resetAllMocks();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('spyon-fetch', () => {
        test('handleEval should work', () => {
            expect(handleEval('>', 99, 9)).toEqual(true);
            expect(handleEval('>', 9, 9)).toEqual(false);
            expect(handleEval('>=', 9, 9)).toEqual(true);
            expect(handleEval('!=', '9', 9)).toEqual(false);
        });

        test('computeAndExpression should work', () => {
            // f1 == 'may' && f2 > 22
            const result = computeAndExpression(
                {
                    Fd_1: 'may',
                    Fd_2: 22
                },
                [
                    {
                        field: 'Fd_1',
                        condition: '==',
                        value: 'may'
                    },
                    {
                        field: 'Fd_2',
                        condition: '>',
                        value: 22
                    }
                ]
            );
            expect(result).toEqual(false);
        });

        test('computeAndExpression should return true when no group', () => {
            // f1 == 'may' && f2 > 22
            const result = computeAndExpression({
                Fd_1: 'may',
                Fd_2: 22
            });
            expect(result).toEqual(true);
        });

        test('computeOrExpression should work', () => {
            // f1 == 'may' || f2 > 22
            const result = computeOrExpression(
                {
                    Fd_1: 'may',
                    Fd_2: 22
                },
                [
                    {
                        field: 'Fd_1',
                        condition: '==',
                        value: 'may'
                    },
                    {
                        field: 'Fd_2',
                        condition: '>',
                        value: 22
                    }
                ]
            );
            expect(result).toEqual(true);
        });

        test('computeOrExpression should return true when no group', () => {
            // f1 == 'may' || f2 > 22
            const result = computeOrExpression({
                Fd_1: 'may',
                Fd_2: 22
            });
            expect(result).toEqual(true);
        });

        test('handleLogicComputation should work', () => {
            // f1 == 'may' && f2 > 22 && (f3 <= 33 || f5 != luci)
            const result = handleLogicComputation(
                {
                    Fd_1: 'may',
                    Fd_2: 22,
                    Fd_3: 33,
                    Fd_5: 'luci'
                },
                input
            );
            expect(result).toEqual(false);

            const result1 = handleLogicComputation(
                {
                    Fd_1: 'may',
                    Fd_2: 222,
                    Fd_3: 333,
                    Fd_5: 'luc1i'
                },
                input
            );
            expect(result1).toEqual(true);
        });
    });
});
