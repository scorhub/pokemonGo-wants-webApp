import React, { useEffect } from 'react';
import apiService from '../../serv/apiservice';

const FrontHook = ({setList}) => {
    const fronthook = () => {
        apiService.getFrontFeed()
        .then(res => { setList(res) })
        .catch(err => { console.log('error: ', err) });
      };
    useEffect(fronthook, []);
    return (<></>);
};

export default FrontHook;