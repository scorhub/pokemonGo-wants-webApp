import React, { useEffect } from 'react';
import apiService from '../../serv/apiservice';

const GetDataHook = ({setList}) => {
  const datahook = () => {
    apiService.getList()
    .then(res => { setList(res) })
    .catch(err => { console.log('error: ', err) });
  };
  useEffect(datahook, []);
  return (<></>);
};

export default GetDataHook;