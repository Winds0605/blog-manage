import React from 'react';
import * as contants from './contants'

export const storeContext = React.createContext();
export const initialState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {
    user: null,
    token: ''
}
export const reducer = (state, action) => {
    let _state;
    switch (action.type) {
        case contants.SET_TOKEN:
            _state = {
                ...initialState,
                token: action.data
            }
            localStorage.setItem('state', JSON.stringify(_state))
            return _state
        case contants.SET_USER:
            _state = {
                ...initialState,
                user: action.data
            }
            localStorage.setItem('state', JSON.stringify(_state))
            return _state
        default:
            localStorage.setItem('state', JSON.stringify(initialState))
            return initialState;
    }
}
