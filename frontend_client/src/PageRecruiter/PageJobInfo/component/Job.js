import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router";
import { Link } from "react-router-dom"
import Modal from "./Modal";

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      cities: [],
      status: [],
    };
  }

  componentWillMount() {
    this.getList();
  }

  getList = async () => {
    let Lcity = await fetch("/admin/api/city/list").then(response => response.json())
    let Lstatus = await fetch("/admin/api/status/list").then(response => response.json())

    this.setState({
      cities: Lcity,
      status: Lstatus,
    })
  };

  handleOpenModel = () => {
    this.setState({ isOpenModal: true })
  }

  handleClose = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    const { job } = this.props
    const { isOpenModal, cities, status } = this.state;
    return (
      <Fragment>
        {isOpenModal && (
          <Modal
            cities={cities}
            status={status}
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
              <a href="##" className="bookmark"><span className="icon-heart"></span></a>
              <h3>Nhà tuyển dụng:<Link to="#"> {job.recruiter.companyName}</Link></h3>
              <address className="mb-0" style={{ width: "70%" }}>Địa chỉ: {job.recruiter.address} </address>
              <span className="review mb-0">Hạn nộp hồ sơ: {job.expired}</span>
              <div className=" submit-bt">
              <Link to={{
                  pathname: '/chinh-sua-cong-viec',
                  state: {
                   job
                  }
                }}  className="btn btn-primary rounded py-2 px-4 text-white " >Chỉnh sửa</Link>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Job);
