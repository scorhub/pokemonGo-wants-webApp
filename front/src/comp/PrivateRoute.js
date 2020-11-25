import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Page, ...rest }) => {
    const logIn = window.localStorage.getItem("loggedWantAppUser");

    if (logIn === null) {  return ( <Redirect to="/login" /> ) };

    if (logIn) {
        return ( <Route {...rest} render={(props) => ( <Page {...props} /> )} /> );
    };

    return ( <Redirect to="/login" /> );
};

export default PrivateRoute;