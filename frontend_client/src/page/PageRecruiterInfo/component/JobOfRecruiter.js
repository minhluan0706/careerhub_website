import React, { Component } from 'react';
import { Link } from "react-router-dom";

class JobOfRecruiter extends Component {
  render() {
    const { listJobRecruiter } = this.props;
    return (
      <div className="info-employer col-xs-12" style={{ padding: "15px 23px" }}>
        {listJobRecruiter && listJobRecruiter.map(item => (
          <div className="info-employer-job" style={{ padding: "0px" }}>
            <div className="info-left">
              <span className="icon-detail-company" style={{ padding: "10px 20px 0px 0px" }}><img className="icon3" src={"/images/icon5.png"} alt=""></img></span>
              <div>
                <Link to={"/job/" + item.id}><h6> {item.title}</h6></Link>
                <p className="addre" style={{ fontWeight: "bold" }}>
                  Kĩ năng: {item.jobRequireSkillList ? item.jobRequireSkillList.map(jobskil => { return jobskil.skill.skillName + ', ' }) : ""}
                </p>
              </div>
            </div>

            <div className="info-right">
              <span className="review"><img className="icon3" src={"/images/icon7.png"} alt=""></img></span>
              <p>{item.city.name}</p>
            </div>

            <div className="info-right">
              <span className="review"><img className="icon3" src={"/images/icon6.png"} alt=""></img></span>
              <p>{item.expired}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default JobOfRecruiter;