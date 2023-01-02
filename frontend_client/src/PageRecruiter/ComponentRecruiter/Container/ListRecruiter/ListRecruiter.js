import React, { Component } from 'react';
import RecruiterItem from './RecruiterItem';
import { Link } from "react-router-dom"

class ListRecruiter extends Component {
  render() {
    const { recruiters } = this.props;
    return (
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-7 text-center">
            <h3 className="font-weight-light text-primary">Nhà Tuyển Dụng</h3>
          </div>
        </div>
        <div className="row mb-3 align-items-stretch">
          <RecruiterItem />
          <RecruiterItem />
          <RecruiterItem />
          <RecruiterItem />
          <div className="col-12 text-center mt-4">
            <Link to="/nhatuyendung" className="btn btn-primary rounded py-2 px-4 text-white">Xem thêm...</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ListRecruiter;