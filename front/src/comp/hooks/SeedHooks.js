import React, { useEffect } from 'react';
import apiService from '../../serv/apiservice';

const SeedsHook = ({setList, type}) => {
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

const OtherDataHook = ({setList, type}) => {
  const otherdatahook = () => {
    apiService.otherDataSeeds(type)
    .then(res => { setList(res) })
    .catch(err => { console.log('error: ', err) });
  };
  useEffect(otherdatahook, []);
  return (<></>);
};

export default SeedsHook;
export { GetDataHook, OtherDataHook };