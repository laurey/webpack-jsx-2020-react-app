import React, { Component } from 'react';
import { Card } from 'antd';
import styles from './style.less';

export default class Analysis extends Component {
    render() {
        return (
            <Card className={styles.bgCard}>
                <h2>Analysis</h2>
            </Card>
        );
    }
}
