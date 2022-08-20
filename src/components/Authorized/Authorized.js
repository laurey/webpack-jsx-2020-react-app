import React from 'react';
import check from './CheckPermissions';
import Exception403 from '@/pages/Exception/403';

const Authorized = ({ children, authority, noMatch = <Exception403 /> }) => {
    const childrenRender = typeof children === 'undefined' ? null : children;
    return check(authority, childrenRender, noMatch);
};

export default Authorized;
