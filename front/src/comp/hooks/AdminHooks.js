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

const GetModHook = ({setList}) => {
  const getmodhook = () => {
    apiService.getModData()
    .then(res => { setList(res) })
    .catch(err => { console.log('error: ', err) });
  };
  useEffect(getmodhook, []);
  return (<></>);
};

const GetCountHook = ({setList}) => {
  const counthook = () => {
    apiService.getPokemonCount()
    .then(res => { setList(res) })
    .catch(err => { console.log('error: ', err) });
  };
  useEffect(counthook, []);
  return (<></>);
};

export default GetAddHook;
export { GetModHook, GetCountHook };