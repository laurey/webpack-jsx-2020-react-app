import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BB extends Component {
    render() {
        return (
            <div>
                <h2>Monitor BB</h2>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/demo">Demo</Link>
                    </li>
                    <li>
                        <Link to="/monitor">Monitor</Link>
                    </li>
                </ul>
            </div>
        );
    }
}
