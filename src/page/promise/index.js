import React, { Component } from 'react';
import { Card, Button, Table, Modal, message, Form, Select, Input, Tree } from 'antd'
import Axios from '../../axios'
import configData from '../../config/Menuconfig'

const FormItem = Form.Item
const Option = Select.Option

class Promise extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount() {
        this.request('datasource', '/promise')
        this.setState({
            creatVisable: false,
            promiseVisable: false
        })
    }
    request = (stateKeyName, url) => {
        Axios.ajax({
            url: url,
            data: {
                param: {
                    page: 1
                }
            }
        }).then(res => {
            this.setState({
                data: res
            })
            console.log(res)
        })
    }
    onRowClick = (record, index) => {
        let selectKey = [index + 1];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }
    openCreat = () => {
        this.setState({
            creatVisable: true
        })
    }
    creatCanecle = () => {
        this.setState({
            creatVisable: false
        })
    }
    successCreat = () => {
        this.setState({
            creatVisable: false
        })
        message.success('创建成功')
    }
    promiseOpen = () => {
        if (Array.isArray(this.state.selectedRowKeys)) {
            this.setState({
                promiseVisable: true
            })
        } else {
            message.info('请先选择一条数据')
        }
    }
    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'ID'
            },
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'start_time'
            },
            {
                title: '使用状态',
                dataIndex: 'mobile',
                render(mobile) {
                    const config = {
                        '1': '停用',
                        '2': '启用'
                    }
                    return config[mobile]
                }
            },
            {
                title: '授权时间',
                dataIndex: 'promise_time',

            },
            {
                title: '授权人',
                dataIndex: 'promise_name'
            }
        ]
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        }
        const selectedRowKeys = this.state.selectedRowKeys;
        const selectItem = this.state.selectedItem

        return (
            <div style={{ width: '100%' }}>
                <Card>
                    <Button type='primary' onClick={this.openCreat}>创建角色</Button>
                    <Button type='primary' onClick={this.promiseOpen}>设置权限</Button>

                    <Table
                        columns={columns}
                        style={{ marginTop: '10px' }}
                        dataSource={this.state.data}
                        rowSelection={{
                            type: 'radio',
                            selectedRowKeys: selectedRowKeys
                        }}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            };
                        }}
                        pagination={false}
                    />
                    <Modal title="角色创建"
                        visible={this.state.creatVisable}
                        onCancel={this.creatCanecle}
                        onOk={this.successCreat}>
                        <Form initialValues={
                            { state: 1 + '' }
                        } {...layout}>
                            <FormItem label='角色名称' name='name'>
                                <Input />
                            </FormItem>
                            <FormItem label='状态' name='state'>
                                <Select>
                                    <Option value='1'>开启</Option>
                                    <Option value='2'>关闭</Option>
                                </Select>
                            </FormItem>
                        </Form>
                    </Modal>
                    <Modal title='权限设置'
                        visible={this.state.promiseVisable}
                        onCancel={() => {
                            this.setState({
                                promiseVisable: false
                            })
                        }}
                        onOk={() => {
                            this.setState({
                                promiseVisable: false
                            })
                            message.success('设置成功')
                        }}>
                        <Form initialValues={{
                            state: 1 + ''
                        }}
                            {...layout}>
                            <FormItem label='角色名称' name='name'>
                                <Input  placeholder={selectItem ? selectItem.name : ''} disabled/>
                            </FormItem>
                            <FormItem label='状态' name='state'>
                                <Select>
                                    <Option value='1'>启用</Option>
                                    <Option value='2'>关闭</Option>
                                </Select>
                            </FormItem>
                            <Tree checkable={true}
                             treeData={configData} 
                             defaultExpandAll={true}
                             defaultCheckedKeys={['/home','/ui','/form']}/>
                        </Form>
                    </Modal>
                </Card>
            </div>
        );
    }
}

export default Promise;