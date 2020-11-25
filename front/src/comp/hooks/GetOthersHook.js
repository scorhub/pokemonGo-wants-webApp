import React, { useEffect } from 'react';
import apiService from '../../serv/apiservice';

const GetOthersHook = ({setList}) => {
  const getothers = () => {
    apiService.others()
    .then(res => { setList(res) })
    .catch(err => { console.log('error: ', err) });
  };
  useEffect(getothers, []);
  return (<></>);
};

const GetOtherWants = ({setList, id, type}) => {
  const othershook = () => {
    apiService.otherWantGetter(id, type)
    .then(res => { setList(res) })
    .catch(err => { console.log('error: ', err) });
  };
  useEffect(othershook, []);
  return (<></>);
};

export default GetOthersHook;
export { GetOtherWants } ;