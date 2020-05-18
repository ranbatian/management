import React, { Component } from 'react';
import './index.css'
import { Menu } from 'antd';
import MenuData from '../../config/Menuconfig'
import { NavLink } from 'react-router-dom'
import store from '../../store'



const { SubMenu } = Menu;

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        store.subscribe(this.storeChange)
    }
    componentWillMount() {
        const menuNodeTree = this.renderMenu(MenuData)
        this.setState({
            menuNodeTree
        })
    }
    storeChange=()=>{
        this.setState(store.getState())
    }
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu key={item.key} title={item.title}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={item.title} title={item.title}>
                    <NavLink to={`/admin${item.key}`} >{item.title}</NavLink>
                </Menu.Item>
            )
        })
    }
    changeTitleValue(e) {
        const action = {
            type: 'changeTitle',
            value: e
        }
        store.dispatch(action)
    }
    render() {
        return (
            <div>
                <div className='logo'>
                    <img src={`/logo-ant.svg`} alt="main-logo" />
                    <h1>Ran MS</h1>
                </div>
                <Menu style={{ width: 256 }} mode="vertical" theme='dark' className='main-nav' onClick={(e) => {
                    this.changeTitleValue(e.key)
                }}>
                    {this.state.menuNodeTree}
                </Menu>
            </div>
        );
    }
}

export default Nav;