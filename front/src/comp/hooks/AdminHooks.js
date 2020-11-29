import React, { useEffect } from 'react';
import apiService from '../../serv/apiservice';

const GetAddHook = ({setList, type}) => {
  const getaddhook = () => {
    apiService.getAddData(type)
    .then(res => { setList(res) })
    .catch(err => { console.log('error: ', err) });
  };
  useEffect(getaddhook, []);
  return (<></>);
};

export default GetAddHook;