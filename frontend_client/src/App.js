import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import routes from './router';
import ScrollToTop from "./ScrollOnTop";
import PageNotFound from "./PageNotFound/index";

class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <div>
            {this.showContentMenus(routes)}
          </div>
        </ScrollToTop>
      </Router>
    );
  }

  showContentMenus = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return (
      <Switch>
        {result}
        <Route component={PageNotFound} />
      </Switch>);
  }

}

export default App;
