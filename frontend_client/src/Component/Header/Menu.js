import React, { Component } from 'react';
import { NavLink, Link, withRouter } from "react-router-dom";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curentUser: {},
    };
  }
  componentDidMount() {
    const userFromLocalStore = localStorage.getItem('currentUser')
    const curUser = userFromLocalStore ? JSON.parse(userFromLocalStore) : localStorage.removeItem("currentUser");
    this.setState({ curentUser: curUser });
  }

  logOut = () => {
    this.setState({ curentUser: null })
    localStorage.removeItem("currentUser");
    
    this.props.history.push('/');
  }

  render() {
    const { curentUser } = this.state;
    return (
      <div className="row align-items-center">
        <div className="col-6 col-xl-2">
          <h1 className="mb-0 site-logo"><Link to="/" className="text-white mb-0">Tim Viec Nhanh</Link></h1>
        </div>
        <div className="col-12 col-md-10 d-none d-xl-block">
          <nav className="site-navigation position-relative text-right" role="navigation">
            <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
              <li><NavLink exact activeStyle={{ fontWeight: "bold", color: "#7643ea" }} to="/">Trang chủ</NavLink></li>
              <li><NavLink activeStyle={{ fontWeight: "bold", color: "#7643ea" }} to="/tatcacongviec">Tất cả công việc</NavLink></li>
              <li><NavLink activeStyle={{ fontWeight: "bold", color: "#7643ea" }} to="/nhatuyendung">Công ty</NavLink></li>
              {
                curentUser ?
                  <>
                    <li className="nav-item">
                      <span className="border-left pl-xl-4 " > <img src={curentUser.avatar ? curentUser.avatar :  "https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg"} alt="avatar" className="avatar-rounded img-style"></img> </span>
                    </li>
                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown">
                        {
                          curentUser.name
                        }
                      </Link>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile-user">Quản lý hồ sơ</Link>
                        <Link className="dropdown-item" to="/goi-y-cong-viec">Việc làm được gợi ý</Link>
                        <span> <Link to="#" className="dropdown-item" onClick={this.logOut}>Đăng xuất</Link></span>
                      </div>
                    </li>
                  </>
                  :
                  <li className="ml-xl-3 login"><span className="border-left pl-xl-4" /><Link to="/login">Đăng Nhập</Link><Link to="/register">Đăng Ký</Link></li>
              }
              <li><Link to="/trang-nha-tuyen-dung" className="cta"><span className="bg-primary text-white rounded">Nhà tuyển dụng</span></Link></li>
            </ul>
          </nav>
        </div>
        <div className="d-inline-block d-xl-none ml-auto py-3 col-6 text-right" style={{ position: 'relative', top: '3px' }}>
          <Link to="#" className="site-menu-toggle js-menu-toggle text-white"><span className="icon-menu h3" /></Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Menu);