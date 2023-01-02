import React, { Component, Fragment } from 'react';
import {Link} from "react-router-dom"

class RecruiterItem extends Component {
  render() {
    const { recruiters } = this.props;
    return (
      <div className="col-lg-3">
        <div className="d-block d-md-flex listing vertical">
          <a href="#" className="img d-block" style={{ backgroundImage: 'url("images/img_1.jpg")' }} />
          <div className="lh-content">
            <h4 className="category">Cars &amp; Vehicles</h4>
            <h3><a href="#">Red Luxury Car</a></h3>
            <address>Don St, Brooklyn, New York</address>
          </div>
        </div>
      </div>
    );
  }
}

export default RecruiterItem;