import React, { Component } from 'react';
import { Card, Form, Select, DatePicker, Button } from 'antd'
import { Map, Marker, NavigationControl, Polygon ,Polyline} from 'react-bmap'


const FormItem = Form.Item
const Options = Select.Option

class BikeMap extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <Card>
                    <Form layout='inline' initialValues={
                        {
                            city_id: 1 + '',
                            state: 1 + ''
                        }
                    } onFinish={this.onFinish}>
                        <FormItem label='城市' name='city_id'>
                            <Select style={{ width: 100 }}>
                                <Options value='1'>全部</Options>
                                <Options value='2'>北京</Options>
                                <Options value='3'>上海</Options>
                                <Options value='4'>深圳</Options>
                            </Select>
                        </FormItem>
                        <FormItem name='time_start' label='订单时间'>
                            <DatePicker />
                        </FormItem>
                        <FormItem name='time_end'>
                            <div>～    <DatePicker /></div>
                        </FormItem>
                        <FormItem label='订单状态' name='state'>
                            <Select style={{ width: 100 }}>
                                <Options value='1'>全部</Options>
                                <Options value='2'>进行中</Options>
                                <Options value='3'>已结束</Options>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type='primary' htmlType='submit'>查询</Button>
                            <Button >重置</Button>
                        </FormItem>
                    </Form>

                </Card>
                <Card>
                    <Map center={{ lng: 116.402544, lat: 39.928216 }} zoom="9" style={{ height: '600px' }} enableScrollWheelZoom={true}>
                        <Marker position={{ lng: 116.402544, lat: 39.928216 }} />
                        <Marker position={{ lng: 116.802544, lat: 39.128216 }} icon={'loc_blue'} />
                        <Marker position={{ lng: 116.702544, lat: 39.328216 }} icon={'start'} />
                        <Marker position={{ lng: 116.902544, lat: 39.128216 }} icon={'end'} />
                        <NavigationControl />
                        <Polygon
                            fillColor='red'
                            strokeColor='yellow'
                            path={[
                                { lng: 116.442519, lat: 39.945597 },
                                { lng: 116.484488, lat: 39.905315 },
                                { lng: 116.443094, lat: 39.786494 },
                                { lng: 116.426709, lat: 39.800033 }
                            ]}
                        />
                        <Polyline
                            strokeColor='green'
                            path={[
                                { lng: 116.702544, lat: 39.328216 },
                                { lng: 116.902544, lat: 39.128216 }
                            ]}
                        />
                    </Map>
                </Card>
            </div>
        );
    }
}

export default BikeMap;