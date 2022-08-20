import React, { useRef, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Popover, Row, Col } from 'antd';
import BaseForm from './BaseForm';

const WrappedRegistrationForm = Form.create({ name: 'register' })(BaseForm);

function Workplace(props) {
    const content = useMemo(() => <div>it is from Popover content</div>, []);
    const [visible, setVisible] = useState(false);

    const handleSubmit = values => {
        console.log('submit data as below!!!!');
        console.log(values);
    };

    const formRef = useRef(null);

    const handlePopoverVisible = e => {
        e.preventDefault();
        setTimeout(() => {
            setVisible(prev => !prev);
        }, 3000);
    };

    return (
        <Row type="flex">
            <Col span={24}>
                <span>
                    <Popover content={content} visible={visible} placement="leftBottom">
                        <span onClick={handlePopoverVisible}>Click then show Popover after 3s</span>
                    </Popover>
                </span>
                <p>{undefined && <span>feeeeeeee</span>}</p>
                <p>{null && <span>iweuoklfjasdf</span>}</p>
                <ul>
                    <li>
                        <Link to="/demo/viewlist">View List</Link>
                    </li>
                    <li>
                        <Link to="/demo/form">Form</Link>
                    </li>
                </ul>
            </Col>
            <Col span={24}>
                <WrappedRegistrationForm onSubmit={handleSubmit} wrappedComponentRef={formRef} />
            </Col>
        </Row>
    );
}

export default Workplace;
