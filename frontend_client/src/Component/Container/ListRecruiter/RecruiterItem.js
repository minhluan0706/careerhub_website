import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom"

class RecruiterItem extends Component {
  render() {
    const { recruiters } = this.props;
    return (
      <Fragment>
        {recruiters && recruiters.map(item => (
          <div className="col-lg-3" style={{ marginBottom: "10px" }}>
            <div className="d-block d-md-flex listing vertical w-254">
              <div className="img d-block">
                <Link to={"/recruiter/" + item.id}><img className="img-recruiter" src={item.logo} alt="" /></Link>
              </div>
              <div className="lh-content" style={{ padding: "5px 12px" }}>
                <Link to={"/recruiter/" + item.id}><h3>{item.companyName}</h3></Link>
                <address className="address">Địa chỉ: {item.address}</address>
              </div>
            </div>
          </div>
        ))}
      </Fragment>
    );
  }
}

export default RecruiterItem;