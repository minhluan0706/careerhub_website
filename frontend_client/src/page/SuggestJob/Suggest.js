import React, { Component, Fragment } from 'react';
import Menu from "../../Component/Header/Menu";
import "./style.css";
import Pagination from "../../Component/Pagination/Pagination";
import SuggestJobItem from './SuggestJobItem';

class SuggestJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curentUser: null,
      jobs: [],
      pageOfItems: []
    };
  }

  onChangePage = (pageOfItems) => {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  async componentDidMount() {
    const curUser = await JSON.parse(localStorage.getItem('currentUser'));
    let jobList = await fetch('/admin/api/job/list').then(response => response.json())

    this.setState({
      curentUser: curUser,
      jobs: jobList.filter(job => Date.parse(job.expired) > Date.now() && this.hasCommonElement(curUser.usersSkillList.map(item => item.skill.id),job.jobRequireSkillList.map(item => item.skill.id)))
    })

  }

  hasCommonElement = (usersSkillList, jobSkillList) => { 
    return usersSkillList.some(item => jobSkillList.includes(item)) 
  } 

  render() {
    const { curentUser, jobs } = this.state;
    if (!curentUser)
      return <div>Đang tải ...</div>
    return (
      <Fragment>
        <div className="site-navbar container py-0" style={{ backgroundImage: 'url(images/hero-1.jpg)' }} role="banner">
          <Menu />
        </div>
        <div className="container bootstrap snippet" data-aos="fade" data-stellar-background-ratio="0.5">
          <div className="row" style={{ marginTop: "135px" }}>
            <div className="col-sm-4">
              <div className="page-dashboard__user-profile-info">
                <div className="avatar img-circle">
                  <img style={{ height: "100px", width: "100px", borderRadius: "100%" }} src={curentUser.avatar} alt=""></img>
                </div>
                <a href="##"><h3 className="full-name">{curentUser.name}</h3></a>
                <ul className="list-group user-info m-b-sm text-left">
                  <li className="list-group-item hidden-xs hidden-sm">Email: {curentUser.email}</li>
                  <li className="list-group-item hidden-xs hidden-sm">Ngày sinh: {curentUser.birthday}</li>
                  <li className="list-group-item hidden-xs hidden-sm">Địa chỉ: {curentUser.address}</li>
                  <li className="list-group-item hidden-xs hidden-sm">Số điện thoại: {curentUser.sdt}</li>
                </ul>
              </div>
            </div>
            <div className="col-sm-8" style={{marginBottom:"20px"}}>
              <ul className="nav nav-tabs" style={{ fontSize: "20px", fontWeight: "bold" }}>
                CÔNG VIỆC ĐƯỢC GỢI Ý CHO BẠN
              </ul>
              <div className="col-xs-12 page-dashboard__jobs-list">
                <SuggestJobItem jobs={this.state.pageOfItems} />
                <div className='pagination-controls'>
                  <Pagination items={jobs} onChangePage={this.onChangePage}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SuggestJob;