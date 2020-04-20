import React from 'react'
import { LoginContainer, Box, Text } from './style'
import { Input, Form, Button, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { USlogin } from 'route/user'
import { post } from 'utils/http'
import { storeContext } from 'store/store';
import useConnect from 'store/connects'
import * as actionType from 'store/contants'
import jwt_decode from 'jwt-decode'

const Login = () => {

    const history = useHistory()
    const { dispatch } = useConnect(storeContext)

    const onFinish = async (values) => {
        let res
        try {
            res = await post(USlogin, {
                ...values
            })
        } catch (error) {
            throw error
        }
        if (res.data.code === 404) {
            message.warning(res.data.msg)
            return
        } else if (res.data.code !== 200) {
            message.error('登录失败')
            return
        }
        message.success('登录成功')
        const token = res.data.data.token
        const user = jwt_decode(token)
        localStorage.setItem('token', token)
        dispatch({ type: actionType.SET_TOKEN, data: token })
        dispatch({ type: actionType.SET_USER, data: user })
        history.push('/home')
    }

    const toRegister = () => {
        history.push('/register')
    }

    return (
        <LoginContainer>
            <Box>
                <h1>LOGIN</h1>
                <Form
                    name="basic"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        className="form-item"
                        rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '不是邮箱格式', validateTrigger: 'onFocus' }]}
                    >
                        <Input className="username" autoComplete='off' placeholder="请输入邮箱" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        className="form-item"
                        rules={[{ required: true, message: '请输入你的密码' }]}
                    >
                        <Input.Password className="password" autoComplete='off' placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                <Text>已有账号？前往<b onClick={toRegister}>注册</b></Text>
            </Box>
        </LoginContainer>
    )
}


export default Login
