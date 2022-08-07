import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Exception403 extends Component {
    render() {
        return (
            <div>
                <h2>Exception403</h2>
                <pre>{JSON.stringify(this.props.location, null, ' ')}</pre>
                <Link to="/">Home</Link>
            </div>
        );
    }
}
