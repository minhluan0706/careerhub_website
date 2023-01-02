import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

class PageRegister extends Component {
  emptyItem = {
    companyName: "",
    email: "",
    password: "",
    cities: [],
    city: "",
    confirmPassword: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
  }

  async componentDidMount() {
    let city = await fetch(`/admin/api/city/list`).then(response => response.json())
    this.setState({
      cities: city
    })
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item: item });
  }

  handleChangeSelect = event => {
    const { item } = this.state
    const target = event.target;
    const value = target.value;
    const name = target.name;
    item[name] = {
      id: value
    };
    this.setState({ item: item });

  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { item } = this.state;
    if (item.password !== item.confirmPassword) {
      alert("Mật khẩu không trùng nhau !");
    } else {
      fetch('/admin/api/recruiter', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
      });
      this.props.history.push('/login-recruiter');
    }

  }
  render() {
    const { cities } = this.state;
    const cityOptionList = cities && cities.map(city => {
      return <option value={city.id}>{city.name}</option>;
    });
    return (
      <div className="site-blocks-cover fix-size" style={{ backgroundImage: 'url(images/hero_1.jpg)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 " data-aos="fade">
              <form onSubmit={this.handleSubmit} className=" bg-light boder-register">
                <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Nhà tuyển dụng đăng kí</h3>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label >Tên nhà tuyển dụng</label>
                    <input type="text" className="form-control" onChange={this.handleChange} name="companyName" required />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label htmlFor="email">Tài khoản email</label>
                    <input type="email" className="form-control" onChange={this.handleChange} name="email" required />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-12 text-left">
                    <label className="">Thành phố</label>
                    <select
                      className="form-control"
                      name="city"
                      onChange={this.handleChangeSelect}
                    >
                      <option selected>Thành phố...</option>
                      {cityOptionList}
                    </select>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label htmlFor="subject">Mật khẩu</label>
                    <input type="password" className="form-control" onChange={this.handleChange} name="password" required />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label htmlFor="subject">Nhập lại mật khẩu</label>
                    <input type="password" className="form-control" onChange={this.handleChange} name="confirmPassword" required />
                  </div>
                </div>
                <div className="row form-group text-center mt-5">
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">Đăng Ký</button>
                  </div>
                  <div className="col-12 mt-3">
                    <h6>Bạn có tài khoản? <Link to="/login-recruiter">Đăng nhập!</Link></h6>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PageRegister);