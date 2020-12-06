import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PageNotFound from './comp/pages/PageNotFound';
import PrivateRoute from './comp/PrivateRoute';
import MainRouter from './comp/MainRouter';
import Login from './comp/Login';


const App = () => {
  return (
    <Router>
        <Switch>
          <Route path={`/login`} component={Login} />
          <PrivateRoute path="/" component={MainRouter} />
          <Route component={PageNotFound} />
        </Switch>
    </Router>
  );
};

export default App;