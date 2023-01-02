import React, { Component } from 'react';
import RecruiterItem from './RecruiterItem';
import {Link} from "react-router-dom";
import Pagination from "../../Pagination/Pagination";

class ListRecruiter extends Component {
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
    const { recruiters } = this.props;
    return (
      <div className="container">
        <div className="row justify-content-center mb-5 ">
          <div className="col-md-7 text-center">
            <h3 className="font-weight-light text-primary">Nhà tuyển dụng hàng đầu</h3>
          </div>
        </div>
        <div className="row align-items-stretch" style={{ height: "600px", padding: "35px 0px" }}>
          <RecruiterItem recruiters={this.state.pageOfItems} />
        </div>
        <Link to="/nhatuyendung"><div style={{float:"right",margin: "10px 0px 0px 15px", color: "darkorange"}}>Xem thêm...</div></Link>
        <div className="col-12 text-right" style={{width:"55%"}}>
          <Pagination items={recruiters} onChangePage={this.onChangePage} next/>
        </div>
      </div>
    );
  }
}

export default ListRecruiter;