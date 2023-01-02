import React, { Component } from 'react';
import {Link} from "react-router-dom"

class PageNotFound extends Component {
  render() {
    return (
      <div id="notfound" style={{ backgroundImage: 'url(/images/bg.jpg)' }} data-aos="fade" data-stellar-background-ratio="0.5">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
            <h2>Page not found</h2>
          </div>
          <Link to="/">Quay về trang chủ</Link>
        </div>
      </div>

    );
  }
}

export default PageNotFound;