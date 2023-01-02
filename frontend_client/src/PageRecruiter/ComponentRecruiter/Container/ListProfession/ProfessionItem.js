import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

class ProfessionItem extends Component {
  render() {
    const { professions } = this.props
    return (
      <Fragment>
        {professions.map(item => (
        <div class="col-sm-6 col-md-4 mb-4 mb-lg-0 col-lg-2">
          <Link to="" class="popular-category h-100">
            <span class="icon"><span class="flaticon-car"></span></span>
            <span class="caption mb-2 d-block">{item.professionJobName}</span>
            <span class="number">1,921 công việc</span>
          </Link>
        </div>
        ))}
      </Fragment>
    );
  }
}

export default ProfessionItem;