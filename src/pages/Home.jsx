import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import HelloWorld from '../components/Hello';

const Home = props => {
    const myRef = useRef(null);
    const [user, setUser] = useState();

    useEffect(() => {
        // console.log(myRef.current)
        setUser({
            firstName: 'Jane',
            lastName: 'FF'
        });
    }, []);

    return (
        <div ref={myRef}>
            <h1>Home Page-{props.title}</h1>
            <div>Hello World!!!</div>
            <HelloWorld firstName={user?.firstName} lastName={user?.lastName} />
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
