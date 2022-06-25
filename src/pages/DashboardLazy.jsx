import React from 'react';
import loadable from '@loadable/component';
import Loading from '@/components/Loading';

const LazyMod = loadable(() => import('@/containers/Counter'), {
    fallback: <Loading />
});

function DashboardLazy() {
    return (
        <div>
            <h2>loadable demo</h2>
            <LazyMod />
        </div>
    );
}

export default DashboardLazy;
