import React from 'react';
import { Link } from 'react-router-dom';
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
            <ul>
                <li>
                    <Link to="/demo">/demo (need authorized)</Link>
                </li>
                <li>
                    <Link to="/welcome">/welcome(not welcome route, should show 404)</Link>
                </li>
                <li>
                    <Link to="/demo/dashboard/setting">/demo/dashboard/setting(not need authorized)</Link>
                </li>
                <li>
                    <Link to="/demo/viewlist">/demo/viewlist(not need authorized)</Link>
                </li>
                <li>
                    <Link to="/posts/1122">/posts/1122(no post route)</Link>
                </li>
            </ul>
        </Card>
    );
};

Home.propTypes = {
    title: PropTypes.string
};

export default Home;
