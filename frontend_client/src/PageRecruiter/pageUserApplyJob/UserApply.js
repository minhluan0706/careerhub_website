import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom"

class UserApply extends Component {
  render() {
    const { userAddJob } = this.props;
    return (
      <Fragment>
        {userAddJob && userAddJob.map(item => (
          <div className="d-block d-md-flex listing border">
            <div className="img d-block" style={{ textAlign: "center" }} >
              <img className="img-JobUser" src={item.users.avatar} alt="" />
            </div>
            <div className="lh-content">
              <h5>Tên ứng viên: <Link to="#">{item.users.name} </Link> </h5>
              <h3>Email:<Link to="#"> {item.users.email} </Link>|  Số điện thoại: {item.users.sdt}</h3>
              <h3 className="review mb-0">Giới tính: {item.users.gender}</h3>
              <h3 className="review mb-0">Ngày sinh: {item.users.birthday}</h3>
            </div>
          </div>
        ))}
      </Fragment>
    );
  }
}

export default UserApply;