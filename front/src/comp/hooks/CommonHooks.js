import React, { useEffect } from 'react';
import apiService from '../../serv/apiservice';

const FrontHook = ({setList}) => {
    const fronthook = () => {
        apiService.getFrontFeed()
        .then(res => { setList(res) })
        .catch(err => { window.alert('Error has occured: ' + err) });
      };
    useEffect(fronthook, []);
    return (<></>);
};

const EventsHook = ({setList}) => {
    const eventshook = () => {
        apiService.getEvents()
        .then(res => { setList(res) })
        .catch(err => { window.alert('Error has occured: ' + err) });
      };
    useEffect(eventshook, []);
    return (<></>);
};

const NewsHook = ({setList}) => {
    const newshook = () => {
        apiService.getNews()
        .then(res => { setList(res) })
        .catch(err => { window.alert('Error has occured: ' + err) });
      };
    useEffect(newshook, []);
    return (<></>);
};

const GetFeaturesHook = ({setList}) => {
  const featurehook = () => {
    apiService.getFeatures()
    .then(res => { setList(res) })
    .catch(err => { window.alert('Error has occured: ' + err) });
  };
  useEffect(featurehook, []);
  return (<></>);
};

const GetOthersHook = ({setList}) => {
  const getothers = () => {
    apiService.others()
    .then(res => { setList(res) })
    .catch(err => { window.alert('Error has occured: ' + err) });
  };
  useEffect(getothers, []);
  return (<></>);
};

export default FrontHook;
export { EventsHook, NewsHook, GetFeaturesHook, GetOthersHook };