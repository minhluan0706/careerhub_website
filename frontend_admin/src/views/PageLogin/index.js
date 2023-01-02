import React, { Component } from "react";
import "../PageLogin/styleLogin.css";
import { Redirect } from "react-router-dom";

class PageLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    var { username, password } = this.state;
    if (username === "admin" && password === "a") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: username,
          password: password
        })
      );
      // eslint-disable-next-line react/prop-types
      this.props.history.push("/admin/dashboard");
    } else {
      alert("Kiểm tra lại tài khoản hoặc mật khẩu của bạn!");
    }
  };

  render() {
    var { username, password } = this.state;
    var LoginUser = localStorage.getItem("user");
    if (LoginUser !== null) {
      return <Redirect to="/admin" />;
    }

    return (
      <div className="admin-login-page">
        <div className="login-box">
          <form onSubmit={this.handleSubmit}>
            <h4 className="edit-title">Quản trị viên đăng nhập</h4>
            <div className="form-group">
              <label className="lable-admin">
                <b>Tài khoản</b>
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label className="lable-admin">
                <b>Mật khẩu</b>
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-admin">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default PageLogin;
