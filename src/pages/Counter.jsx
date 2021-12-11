import React from 'react';
import PropTypes from 'prop-types';
import Counter from '@/containers/Counter';

const CounterPage = props => {
    return (
        <div>
            <div>props.value: {props.value}</div>
            <div>you are on the counter page!!!</div>
            <Counter />
        </div>
    );
};

CounterPage.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default CounterPage;
