import React, { Component } from 'react';
import { Link } from "react-router-dom"

class Infomation extends Component {
  render() {
    const { job } = this.props

    return (
      <div className="row" style={{ background: "#fff", padding: "30px", border: "1px solid #eee" }}>
        <div className="col-lg-8">
          <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
        </div>
        <div className="col-lg-4">
          <div className="mb-5" style={{ position: "relative", border: "1px solid rgba(0,185,242,.22)", backgroundColor: "rgba(234, 248, 252, 0.38)", padding: "12px" }}>
            <div className="form-group">
              <div className="col-xs-10 box-info">
                <span className="wid">Email liên hệ</span>
                <span className="txt-content"><Link to="#">{job.recruiter.email}</Link></span>
              </div>
              <div className="col-xs-10 box-info">
                <span className="wid">Ngày đăng tuyển</span>
                <span className="txt-content">{job.date}</span>
              </div>
              <div className="col-xs-10 box-info">
                <span className="wid">Ngày hết hạn</span>
                <span className="txt-content">{job.expired}</span>
              </div>
              <div className="col-xs-10 box-info">
                <span className="wid">Thành phố</span>
                <span className="txt-content">{job.city.name}</span>
              </div>
              <div className="col-xs-10 box-info">
                <span className="wid">Trạng thái</span>
                <span className="txt-content">{job.status.statusName}</span>
              </div>
              <div className="col-xs-10 box-info">
                <span className="wid">Kỹ năng</span>
                <span className="txt-content">
                  {job.jobRequireSkillList ?
                    job.jobRequireSkillList.map(jobskil => {
                      return jobskil.skill.skillName + ', '
                    }) : ""
                  }
                </span>
              </div>
              <div className="col-xs-10 box-info">
                <span className="wid">Ngành nghề</span>
                <span className="txt-content">
                  {job.jobRequireProfessionJobList.map(jrpj => {
                    return jrpj.professionJob.professionJobName + ', '
                  })}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Infomation;
