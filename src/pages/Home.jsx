import React, { forwardRef, createRef, useImperativeHandle } from 'react';
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

const Home = props => {
    const formRef = createRef();
    return (
        <div>
            <h1>Home Page-{props.title}</h1>
            <div>Hello World!!!</div>
            <HelloWorld firstName={user.firstName} lastName={user.lastName} />
            <EnhancedForm
                onSubmit={() => console.log(formRef.current.form.getFieldsValue(['price', 'range']))}
                wrappedComponentRef={formRef}
            />
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
