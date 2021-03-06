import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NotMatch = props => {
    const { location } = props;
    return (
        <div>
            <p style={{ paddingBottom: 10 }}>
                No match for <code>{location.pathname}</code>
            </p>
            <Link replace to="/" className="nav-link">
                Return Home
            </Link>
        </div>
    );
};

NotMatch.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string
    })
};

export default NotMatch;
