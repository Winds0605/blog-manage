import React from 'react';
import { storeContext } from './store';

export default (props) => {
    return (
        <storeContext.Provider value={props.store}>
            {props.children}
        </storeContext.Provider >
    )
}
