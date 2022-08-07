import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AA extends Component {
    render() {
        return (
            <div>
                <h1>Monitor AA</h1>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/monitor/bb">Monitor BB</Link>
                    </li>
                </ul>
            </div>
        );
    }
}
