import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

class myJobRecruiter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listJobRecruiter: this.props.listJobRecruiter,
    };
  }

  handleUpdateJob = (id) => {
    const { listJobRecruiter } = this.state
    const jobBeforeUpdate = listJobRecruiter.filter(item => item.id === id)[0]
    const jobAfterUpdate = {
      ...jobBeforeUpdate,
      status: {
        id: (jobBeforeUpdate.status.statusName === 'AVAILABLE') ? 2 : 1
      }
    }
    // document.querySelector(`#job-status-${id}`).innerHTML = jobAfterUpdate.status.statusName === 'AVAILABLE' ? 'Ẩn Bài Đăng' : 'Hiển thị'
    // console.log(id + document.querySelector(`#job-status-${id}`).innerHTML)
    fetch(`/admin/api/job/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jobAfterUpdate)
    }).then(res => window.location.reload())
  };

  handClick = (id) => {
    localStorage.setItem('userAddJob', id);
  }

  render() {
    const { curentRecruiter } = this.props;
    const { listJobRecruiter } = this.state
    
    return (
      <Fragment>
        {listJobRecruiter && listJobRecruiter.map(item => (
          <div className="d-block d-md-flex listing border">
            <div className="img d-block text-center">
              <Link to={"/job-recruiter/"+item.id}><img className="img-JobUser" src={item.recruiter.logo} alt="" /></Link>
            </div>
            <div className="lh-content" >
              <Link to={"/job-recruiter/"+item.id}><h6> {item.title}</h6></Link>
              <button id={`job-status-${item.id}`} className="btn btn-light" style={{float:"right", position:"absolute", right:"25px", top:"10px"}} onClick={() => this.handleUpdateJob(item.id)}>{
                item.status.statusName ==="AVAILABLE" ? 'Ẩn bài đăng' : 'Hiển thị'
              }</button>
              

              <Link to="/user-apply-job" className="btn btn-warning btn-apply" onClick={() => this.handClick(item.id)}>Xem hồ sơ</Link>
              <h3>Nhà tuyển dụng:<Link to="#"> {curentRecruiter.companyName}</Link></h3>
              <address className="addre">Địa chỉ: {item.city.name} </address>
              <p className="mb-0">
                <span className="review">Hạn nộp hồ sơ: {item.expired}</span>
              </p>
            </div>
          </div>
        ))}
      </Fragment>
    );
  }
}

export default myJobRecruiter;