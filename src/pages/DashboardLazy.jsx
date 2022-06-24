import React from 'react';
import loadable from '@loadable/component';

const LazyMod = loadable(() => import(/* webpackChunkName: "LazyDashboard" */ '@/containers/Counter'));

function DashboardLazy() {
    return (
        <div>
            <h2>dash lazy loadable demo</h2>
            <LazyMod />
        </div>
    );
}

export default DashboardLazy;
