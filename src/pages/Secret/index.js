import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import useAuthContext from '../../contexts/useAuthContext';

const SecretPage = () => {
    const history = useHistory();
    const { auth, logout } = useAuthContext();

    return (
        <>
            <h2>Secret Page</h2>
            <h3>Hi!</h3>
            {auth && auth.isAuthUser && (
                <div>
                    <p>Welcome! {auth.user.username}</p>
                    <Button
                        variant="outline-primary"
                        onClick={() => {
                            logout(() => history.push('/'));
                        }}
                    >
                        Sign out
                    </Button>
                </div>
            )}
        </>
    );
};

export default SecretPage;
