import React, { useEffect } from 'react';
import adminService from '../../serv/adminservice';

const AdminTokenHook = () => {
    const admintokenhook = () => {
      const loggedJSON = window.localStorage.getItem('loggedWantAppUser');
      if (loggedJSON) {
          const user = JSON.parse(loggedJSON);
          if((user.ucid === 1 || 2)) { adminService.setToken(user.token); }
      };
  };
    useEffect(admintokenhook, []);
    return (<></>);
};

const GetAddHook = ({setList, type}) => {
  const getaddhook = () => {
    adminService.getAddData(type)
    .then(res => { setList(res) })
    .catch(err => { window.alert('Error has occured: ' + err) });
  };
  useEffect(getaddhook, []);
  return (<></>);
};

const GetModHook = ({setList}) => {
  const getmodhook = () => {
    adminService.getModData()
    .then(res => { setList(res) })
    .catch(err => { window.alert('Error has occured: ' + err) });
  };
  useEffect(getmodhook, []);
  return (<></>);
};

const GetCountHook = ({setList}) => {
  const counthook = () => {
    adminService.getPokemonCount()
    .then(res => { setList(res) })
    .catch(err => { window.alert('Error has occured: ' + err) });
  };
  useEffect(counthook, []);
  return (<></>);
};

const GetArchivedHook = ({setList}) => {
  const getarchivedhook = () => {
    adminService.getArchivedNews()
    .then(res => { setList(res) })
    .catch(err => { window.alert('Error has occured: ' + err) });
  };
  useEffect(getarchivedhook, []);
  return (<></>);
};

const GetPastEventsHook = ({setList}) => {
  const getpasteventshook = () => {
    adminService.getPastEvents()
    .then(res => { setList(res) })
    .catch(err => { window.alert('Error has occured: ' + err) });
  };
  useEffect(getpasteventshook, []);
  return (<></>);
};

const GetArchFeatsHook = ({setList}) => {
  const getarchfeatshook = () => {
    adminService.getArchivedFeats()
    .then(res => { setList(res) })
    .catch(err => { window.alert('Error has occured: ' + err) });
  };
  useEffect(getarchfeatshook, []);
  return (<></>);
};

export default GetAddHook;
export { AdminTokenHook, GetModHook, GetCountHook, GetArchivedHook, GetPastEventsHook, GetArchFeatsHook };