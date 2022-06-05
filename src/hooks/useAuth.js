import { useState } from 'react';

export default function useAuth() {
    const [user, setUser] = useState(null);
    const logIn = data => {
        return new Promise(resolve => {
            setTimeout(() => {
                setUser({ ...data, id: new Date().valueOf() });
                resolve();
            }, 200);
        });
    };

    const logOut = data => {
        return new Promise(resolve => {
            setTimeout(() => {
                setUser(null);
                resolve();
            }, 200);
        });
    };

    return {
        user,
        logIn,
        logOut
    };
}
