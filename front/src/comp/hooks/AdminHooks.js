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

const GetArchivedHook = ({setList}) => {
  const getarchivedhook = () => {
    apiService.getArchived()
    .then(res => { setList(res) })
    .catch(err => { console.log('error: ', err) });
  };
  useEffect(getarchivedhook, []);
  return (<></>);
};

const GetPastEventsHook = ({setList}) => {
  const getpasteventshook = () => {
    apiService.getPastEvents()
    .then(res => { setList(res) })
    .catch(err => { console.log('error: ', err) });
  };
  useEffect(getpasteventshook, []);
  return (<></>);
};

export default GetAddHook;
export { GetModHook, GetCountHook, GetArchivedHook, GetPastEventsHook };