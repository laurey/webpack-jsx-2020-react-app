import { useState } from 'react';

function useBasicLayout() {
    const [layout, setLayout] = useState({
        navTheme: 'dark',
        fixedHeader: true,
        navHeight: 64
    });

    const updateBasicLayout = data => {
        return new Promise(resolve => {
            setTimeout(() => {
                setLayout({ ...layout, ...data, id: new Date().valueOf() });
                resolve();
            }, 200);
        });
    };

    return {
        layout,
        updateBasicLayout
    };
}

export default useBasicLayout;
