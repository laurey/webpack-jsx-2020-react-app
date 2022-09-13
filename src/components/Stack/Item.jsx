import React from 'react';
import styles from './style.less';

function Item(props) {
    const { children, square } = props;
    const style = {
        // backgroundColor: '#fff',
        ...(!square && {
            borderRadius: 4
        })
        // border: `1px solid rgba(0, 0, 0, .2)`,
        // transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    };
    return (
        <div className={styles['item']} style={style}>
            {children}
        </div>
    );
}

export default Item;
