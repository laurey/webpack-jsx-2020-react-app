import * as React from 'react';

const Message = props => {
    return (
        <div className="message-item">
            <div className="message-header">{`You got a new message from ${props.from}:`}</div>
            <div className="message-body">{props.body}</div>
        </div>
    );
};

export default Message;
