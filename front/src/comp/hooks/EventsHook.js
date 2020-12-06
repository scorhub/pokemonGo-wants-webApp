import React, { useEffect } from 'react';
import apiService from '../../serv/apiservice';

const EventsHook = ({setList}) => {
    const eventshook = () => {
        apiService.getEvents()
        .then(res => { setList(res) })
        .catch(err => { console.log('error: ', err) });
      };
    useEffect(eventshook, []);
    return (<></>);
};

export default EventsHook;