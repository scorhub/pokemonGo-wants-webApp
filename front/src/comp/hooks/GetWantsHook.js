import React, { useEffect } from 'react';
import apiService from '../../serv/apiservice';

const GetWantsHook = ({setList, type}) => {
  const mywantshook = () => {
    apiService.wantGetter(type)
    .then(res => { setList(res) })
    .catch(err => { window.alert('Error has occured: ' + err) });
  };
  useEffect(mywantshook, []);
  return (<></>);
};

const GetMyWantsHook = ({setList, type}) => {
  const mywantshook = () => {
    apiService.myWantGetter(type)
    .then(res => { setList(res) })
    .catch(err => { window.alert('Error has occured: ' + err) });
  };
  useEffect(mywantshook, []);
  return (<></>);
};

const GetOtherWants = ({setList, id, type}) => {
  const othershook = () => {
    apiService.otherWantGetter(id, type)
    .then(res => { setList(res) })
    .catch(err => { window.alert('Error has occured: ' + err) });
  };
  useEffect(othershook, []);
  return (<></>);
};

export default GetWantsHook;
export { GetMyWantsHook, GetOtherWants };