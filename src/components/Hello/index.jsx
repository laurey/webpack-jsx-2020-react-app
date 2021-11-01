import React, { Component } from 'react';

class HelloWorld extends Component {
    render() {
        return (
            <h1>
                Hi there from React! Welcome {this.props.firstName} and {this.props.lastName}!
            </h1>
        );
    }
}

export default HelloWorld;
