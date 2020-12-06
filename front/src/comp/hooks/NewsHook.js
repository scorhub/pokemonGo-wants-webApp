import React, { useEffect } from 'react';
import apiService from '../../serv/apiservice';

const NewsHook = ({setList}) => {
    const newshook = () => {
        apiService.getNews()
        .then(res => { setList(res) })
        .catch(err => { console.log('error: ', err) });
      };
    useEffect(newshook, []);
    return (<></>);
};

export default NewsHook;