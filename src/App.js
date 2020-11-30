import React, { Component } from "react";
import {Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Home from "./pages/home";
import Recruiter from "./pages/recruiter";
import Login from "./pages/login";

import JobDetail from './component/JobDetail';

function PrivateRoute({ children, ...rest }) {
  return (
      <Route
          {...rest}
          render={() => localStorage.uid ? (children) : (<Redirect to='/signin' />)}
      />
  );
}

class App extends Component {
  render() {
      return (
          <BrowserRouter>
              <Switch>
                  <Route exact path = "/home">
                      <Home />
                  </Route>
                  {/* <Route exact path="/jobs/:id" component={JobDetail}/> */}
                  <Route exact path = '/login'>
                      <Login />
                  </Route>
                  <Route exact path = '/recruiter'>
                    <Recruiter />
                  </Route>
                  <Route path="/" render={() => <Redirect to='/home' />} />
              </Switch>
          </BrowserRouter>


      );
  }
}

export default App;