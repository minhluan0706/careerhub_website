import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "./views/Common/layouts/Admin";
import "./views/Common/assets/css/material-dashboard-react.css?v=1.6.0";
import PageLogin from "./views/PageLogin";

const hist = createBrowserHistory();

ReactDOM.render(
  <Fragment>
    <Router history={hist}>
      <Switch>
        <Route path="/login" component={PageLogin} />
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
    <ToastContainer
      position="top-center"
      autoClose={2000}
      pauseOnHover
      style={{ zIndex: 19999 }}
    />
  </Fragment>,
  document.getElementById("root")
);
