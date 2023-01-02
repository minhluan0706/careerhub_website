import React, { Component, Fragment } from 'react';
import {Link} from "react-router-dom"

class JobItem extends Component {
  render() {
    const { jobs } = this.props;
    return (
      <Fragment>
        {jobs.map(item =>(
        <div className="col-lg-6">
          <div className="d-block d-md-flex listing" style={{marginBottom:"5px"}}>
            <Link to="" className="img d-block" style={{ backgroundImage: 'url("images/img_2.jpg")' }} />
            <div className="lh-content">
              <Link to="/info-job"><h4>{item.title}</h4></Link>
              <h3>Nhà tuyển dụng:<Link to="/"> {item.recruiter.companyName}</Link></h3>
              <address className="addre">Địa chỉ: {item.city.name}</address>
              <p className="mb-0">
                <span className="review">Hạn nộp hồ sơ: {item.expired}</span>
              </p>
            </div>
          </div>
        </div>
        ))}
      </Fragment>
    );
  }
}

export default JobItem;