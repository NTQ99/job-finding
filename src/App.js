import React, { Component } from "react";
import {Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/login";

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
                  <Route exact path = '/login'>
                      <Login />
                  </Route>
                  <Route exact path = '/recruiter'>
                  </Route>
                  <Route path="/" render={() => <Redirect to='/home' />} />
              </Switch>
          </BrowserRouter>


      );
  }
}

export default App;