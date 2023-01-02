import React, { Component, Fragment } from 'react';
import Menu from "../ComponentRecruiter/Header/Menu";
import UserApply from "./UserApply";

class UserApplyjob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curentRecruiter: null,
      userAddJob: []
    };
  }

  async componentDidMount() {
    const curRecruiter = await JSON.parse(localStorage.getItem('currentRecruiter'));
    const data = await JSON.parse(localStorage.getItem('userAddJob'));

    let userAddJobRec = await fetch(`/admin/api/userjob/job/` + data).then(response => response.json())
    this.setState({
      curentRecruiter: curRecruiter,
      userAddJob: userAddJobRec,
    })
  }
  render() {
    const { curentRecruiter, userAddJob } = this.state;
    if (!curentRecruiter)
      return <div>Đang tải ...</div>
    return (
      <Fragment>
        <div className="site-navbar container py-0 " style={{ backgroundImage: 'url(images/hero-1.jpg)' }} role="banner">
          <Menu />
        </div>
        <div className="container bootstrap snippet" data-aos="fade" data-stellar-background-ratio="0.5">
          <div className="row" style={{ marginTop: "135px" }}>
            <div className="col-sm-12">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" href="#profilerecruiter" role="tab" data-toggle="tab">Tất cả hồ sơ đã ứng tuyển vào công việc này</a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane active" id="profilerecruiter">
                  <hr />
                  <UserApply userAddJob={userAddJob} />
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UserApplyjob;