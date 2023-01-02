import React, { Component, Fragment } from 'react';

class InfoRecruiter extends Component {
  render() {
    const {curentRecruiter} = this.props;
    return (
      <Fragment>
        <div className="p-4 mb-3 bg-white">
          <h4 className="h5 text-center mb-3">THÔNG TIN NHÀ TUYỂN DỤNG</h4>
          <p className="mb-0 font-weight-bold">Tên nhà tuyển dụng</p>
          <p className="mb-4">{curentRecruiter.companyName}</p>
          <p className="mb-0 font-weight-bold">Địa chỉ</p>
          <p className="mb-4">{curentRecruiter.address}</p>
          <p className="mb-0 font-weight-bold">Số điên thoại</p>
          <p className="mb-4">{curentRecruiter.phone}</p>
          <p className="mb-0 font-weight-bold">Email</p>
          <p className="mb-0" style={{color:"#2f89fc"}}>{curentRecruiter.email}</p>
        </div>
      </Fragment>
    );
  }
}

export default InfoRecruiter;