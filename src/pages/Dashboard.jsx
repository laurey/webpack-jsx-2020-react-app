import React from 'react';

function Dashboard(props) {
    return (
        <div>
            <h1>Dashboard</h1>
            <span>{props.lazy ? 'load lazy' : ''}</span>
        </div>
    );
}

export default Dashboard;
