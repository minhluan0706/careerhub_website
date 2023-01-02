import React, { Component } from 'react';
import { Link } from "react-router-dom"

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: 0,
      selectedProf: 0,
      searchInput: ""
    };
  };

  handleOnChangeInput = (e) => {
    this.setState({ searchInput: e.target.value });
  }

  handleOnChangeSelectedCity = (e) => {
    this.setState({ selectedCity: e.target.value });
  }

  handleOnChangeSelectedProfession = (e) => {
    document.querySelector('#job-title-search').disabled = false;
    this.setState({ selectedProf: e.target.value });
  }

  render() {
    const { cities, professions } = this.props;
    const { selectedCity, selectedProf, searchInput } = this.state

    return (
      <div className="col-md-12">
        <div className="row justify-content-center mb-4">
          <div className="col-md-8 text-center">
            <h1 className data-aos="fade-up">Tìm công việc ước mơ !</h1>
            <p data-aos="fade-up" data-aos-delay={100}>Nâng bước thành công của bạn </p>
          </div>
        </div>
        <div className="form-search-wrap mb-3" data-aos="fade-up" data-aos-delay={200}>
          <form method="post">
            <div className="row align-items-center">
              <div className="col-lg-12 mb-4 mb-xl-0 col-xl-3">
                <div className="select-wrap">
                  <span className="icon"><span className="icon-keyboard_arrow_down" /></span>
                  <select className="form-control rounded" onChange={this.handleOnChangeSelectedProfession}>
                    <option selected>Ngành nghề ...</option>
                    {professions && professions.map(item => (
                      <option value={item.id} >
                        {item.professionJobName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-12 mb-4 mb-xl-0 col-xl-4">
                <input id="job-title-search" type="text" className="form-control rounded" placeholder="Tìm một công việc..." onChange={this.handleOnChangeInput} disabled/>
              </div>
              <div className="col-lg-12 mb-4 mb-xl-0 col-xl-3">
                <div className="select-wrap">
                  <span className="icon"><span className="icon-keyboard_arrow_down" /></span>
                  <select className="form-control rounded" onChange={this.handleOnChangeSelectedCity}>
                    <option selected>Thành phố ...</option>
                    {cities.map(item => (
                      <option value={item.id} >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-12 col-xl-2 ml-auto">
                <Link to={{
                  pathname: '/tatcacongviec',
                  state: {
                    selectedCity,
                    selectedProf,
                    searchInput
                  }
                }} className="btn btn-primary rounded py-2 px-4 text-white">Tìm kiếm </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Header;
