import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import Loading from '@/components/Loading';
// import Counter from '@/containers/Counter';

const Counter = React.lazy(() => import(/* webpackChunkName: "counter" */ '@/containers/Counter'));

const CounterPage = () => {
    return (
        <div>
            <div>you are on the counter page!!!</div>
            <Suspense fallback={<Loading />}>
                <Counter />
            </Suspense>
        </div>
    );
};

CounterPage.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default CounterPage;
