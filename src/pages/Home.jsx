import React, { forwardRef, createRef, useImperativeHandle, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import HelloWorld from '@/components/Hello';
import DemoForm from '@/components/DemoForm';

const user = {
    firstName: 'Jane',
    lastName: 'FF'
};

const FCForm = forwardRef((props, ref) => {
    const { form } = props;
    useImperativeHandle(ref, () => ({
        form
    }));
    return <DemoForm {...props} />;
});

const EnhancedForm = Form.create()(FCForm);

const params = {
    aa1: '113',
    bb2: 223,
    dd3: 'dd34'
};

const Home = props => {
    const formRef = createRef();
    const [value, setValue] = useState({});

    const handleSubmit = useCallback(() => {
        const value = formRef.current.form.getFieldsValue();
        const data = JSON.stringify(value);
        console.log(data);
    }, [formRef]);

    useEffect(() => {
        const id = setTimeout(() => {
            setValue({ params });
        }, 5000);
        return () => {
            clearTimeout(id);
        };
    }, []);

    return (
        <div>
            <h1>Home Page-{props.title}</h1>
            <div>Hello World!!!</div>
            <HelloWorld firstName={user.firstName} lastName={user.lastName} />
            <EnhancedForm value={value} onSubmit={handleSubmit} wrappedComponentRef={formRef} />
            <pre>
                {`{
"husky": {
    "hooks": {
        "pre-commit": "lint-staged"
    }
},
"lint-staged": {
    "src/**/*.(ts|tsx)": [
        "npm run --silent lint:fix",
        "git add"
    ],
    "*.+(js|jsx)": ["eslint --fix", "git add"],
    "*.+(json|css|less|json|md)": ["prettier --write", "git add"]
    }
}`}
            </pre>
        </div>
    );
};

Home.propTypes = {
    title: PropTypes.string
};

export default Home;
