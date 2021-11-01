import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HelloWorld from '@/components/Hello';

class Home extends React.PureComponent {
    render() {
        const user = {
            firstName: 'Jane',
            lastName: 'FF'
        };

        return (
            <div>
                <h1>Home Page-{this.props.title}</h1>
                <div>Hello World!!!</div>
                <HelloWorld firstName={user.firstName} lastName={user.lastName} />
                <Link to="/not-found">to-not-found-page</Link>
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
    }
}

Home.propTypes = {
    title: PropTypes.string
};

export default Home;
