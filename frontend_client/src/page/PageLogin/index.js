import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";


class PageLogin extends Component {
  emptyLoginInfo = {
    email: "",
    password: ""
  }
  emptyUser = {
    id: null
  }

  constructor(props) {
    super(props);
    this.state = {
      loginInfo: this.emptyLoginInfo,
      curentUser: this.emptyUser,
    };
  }
  componentDidMount() {
    const curUser = JSON.parse(localStorage.getItem('currentUser'));
    this.setState({ curentUser: curUser });
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let loginInfo = { ...this.state.loginInfo };
    loginInfo[name] = value;
    this.setState({ loginInfo: loginInfo });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { loginInfo } = this.state;

    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInfo)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ curentUser: data, })
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.props.history.push("/")
      })
      .catch(err => alert("Thông báo: Đăng nhập không thành công !"));
  }

  render() {
    const { loginInfo } = this.state;
    return (
      <div className="site-blocks-cover fix-size" style={{ backgroundImage: 'url(images/hero_1.jpg)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 mb-5" data-aos="fade">
              <form onSubmit={this.handleSubmit} className="p-5 bg-st boder">
                <h4 style={{ textAlign: "center", marginBottom: "10px" }}>Đăng nhập để tiếp tục</h4>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label htmlFor="email">Tài khoản</label>
                    <input type="email" className="form-control" name="email" value={loginInfo.email || ''} onChange={this.handleChange} required/>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label htmlFor="subject">Mật khẩu</label>
                    <input type="password" className="form-control" name="password" value={loginInfo.password || ''} onChange={this.handleChange} required/>
                  </div>
                </div>
                <div className="row form-group text-center mt-5">
                  <div className="col-md-12">
                    <button type="submit" className="btn-primary py-2 px-4 text-white" >Đăng nhập</button>
                  </div>
                  <div className="col-12 mt-3">
                    <h6>Nếu chưa có tài khoản? <Link to="/register">Đăng kí!</Link></h6>
                  </div>
                  <div className="col-12">
                    <Link to="/"><h6>Quay về trang chủ</h6></Link>
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

export default withRouter(PageLogin);