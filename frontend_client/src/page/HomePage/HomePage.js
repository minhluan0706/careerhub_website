import React, { Component } from 'react';
import Menu from '../../Component/Header/Menu';
import Header from '../../Component/Header/Header';
import Footer from "../../Component/Footer/Footer"
import InputEmail from '../../Component/Container/InputEmail/InputEmail';
import ListProfession from '../../Component/Container/ListProfession/ListProfession';
import ListJob from '../../Component/Container/ListJob/ListJob';
import ListRecruiter from '../../Component/Container/ListRecruiter/ListRecruiter';

const getInitialState = () => {
  const initialState = {
    jobs: [],
    recruiters: [],
    cities: [],
    professions: [],
  };
  return initialState;
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
  }

  async componentDidMount() {
    let jobList = await fetch('/admin/api/job/list').then(response => response.json())
    let cityList = await fetch('/admin/api/city/list').then(response => response.json())
    let profList = await fetch('/admin/api/profession/list').then(response => response.json())
    let recruiterList = await fetch('/admin/api/recruiter/list').then(response => response.json())

    this.setState({
      jobs: jobList,
      recruiters: recruiterList,
      professions: profList,
      cities: cityList
    })
  }

  render() {
    const { jobs, recruiters, cities, professions } = this.state;
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
        <div className="site-blocks-cover overlay" style={{ backgroundImage: 'url(images/hero-1.jpg)' }} data-aos="fade" data-stellar-background-ratio="0.5">
          <div className="container">
            <div className="row align-items-center justify-content-center text-center">
              <Header cities={cities} professions={professions} />
            </div>
          </div>
        </div>
        <div class="site-section1 bg-light" data-aos="fade">
          <ListProfession professions={professions} />
        </div>
        <div className="bg-light">
          <ListJob jobs={jobs} />
        </div>
        <div className="site-section1 bg-light">
          <ListRecruiter recruiters={recruiters} />
        </div>
        <div className="newsletter bg-primary py-5">
          <InputEmail />
        </div>
        <div className="site-footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default HomePage;
