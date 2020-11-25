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

export default WantSeedsHook;