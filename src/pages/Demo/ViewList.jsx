import React, { Component } from 'react';
import { Form } from 'antd';
import BaseForm from './BaseForm';
import { Link } from 'react-router-dom';

const EnhancedForm = Form.create({ name: 'demo/view_list_form' })(BaseForm);

class ViewList extends Component {
    render() {
        return (
            <div>
                <h2>ViewList</h2>
                <ul>
                    <li>
                        <Link to="/demo">/demo</Link>
                    </li>
                    <li>
                        <Link to="/demo/form">/demo/form</Link>
                    </li>
                </ul>
                <EnhancedForm />
            </div>
        );
    }
}

export default ViewList;
