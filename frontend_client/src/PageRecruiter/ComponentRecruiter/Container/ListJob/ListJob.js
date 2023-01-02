import React, { Component } from 'react';
import JobItem from './JobItem';
import { Link } from "react-router-dom";

class ListJob extends Component {
  render() {
    const { jobs } = this.props;
    return (
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-7 text-center">
            <h3 className="font-weight-light text-primary">Công Việc</h3>
          </div>
        </div>
        <div className="row mt-5">
          <JobItem jobs={jobs} />
        </div>
        <div className="col-12 text-center mt-4">
            <Link to="/tatcacongviec" className="btn btn-primary rounded py-2 px-4 text-white">Xem thêm...</Link>
          </div>
      </div>
    );
  }
}

export default ListJob;