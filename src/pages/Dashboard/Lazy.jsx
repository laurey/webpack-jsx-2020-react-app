import React from 'react';
import loadable from '@loadable/component';
import Loading from '@/components/Loading';

const LazyBoard = loadable(() => import(/* webpackChunkName: "sortableCards" */ '@/containers/SortableCards'), {
    fallback: <Loading />
});

function DashBoardLazy() {
    return (
        <div>
            <h2>loadable demo</h2>
            <LazyBoard />
        </div>
    );
}

export default DashBoardLazy;
