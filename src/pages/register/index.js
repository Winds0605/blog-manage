import React from 'react'
import { LoginContainer, Box, Text } from './style'
import { Input, Form, Button, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { USregister } from 'route/user'
import { post } from 'utils/http'

export default () => {

    const confirmPassword = (rule, value, callback) => {
        const password = form.getFieldValue('password')
        if (password && password !== value) {
            callback(new Error('两次密码输入不一致'));
        } else {
            callback();
        }
    }

    const [form] = Form.useForm()
    const history = useHistory()

    const onFinish = async (values) => {
        let res
        try {
            res = await post(USregister, {
                ...values
            })
        } catch (error) {
            throw error
        }
        if (res.data.code !== 200) {
            message.error('注册失败')
            return
        }
        message.success('注册成功')
        history.push('/login')
    }

    const toLogin = () => {
        history.push('/login')
    }

    return (
        <LoginContainer>
            <Box>
                <h1>Register</h1>
                <Form
                    name="basic"
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        className="form-item"
                        rules={[{ required: true, message: '请输入用户名' }, { min: 4, max: 10, message: '用户名长度需要在4~10之间' }]}
                    >
                        <Input className="username" autoComplete='off' placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        className="form-item"
                        rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '不符合邮箱格式' }]}
                    >
                        <Input className="username" autoComplete='off' placeholder="请输入邮箱" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        className="form-item"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password className="password" autoComplete='off' placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        className="form-item"
                        rules={[{ required: true, message: '请确认密码' }, { validator: confirmPassword, validateTrigger: 'onFocus' }]}
                    >
                        <Input.Password className="password" autoComplete='off' placeholder="请确认密码" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="submit">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
                <Text>已有账号？前往<b onClick={toLogin}>登录</b></Text>
            </Box>
        </LoginContainer>
    )
}
