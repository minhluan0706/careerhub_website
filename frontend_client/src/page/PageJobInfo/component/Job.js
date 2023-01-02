import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router";
import { Link } from "react-router-dom"
import Modal from "./Modal";

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curentUser: null,
      isOpenModal: false,
      jobUsers: []
    };
  }

  async componentDidMount() {
    const curUser = await JSON.parse(localStorage.getItem('currentUser'));
    this.setState({ curentUser: curUser });

    if (curUser) {
      let data = await fetch(`/admin/api/userjob/user/` + curUser.id).then(response => response.json())
      this.setState({
        jobUsers: data,
      })
    }
  }

  handleOpenModel = () => {
    if (!localStorage.getItem("currentUser")) {
      this.props.history.push("/login")
    }
    this.setState({ isOpenModal: true })
  }

  // handleApply = async (id) => {
  //   if (!localStorage.getItem("currentUser")) {
  //     this.props.history.push("/login")
  //   }
  //   else {
  //     fetch(`/admin/api/userjob/`, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         "job": { "id": id },
  //         "users": { "id": this.state.curentUser.id }
  //       })
  //     })
  //     this.setState({ isOpenModal: true })
  //   }
  // }
  
  handleClose = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    const { job } = this.props
    const { isOpenModal, jobUsers, curentUser } = this.state;
    return (
      <Fragment>
        {isOpenModal && (
          <Modal
            curentUser={curentUser}
            job={job}
            isOpenModal={isOpenModal}
            handleClose={this.handleClose}
          />
        )}
        <div className="col-lg-12 block" >
          <div className="d-block d-md-flex listing" style={{ height: "163px", padding: "5px", border: "1px solid #e1e1e1" }}>
            <Link to="#" className="img d-block img-max" style={{ backgroundImage: `url("${job.recruiter.logo}")` }}></Link>
            <div className="lh-content" >
              <h6 style={{ fontWeight: "bold" }}>{job.title}</h6>
              <a href="/" className="bookmark"><span className="icon-heart"></span></a>
              <h3>Nhà tuyển dụng:<Link to="#">{job.recruiter.companyName}</Link></h3>
              <address className="mb-0">Địa chỉ: {job.recruiter.address} </address>
              <span className="review mb-0">Hạn nộp hồ sơ: {job.expired}</span>
              <div className=" submit-bt">
                {(jobUsers.map(item => (item.job.id))).indexOf(job.id) > -1
                  ?
                  <button className="btn btn-primary rounded py-2 px-4 text-white " disabled >ĐÃ ỨNG TUYỂN</button>
                  :
                  <button className="btn btn-primary rounded py-2 px-4 text-white " onClick={this.handleOpenModel}>ỨNG TUYỂN</button>
                }
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Job);
