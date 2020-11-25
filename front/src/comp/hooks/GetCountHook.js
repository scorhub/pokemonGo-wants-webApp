import React, { useEffect } from 'react';
import apiService from '../../serv/apiservice';

const GetCountHook = ({setList}) => {
  const counthook = () => {
    apiService.getPokemonCount()
    .then(res => { setList(res) })
    .catch(err => { console.log('error: ', err) });
  };
  useEffect(counthook, []);
  return (<></>);
};

export default GetCountHook;