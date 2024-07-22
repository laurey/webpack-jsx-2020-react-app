import React from 'react';
import { Card, Button, InputNumber, Icon, Select, Checkbox } from 'antd';
import styles from './style.less';

const { Option } = Select;

const Analysis = props => {
    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    return (
        <div>
            <Card className={styles.bgCard}>
                <h2>Analysis</h2>
            </Card>
            <div>match.path: {props?.match.path}</div>
            <div className="rtc-condition-main">
                <div className="rtc-condition-diagram-input">
                    <div className="rtc-condition-diagram-item">
                        <div className="rtc-condition-diagram-rand">
                            <Select
                                showSearch
                                // style={{ width: 100 }}
                                placeholder="Select a option"
                                optionFilterProp="children"
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="AND">AND</Option>
                                <Option value="OR">OR</Option>
                            </Select>
                        </div>
                        <div className="rtc-condition-diagram-options">
                            <div className="rtc-condition-diagram-option">
                                <Select
                                    showSearch
                                    className="rtc-condition-diagram-field"
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="fjack">fJack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="tom">Tom</Option>
                                </Select>

                                <Icon className="rtc-icon" type="delete" />
                            </div>
                            <div className="rtc-condition-diagram-option">
                                <Select
                                    showSearch
                                    className="rtc-condition-diagram-field"
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="fjack">fJack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="tom">Tom</Option>
                                </Select>
                                <Icon className="rtc-icon" type="delete" />
                            </div>
                            <div className="rtc-condition-diagram-option">
                                <Select
                                    showSearch
                                    className="rtc-condition-diagram-field"
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="fjack">fJack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="tom">Tom</Option>
                                </Select>
                                <Icon className="rtc-icon" type="delete" />
                            </div>
                            <div className="rtc-condition-diagram-option is-group">
                                <div className="rtc-condition-diagram-input">
                                    <div className="rtc-condition-diagram-item">
                                        <div className="rtc-condition-diagram-rand">
                                            <Select
                                                showSearch
                                                // style={{ width: 100 }}
                                                placeholder="请选择"
                                                optionFilterProp="children"
                                                onChange={onChange}
                                                onFocus={onFocus}
                                                onBlur={onBlur}
                                                onSearch={onSearch}
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                                    0
                                                }
                                            >
                                                <Option value="AND">AND</Option>
                                                <Option value="OR">OR</Option>
                                            </Select>
                                        </div>
                                        <div className="rtc-condition-diagram-options">
                                            <div className="rtc-condition-diagram-option">
                                                <Select
                                                    showSearch
                                                    className="rtc-condition-diagram-field"
                                                    defaultValue="age"
                                                    placeholder="Select a person"
                                                    optionFilterProp="children"
                                                    onChange={onChange}
                                                    onFocus={onFocus}
                                                    onBlur={onBlur}
                                                    onSearch={onSearch}
                                                    filterOption={(input, option) =>
                                                        option.props.children
                                                            .toLowerCase()
                                                            .indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    <Option value="field-name">field-name</Option>
                                                    <Option value="age">Age</Option>
                                                    <Option value="name">Name</Option>
                                                </Select>
                                                <Select
                                                    showSearch
                                                    // style={{ width: 100 }}
                                                    defaultValue="大于"
                                                    className="rtc-condition-diagram-comparison-operator"
                                                    placeholder="Select a person"
                                                    optionFilterProp="children"
                                                    onChange={onChange}
                                                    onFocus={onFocus}
                                                    onBlur={onBlur}
                                                    onSearch={onSearch}
                                                    filterOption={(input, option) =>
                                                        option.props.children
                                                            .toLowerCase()
                                                            .indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    <Option value="等于">等于</Option>
                                                    <Option value="大于">大于</Option>
                                                    <Option value="小于">小于</Option>
                                                </Select>

                                                <div className="rtc-condition-config-value">
                                                    <div className="rtc-condition-config-input">
                                                        <InputNumber />
                                                    </div>
                                                    <Checkbox onChange={onChange}>字段</Checkbox>
                                                </div>
                                                <Icon className="rtc-icon" type="delete" />
                                            </div>
                                            <div className="rtc-condition-diagram-option">
                                                <Select
                                                    showSearch
                                                    className="rtc-condition-diagram-field"
                                                    placeholder="请选择"
                                                    optionFilterProp="children"
                                                    onChange={onChange}
                                                    onFocus={onFocus}
                                                    onBlur={onBlur}
                                                    onSearch={onSearch}
                                                    filterOption={(input, option) =>
                                                        option.props.children
                                                            .toLowerCase()
                                                            .indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    <Option value="fjack">fJack</Option>
                                                    <Option value="lucy">Lucy</Option>
                                                    <Option value="tom">Tom</Option>
                                                </Select>

                                                <Icon className="rtc-icon" type="delete" />
                                            </div>
                                            <div className="rtc-condition-diagram-option">
                                                <Select
                                                    showSearch
                                                    className="rtc-condition-diagram-field"
                                                    placeholder="Select a person"
                                                    optionFilterProp="children"
                                                    onChange={onChange}
                                                    onFocus={onFocus}
                                                    onBlur={onBlur}
                                                    onSearch={onSearch}
                                                    filterOption={(input, option) =>
                                                        option.props.children
                                                            .toLowerCase()
                                                            .indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    <Option value="fjack">fJack</Option>
                                                    <Option value="lucy">Lucy</Option>
                                                    <Option value="tom">Tom</Option>
                                                </Select>

                                                <Icon className="rtc-icon" type="delete" />
                                            </div>
                                            <div className="rtc-condition-diagram-option is-group">
                                                <div className="rtc-condition-diagram-input">
                                                    <div className="rtc-condition-diagram-item">
                                                        <div className="rtc-condition-diagram-rand">
                                                            <Select
                                                                showSearch
                                                                // style={{ width: 100 }}
                                                                placeholder="請選擇"
                                                                optionFilterProp="children"
                                                                onChange={onChange}
                                                                onFocus={onFocus}
                                                                onBlur={onBlur}
                                                                onSearch={onSearch}
                                                                filterOption={(input, option) =>
                                                                    option.props.children
                                                                        .toLowerCase()
                                                                        .indexOf(input.toLowerCase()) >= 0
                                                                }
                                                            >
                                                                <Option value="AND">AND</Option>
                                                                <Option value="OR">OR</Option>
                                                            </Select>
                                                        </div>
                                                        <div className="rtc-condition-diagram-options">
                                                            <div className="rtc-condition-diagram-option">
                                                                <Select
                                                                    showSearch
                                                                    className="rtc-condition-diagram-field"
                                                                    placeholder="Select a person"
                                                                    optionFilterProp="children"
                                                                    onChange={onChange}
                                                                    onFocus={onFocus}
                                                                    onBlur={onBlur}
                                                                    onSearch={onSearch}
                                                                    filterOption={(input, option) =>
                                                                        option.props.children
                                                                            .toLowerCase()
                                                                            .indexOf(input.toLowerCase()) >= 0
                                                                    }
                                                                >
                                                                    <Option value="fjack">fJack</Option>
                                                                    <Option value="lucy">Lucy</Option>
                                                                    <Option value="tom">Tom</Option>
                                                                </Select>

                                                                <Icon className="rtc-icon" type="delete" />
                                                            </div>
                                                            <div className="rtc-condition-diagram-option">
                                                                <Select
                                                                    showSearch
                                                                    className="rtc-condition-diagram-field"
                                                                    placeholder="Select a person"
                                                                    optionFilterProp="children"
                                                                    onChange={onChange}
                                                                    onFocus={onFocus}
                                                                    onBlur={onBlur}
                                                                    onSearch={onSearch}
                                                                    filterOption={(input, option) =>
                                                                        option.props.children
                                                                            .toLowerCase()
                                                                            .indexOf(input.toLowerCase()) >= 0
                                                                    }
                                                                >
                                                                    <Option value="fjack">fJack</Option>
                                                                    <Option value="lucy">Lucy</Option>
                                                                    <Option value="tom">Tom</Option>
                                                                </Select>

                                                                <Icon className="rtc-icon" type="delete" />
                                                            </div>
                                                            <div className="rtc-condition-diagram-option">
                                                                <Select
                                                                    showSearch
                                                                    className="rtc-condition-diagram-field"
                                                                    placeholder="Select a person"
                                                                    optionFilterProp="children"
                                                                    onChange={onChange}
                                                                    onFocus={onFocus}
                                                                    onBlur={onBlur}
                                                                    onSearch={onSearch}
                                                                    filterOption={(input, option) =>
                                                                        option.props.children
                                                                            .toLowerCase()
                                                                            .indexOf(input.toLowerCase()) >= 0
                                                                    }
                                                                >
                                                                    <Option value="fjack">fJack</Option>
                                                                    <Option value="lucy">Lucy</Option>
                                                                    <Option value="tom">Tom</Option>
                                                                </Select>

                                                                <Icon className="rtc-icon" type="delete" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rtc-condition-diagram-btns">
                                                        <Button type="link" size="small" icon="plus-circle">
                                                            添加条件
                                                        </Button>
                                                        <Button type="link" size="small" icon="plus-circle">
                                                            添加条件组
                                                        </Button>
                                                    </div>
                                                </div>
                                                <Icon className="rtc-icon" type="close-circle" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rtc-condition-diagram-btns">
                                        <Button type="link" size="small" icon="plus-circle">
                                            添加条件
                                        </Button>
                                        <Button type="link" size="small" icon="plus-circle">
                                            添加条件组
                                        </Button>
                                    </div>
                                </div>
                                <Icon className="rtc-icon" type="close-circle" />
                            </div>
                        </div>
                    </div>
                    <div className="rtc-condition-diagram-btns">
                        <Button type="link" size="small" icon="plus-circle">
                            添加条件
                        </Button>
                        <Button type="link" size="small" icon="plus-circle">
                            添加条件组
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analysis;
