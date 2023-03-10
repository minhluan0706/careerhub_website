import React, { Component } from 'react';
import Menu from "../ComponentRecruiter/Header/Menu";
import Header from "./component/Header";
import Footer from "../ComponentRecruiter/Footer/Footer";
import UpdateInfoPrSk from './component/UpdateInfoPrSk';
import UpdateJob from "./component/UpdateJob"

const getInitialState = () => {
  const initialState = {
    jobs: [],
    cities: [],
    status: [],
    recruiter: [],
    profession: [],
    skills: [],
    curentRecruiter: null,
  };
  return initialState;
};

class index extends Component {

  constructor(props) {
    super(props);
    this.state = getInitialState();
  }

  componentDidMount() {
    this.getList();
    const curRecruiter = JSON.parse(localStorage.getItem('currentRecruiter'));
    this.setState({ curentRecruiter: curRecruiter });
  }

  getList = async () => {
    let Lcity = await fetch("/admin/api/city/list").then(response => response.json())
    let Lstatus = await fetch("/admin/api/status/list").then(response => response.json())

    let Lrecruiter = await fetch("/admin/api/recruiter/list").then(response => response.json())

    let LProfession = await fetch("/admin/api/profession/list").then(response => response.json())

    let LSkill = await fetch("/admin/api/skill/list").then(response => response.json())

    this.setState({
      cities: Lcity,
      status: Lstatus,
      recruiter: Lrecruiter,
      profession: LProfession,
      skills: LSkill
    })
  };

  render() {
    const { cities, status, curentRecruiter, profession, skills } = this.state;
    const { job } = this.props.location.state
    if (!curentRecruiter)
      return <div>Loading ...</div>
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
        <div className="site-blocks-cover inner-page-cover overlay" style={{ backgroundImage: 'url(images/img_3.jpg)' }} data-aos="fade" data-stellar-background-ratio="0.5">
          <div className="container">
            <Header />
          </div>
        </div>

        <div className="site-section bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-8 mb-5">
                <UpdateJob job = {job} curentRecruiter={curentRecruiter} skills={skills} cities={cities} status={status} profession={profession} />
              </div>
              <div className="col-lg-4">
                <UpdateInfoPrSk job = {job} curentRecruiter={curentRecruiter} skills={skills}  profession={profession} />
              </div>
            </div>
          </div>
        </div>
        <div className="site-footer">
          <Footer />
        </div>
      </div >

    );
  }
}

export default index;