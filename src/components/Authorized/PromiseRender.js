import React from 'react';
import isEqual from 'lodash/isEqual';
import { Spin } from 'antd';
import { isComponentClass } from './Secured';

export default class PromiseRender extends React.Component {
    state = {
        component: null
    };

    componentDidMount() {
        this.setRenderedComponent(this.props);
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        const { component } = this.state;
        if (!isEqual(nextProps, this.props)) {
            this.setRenderedComponent(nextProps);
        }
        if (nextState.component !== component) return true;
        return false;
    };

    setRenderedComponent(props) {
        const fullfilled = this.checkIsInstantiation(props.fullfilled);
        const rejected = this.checkIsInstantiation(props.rejected);
        props.promise
            .then(() => {
                this.setState({
                    component: fullfilled
                });
            })
            .catch(() => {
                this.setState({
                    component: rejected
                });
            });
    }

    // Determine whether the incoming component has been instantiated
    // AuthorizedRoute is already instantiated
    // Authorized  render is already instantiated, children is no instantiated
    // Secured is not instantiated
    checkIsInstantiation = target => {
        if (isComponentClass(target)) {
            const Target = target;
            return props => <Target {...props} />;
        }
        if (React.isValidElement(target)) {
            return props => React.cloneElement(target, props);
        }
        return () => target;
    };

    render() {
        const { component: Component } = this.state;
        const { fullfilled, rejected, promise, ...rest } = this.props;
        return Component ? (
            <Component {...rest} />
        ) : (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    margin: 'auto',
                    paddingTop: 50,
                    textAlign: 'center'
                }}
            >
                <Spin size="large" />
            </div>
        );
    }
}
