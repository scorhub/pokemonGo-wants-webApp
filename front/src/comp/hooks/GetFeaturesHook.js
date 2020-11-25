import React, { useEffect } from 'react';
import apiService from '../../serv/apiservice';

const GetFeaturesHook = ({setList}) => {
  const featurehook = () => {
    apiService.getFeatures()
    .then(res => { setList(res) })
    .catch(err => { console.log('error: ', err) });
  };
  useEffect(featurehook, []);
  return (<></>);
};

export default GetFeaturesHook;