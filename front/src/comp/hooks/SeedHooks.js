import React, { useEffect } from 'react';
import apiService from '../../serv/apiservice';

const WantSeedsHook = ({setList, type}) => {
  const seedhook = () => {
    apiService.wantSeedGetter(type)
    .then(res => { setList(res) })
    .catch(err => { console.log('error: ', err) });
  };
  useEffect(seedhook, []);
  return (<></>);
};

const GetDataHook = ({setList, type}) => {
  const datahook = () => {
    apiService.getPokemonSeeds(type)
    .then(res => { setList(res) })
    .catch(err => { console.log('error: ', err) });
  };
  useEffect(datahook, []);
  return (<></>);
};

export default WantSeedsHook;
export { GetDataHook };