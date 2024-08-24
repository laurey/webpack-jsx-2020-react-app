export const input = {
    mode: 'AND',
    group: [
        {
            field: 'Fd_1',
            condition: '==',
            value: 'may'
        },
        {
            field: 'Fd_2',
            condition: '>',
            value: 22
        },
        {
            mode: 'OR',
            group: [
                {
                    field: 'Fd_3',
                    condition: '<=',
                    value: 33
                },
                {
                    field: 'Fd_5',
                    condition: '!=',
                    value: 'luci'
                }
            ]
        }
    ]
};

// f1 == 'may' && f2 > 22 && (f3 <= 33 || f5 != luci)

export const handleEval = (operator, left, right) => {
    switch (operator) {
        case '>':
            return left > right;
        case '>=':
            return left >= right;
        case '<':
            return left < right;
        case '<=':
            return left <= right;
        case '==':
            return left == right;
        case '!=':
            return left != right;

        default:
            break;
    }
};

export const computeAndExpression = (data, groups) => {
    if (!Array.isArray(groups)) {
        return true;
    }

    return groups.reduce((acc, current) => {
        if (current.mode) {
            if (current.mode === 'AND') {
                if (acc === true) {
                    return computeAndExpression(data, current.group);
                }
            } else {
                if (acc === true) {
                    return computeOrExpression(data, current.group);
                }
            }
        }

        if (acc === true) {
            return handleEval(current.condition, data[current.field], current.value);
        }

        return acc;
    }, true);
};
export const computeOrExpression = (data, groups) => {
    if (!Array.isArray(groups)) {
        return true;
    }

    return groups.reduce((acc, current) => {
        if (current.mode) {
            if (current.mode === 'AND') {
                if (acc === false) {
                    return computeAndExpression(data, current.group);
                }
            } else {
                if (acc === false) {
                    return computeOrExpression(data, current.group);
                }
            }
        }

        if (acc === false) {
            return handleEval(current.condition, data[current.field], current.value);
        }
        return acc;
    }, false);
};

export const handleLogicComputation = (data, option) => {
    if (!data) {
        return true;
    }

    const { mode, group } = option || {};
    if (!mode) {
        return true;
    }

    if (mode === 'AND') {
        return computeAndExpression(data, group);
    }

    return computeOrExpression(data, group);
};
