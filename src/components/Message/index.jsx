import React from 'react';
import PropTypes from 'prop-types';

const Message = props => {
    return (
        <div className="message-item">
            <div className="message-header">{`You got a new message from ${props.from}:`}</div>
            <div className="message-body">{props.body}</div>
        </div>
    );
};

Message.propTypes = {
    from: PropTypes.string,
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node])
};

export default Message;
