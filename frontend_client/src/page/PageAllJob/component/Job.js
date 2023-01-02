import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom"

class Job extends Component {
  render() {
    const { jobs } = this.props;

    return (
      <Fragment>
        {jobs && jobs.map(item => (
          <div className="col-lg-12 ">
            <div className="d-block d-md-flex listing border list">
              <div className="img d-block">
              <Link to={"/job/" + item.id}> <img className="img-alljob" src={item.recruiter.logo} alt=""/> </Link>
                 </div>
              <div className="lh-content txt-lhcontent">
                <Link to={"/job/" + item.id}><h6> {item.title}</h6></Link>
                <a href="##" className="bookmark"><span className="icon-heart"></span></a>
                <h3>Nhà tuyển dụng:{item.recruiter.companyName}</h3>
                <address className="addre">Địa chỉ: {item.city.name}</address>
                <p className="mb-0">
                  <span className="review">Thời hạn: {item.expired}</span>
                </p>
                <p className="mb-0 date">
                  <span className="review">Ngày cập nhật: {item.date}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </Fragment>
    );
  }
}

export default Job;
