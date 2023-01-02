import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

class Recruiter extends Component {
  render() {
    const { recruiters } = this.props;
    return (
      <Fragment>
        {recruiters.map(item => (
          <div className="col-lg-3 pb-3">
            <div className="d-block d-md-flex listing vertical w-254">
              <div className="img d-block">
              <Link to={"/recruiter/" + item.id}><img className="img-recruiter" src={item.logo} alt="" /></Link>
              </div>
              <div className="lh-content">
                {/* <Link to="/info"> <span className="category">{item.companyName}</span></Link> */}
                <a href="/" className="bookmark"><span className="icon-heart"></span></a>
                <Link to={"/recruiter/" + item.id}> <h3>{item.companyName}</h3></Link>
                <address>{item.address}</address>
                {/* <div dangerouslySetInnerHTML={{ __html: item.description }}></div> */}
              </div>
            </div>
          </div>
        ))}
      </Fragment>
    );
  }
}
export default Recruiter;