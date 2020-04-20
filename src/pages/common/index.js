import React from 'react'
import { Redirect } from 'react-router-dom';
import { isLogin } from 'utils/util';

export default () => {
    return (
        isLogin ? <Redirect to="/login" /> : <Redirect to="/home" />
    )
}
