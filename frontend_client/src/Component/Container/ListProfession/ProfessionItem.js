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
            {/* <div  class="icon" ><img src = {professions.logo} /></div> */}
            <span class="icon"><span class="flaticon-open-book"></span></span>
            <span class="caption mb-2 d-block">{item.professionJobName}</span>
          </Link>
        </div>
        ))}
      </Fragment>
    );
  }
}

export default ProfessionItem;