import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Message extends PureComponent {
    static propTypes = {
        from: PropTypes.string,
        body: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    };

    render() {
        return (
            <div className="message-item">
                <div className="message-header">{`You got a new message from ${this.props.from}:`}</div>
                <div className="message-body">{this.props.body}</div>
            </div>
        );
    }
}

export default Message;
