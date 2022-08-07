import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Spin, Row, Col } from 'antd';

import useInterval from '@/hooks/useInterval';
import { getPageQuery } from '@/utils';
import { reloadAuthorized } from '@/utils/Authorized';

const delay = 1000;

export default function LogOut(props) {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const [count, setCount] = useState(props.count || 10);
    const [loading, setLoading] = useState(true);
    const redirect = useMemo(() => {
        const query = getPageQuery();
        const target = (query && query.redirect) || (state && state.redirect) || props.redirect;
        return (target && target.to) || target;
    }, [props.redirect, state]);

    useInterval(
        () => {
            setCount(prev => --prev);
            if (count === 1) {
                setLoading(false);
                dispatch({
                    type: 'LOG_OUT'
                });
                reloadAuthorized();
            }
        },
        loading ? delay : null
    );

    if (loading) {
        return (
            <Spin spinning>
                <Row>
                    <Col style={{ textAlign: 'center' }}>
                        <strong style={{ fontSize: 48 }}>{count}</strong>s later, you&apos;ll log out!!
                    </Col>
                </Row>
            </Spin>
        );
    }

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <div>
                <Link to="/" replace>
                    Go Home
                </Link>
            </div>
        </div>
    );
}

LogOut.propTypes = {
    count: PropTypes.number,
    redirect: PropTypes.shape({
        to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired
    })
};

LogOut.defaultProps = {
    count: 10,
    redirect: { to: '/' }
};
