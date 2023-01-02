import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

class SuggestJobItem extends Component {
  render() {
    const { jobs } = this.props;
    if (!jobs)
      return <div>Loading ...</div>
    return (
      <Fragment>

            {jobs && jobs.map(item => (
              <div className="info-employer-job">
                <div className="info-left">
                  <span className="icon-detail-company"><img className="img-job" src={item.recruiter.logo} alt=""></img></span>
                  <div className="text-gray-light">
                    <Link to={"/job/" + item.id}><h6 className="txt-title">{item.title}</h6></Link>
                    <address className="addre">{item.recruiter.companyName}</address>
                  </div>
                </div>
                <div className="info-right">
                  <span className="review"><img className="icon3" src={"/images/icon7.png"} alt=""></img></span>
                  <p>{item.city.name}</p>
                </div>

                <div className="info-right">
                  <span className="review"><img className="icon3" src={"/images/icon6.png"} alt=""></img></span>
                  <p className="color-red">{item.expired}</p>
                </div>
              </div>
            ))}
      </Fragment>
    );
  }
}

export default SuggestJobItem;