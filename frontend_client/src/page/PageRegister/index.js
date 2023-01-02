import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

class PageRegister extends Component {
  emptyItem = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item: item });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { item } = this.state;
    if (item.password !== item.confirmPassword) {
      alert("Mật khẩu không trùng nhau !");
    } else {
      fetch('/admin/api/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
      });
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <div className="site-blocks-cover fix-size" style={{ backgroundImage: 'url(images/hero_1.jpg)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 " data-aos="fade">
              <form onSubmit={this.handleSubmit} className=" bg-light boder-register">
                <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Đăng kí thành viên</h3>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label >Họ và tên</label>
                    <input type="text" className="form-control" onChange={this.handleChange} name="name" required />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label htmlFor="email">Tài khoản email</label>
                    <input type="email" className="form-control" onChange={this.handleChange} name="email" required />
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
                    <h6>Bạn đã là thành viên? <Link to="/login">Đăng nhập!</Link></h6>
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