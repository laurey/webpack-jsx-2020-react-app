import React from 'react';

const HelloWorld = props => {
    return (
        <h1>
            Hi there from React! Welcome {props.firstName} and {props.lastName}!
        </h1>
    );
};

export default HelloWorld;
