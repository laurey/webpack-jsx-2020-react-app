import React, { PureComponent, Fragment } from 'react';
import { Card, Steps } from 'antd';
import styles from '../style.less';

const { Step } = Steps;

export default class StepForm extends PureComponent {
    getCurrentStep() {
        const { location } = this.props;
        const { pathname } = location;
        const pathList = pathname.split('/');
        switch (pathList[pathList.length - 1]) {
            case 'info':
                return 0;
            case 'confirm':
                return 1;
            case 'result':
                return 2;
            default:
                return 0;
        }
    }

    render() {
        const { location, children } = this.props;
        return (
            <Card bordered={false}>
                <Fragment>
                    <Steps current={this.getCurrentStep()} className={styles.steps}>
                        <Step title="描述" />
                        <Step title="资源配置" />
                        <Step title="完成" />
                    </Steps>
                    {children}
                </Fragment>
            </Card>
        );
    }
}
