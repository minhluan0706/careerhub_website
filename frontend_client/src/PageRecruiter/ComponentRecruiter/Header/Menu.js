import React, { Component } from 'react';
import { NavLink, Link, withRouter } from "react-router-dom";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curentRecruiter: null,
    };
  }
  componentDidMount() {
    const curRecruiter = JSON.parse(localStorage.getItem('currentRecruiter'));
    this.setState({ curentRecruiter: curRecruiter });
  }

  logOut = () => {
    localStorage.removeItem("currentRecruiter");
    localStorage.removeItem("userAddJob");
    this.setState({ curentRecruiter: null })
    this.props.history.push('/trang-nha-tuyen-dung');
  }
  render() {
    const { curentRecruiter } = this.state;
    return (
      <div className="row align-items-center">
        <div className="col-6 col-xl-2">
          <h1 className="mb-0 site-logo"><Link to="/trang-nha-tuyen-dung" className="text-white mb-0">Nhà tuyển dụng</Link></h1>
        </div>
        <div className="col-12 col-md-10 d-none d-xl-block">
          <nav className="site-navigation position-relative text-right" role="navigation">
            <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
              <li><NavLink exact activeStyle={{ fontWeight: "bold", color: "#7643ea" }} to="/trang-nha-tuyen-dung">Trang chủ</NavLink></li>
              <li><NavLink activeStyle={{ fontWeight: "bold", color: "#7643ea" }} to="/dang-cong-viec">Đăng tuyển</NavLink></li>
              {/* <li><NavLink activeStyle={{ fontWeight: "bold", color: "#7643ea" }} to="#">Tìm hồ sơ</NavLink></li> */}

              {
                curentRecruiter ?
                  <>
                    <li className="nav-item">
                      <span className="border-left pl-xl-4 " > <img src={curentRecruiter.logo ? curentRecruiter.logo : "https://banner2.kisspng.com/20180329/pgw/kisspng-computer-icons-download-housing-community-5abd0c854eee55.5671391815223389493233.jpg"} alt="Chưa có logo" className="avatar-rounded img-style"></img> </span>
                    </li>
                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown">
                        {
                          curentRecruiter.companyName
                        }
                      </Link>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile-recruiter">Quản lý hồ sơ</Link>
                        <span> <Link to="#" className="dropdown-item" onClick={this.logOut}>Đăng xuất</Link></span>
                      </div>
                    </li>
                  </>
                  :
                  <li className="ml-xl-3 login"><span className="border-left pl-xl-4" /><Link to="/login-recruiter">Đăng Nhập</Link><Link to="/register-recruiter">Đăng Ký</Link></li>
              }

              <li><Link to="/" className="cta"><span className="bg-primary text-white rounded">Người tìm việc</span></Link></li>
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