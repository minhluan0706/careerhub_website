import React, { Component } from 'react';
import Menu from "../ComponentRecruiter/Header/Menu"
import Header from './component/Header';
import Infomation from './component/Info';
import Footer from '../ComponentRecruiter/Footer/Footer';
import Job from "./component/Job";

class JobInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {
        recruiter: {},
        city: {},
        status:{},
        jobRequireProfessionJobList: []
      }
    }
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    fetch(`/admin/api/job/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(data => this.setState({ job: data }));
  }
  
  render() {
    const {job} = this.state;
    return (
      <div className="site-wrap bg-light">
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
        <div className="site-blocks-cover inner-page-cover overlay" style={{ backgroundImage: 'url(https://s3.amazonaws.com/media.eremedia.com/wp-content/uploads/2017/12/14100649/pexels-photo-327540.jpeg)'}} data-aos="fade" data-stellar-background-ratio="0.5">
          <Job job ={job} />
          <div className="container">
            <Header />
          </div>
        </div>
        <div className="site-section" style={{marginTop:"70px"}}>
          <div className="container">
            <Infomation job ={job}/>
          </div>
         
        </div>
        <div className="site-footer">
          <Footer />
        </div>
      </div>

    );
  }
}

export default JobInfo;
