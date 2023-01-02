import React, { Component } from 'react';
import JobItem from './JobItem';
import Pagination from "../../Pagination/Pagination";
import { Link } from "react-router-dom";

class ListJob extends Component {
  constructor() {
    super();
    this.state = {
      pageOfItems: []
    };
  }

  onChangePage = (pageOfItems) => {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }
  
  render() {
    const { jobs } = this.props;
    return (
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-7 text-center">
            <h3 className="font-weight-light text-primary">Công việc nổi bật</h3>
          </div>
        </div>
        <div className="mt-5">
          <div className='pagination'>
            <div className='col-lg-8 cbLeftHome'>
              <JobItem jobs={this.state.pageOfItems} />
              <Link to="/tatcacongviec"><div style={{ float: "left", margin: "5px 0px 0px 15px", color: "darkorange" }}>Xem thêm...</div></Link>
              <div className='pagination-controls' style={{ display: "flex", float: "right", marginRight: "11px" }}>
                <Pagination items={jobs} onChangePage={this.onChangePage} next/>
              </div>
            </div>
            <div className="col-lg-4 cbRightHome">
              <div className="block20">
                <Link to="/404-not-found"> <img src="images/adver-side-2-2.jpg" alt="" style={{ marginBottom: "35px" }}></img> </Link>
                <Link to="/404-not-found"><img src="images/adver-side-2-4.jpg" alt=""></img></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListJob;