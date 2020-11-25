import React, { useEffect } from 'react';
import apiService from '../../serv/apiservice';

const TokenHook = () => {
    const tokenhook = () => {
        const loggedJSON = window.localStorage.getItem('loggedWantAppUser');
        if (loggedJSON) {
            const user = JSON.parse(loggedJSON);
            apiService.setToken(user.token);
        };
    };
    useEffect(tokenhook, []);
    return (<></>);
};

export default TokenHook;