import React, { useEffect } from 'react';
import apiService from '../../serv/apiservice';

const GetMyWantsHook = ({setList, type}) => {
  const mywantshook = () => {
    apiService.myWantGetter(type)
    .then(res => { setList(res) })
    .catch(err => { console.log('error: ', err) });
  };
  useEffect(mywantshook, []);
  return (<></>);
};

export default GetMyWantsHook;