import React, { useEffect } from 'react';
import adminservice from '../../serv/adminservice';

const SeedsHook = ({setList, type}) => {
  const seedhook = () => {
    adminservice.wantSeedGetter(type)
    .then(res => { setList(res) })
    .catch(err => { window.alert('Error has occured: ' + err) });
  };
  useEffect(seedhook, []);
  return (<></>);
};

const GetDataHook = ({setList, type}) => {
  const datahook = () => {
    adminservice.getPokemonSeeds(type)
    .then(res => { setList(res) })
    .catch(err => { window.alert('Error has occured: ' + err) });
  };
  useEffect(datahook, []);
  return (<></>);
};

const OtherDataHook = ({setList, type}) => {
  const otherdatahook = () => {
    adminservice.otherDataSeeds(type)
    .then(res => { setList(res) })
    .catch(err => { window.alert('Error has occured: ' + err) });
  };
  useEffect(otherdatahook, []);
  return (<></>);
};

export default SeedsHook;
export { GetDataHook, OtherDataHook };