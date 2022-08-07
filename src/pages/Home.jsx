import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import HelloWorld from '@/components/Hello';

const user = {
    firstName: 'Jane',
    lastName: 'FF'
};

const Home = props => {
    const foo = null ?? 'default string';

    return (
        <Card style={{ minHeight: '100vh' }}>
            <h1>Home Page</h1>
            <HelloWorld firstName={user.firstName} lastName={user.lastName} />
        </Card>
    );
};

Home.propTypes = {
    title: PropTypes.string
};

export default Home;
