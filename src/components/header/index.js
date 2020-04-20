import React from 'react'
import { Avatar, Dropdown, Menu } from 'antd'
import { useHistory } from 'react-router-dom'
import { Container, User } from './style'
import Heart from '../heart/index'
import { storeContext } from 'store/store';
import useConnect from 'store/connects'

// const IconFont = Icon.createFromIconfontCN({
//     scriptUrl: '//at.alicdn.com/t/font_1597339_8qf8urtamts.js',
// });



export default () => {
    const { state } = useConnect(storeContext)
    const history = useHistory()

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('state')
        history.push('/login')
    }

    const menu = (
        <Menu>
            <Menu.Item disabled>
                {state.user.username}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <span onClick={logout}>
                    登出
                </span>
            </Menu.Item>

        </Menu>
    );


    return (
        <Container>
            <Heart></Heart>
            <User>
                <Dropdown overlay={menu}>
                    <Avatar size="large" src={state.user.avatar} />
                </Dropdown>
            </User>
        </Container>
    )
}
