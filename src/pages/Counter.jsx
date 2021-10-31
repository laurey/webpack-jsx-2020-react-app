import React from 'react';
import PropTypes from 'prop-types';
import Counter from '../components/Counter';

function CounterPage(props) {
    return (
        <div>
            <div>props.value: {props.value}</div>
            <Counter />
        </div>
    );
}

CounterPage.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default CounterPage;
