import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const ButtonLink = ({ active, children, onClick }) => (
    <Button
        type="primary"
        onClick={onClick}
        disabled={active}
        style={{
            marginLeft: '4px'
        }}
    >
        {children}
    </Button>
);

ButtonLink.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ButtonLink;
