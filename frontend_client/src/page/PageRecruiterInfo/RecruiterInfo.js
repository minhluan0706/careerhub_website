import React, { Component } from 'react';
import Menu from '../../Component/Header/Menu';
import Header from './component/Header';
import Infomation from './component/Info';
import InputEmail from '../../Component/Container/InputEmail/InputEmail';
import Footer from '../../Component/Footer/Footer';
import DescriptionRecruiter from './component/DescriptionRecruiter';
import JobOfRecruiter from './component/JobOfRecruiter';

class RecruiterInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recruiter: {},
      listJobRecruiter: []
    }
  }

  async componentDidMount() {
    let rec = await fetch(`/admin/api/recruiter/${this.props.match.params.id}`).then(response => response.json())
    let list = await fetch(`/admin/api/job/recruiter/${this.props.match.params.id}`).then(response => response.json())
    this.setState({
      recruiter: rec,
      listJobRecruiter: list
    })
  }

  render() {
    const { recruiter, listJobRecruiter } = this.state;
    return (
      <div className="site-wrap">
        <div className="site-mobile-menu">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle" />
            </div>
          </div>
          <div className="site-mobile-menu-body" />
        </div>
        <div className="site-navbar container py-0 " role="banner">
          <Menu />
        </div>
        <div className="site-blocks-cover inner-page-cover overlay" style={{ backgroundImage: 'url(/images/hero_2.jpg)' }} data-aos="fade" data-stellar-background-ratio="0.5">
          <div className="container">
            <Header />
          </div>
        </div>
        <div className="site-section bg-light">
          <div className="container">
            <Infomation recruiter={recruiter} />
            <h4 className="text-center">Giới thiệu về công ty</h4>
            <DescriptionRecruiter recruiter={recruiter} />
            <h4 className="text-center">Việc làm {recruiter ? recruiter.companyName : ""} tuyển dụng</h4>
              <JobOfRecruiter listJobRecruiter={listJobRecruiter} />
          </div>
        </div>
        <div className="newsletter bg-primary py-5">
          <div className="container">
            <InputEmail />
          </div>
        </div>
        <div className="site-footer">
          <Footer />
        </div>
      </div>

    );
  }
}

export default RecruiterInfo;