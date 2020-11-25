import React, { useEffect } from 'react';
import apiService from '../../serv/apiservice';

const GetWantsHook = ({setList, type}) => {
  const mywantshook = () => {
    apiService.wantGetter(type)
    .then(res => { setList(res) })
    .catch(err => { console.log('error: ', err) });
  };
  useEffect(mywantshook, []);
  return (<></>);
};

export default GetWantsHook;