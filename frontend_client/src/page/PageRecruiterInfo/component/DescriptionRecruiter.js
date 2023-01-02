import React, { Component } from 'react';

class DescriptionRecruiter extends Component {
  render() {
    const {recruiter} = this.props;
    return (
      <div className="info-employer ">
        <div style={{padding:"5px 35px"}} dangerouslySetInnerHTML={{__html: recruiter.description}}></div>
      </div>
    );
  }
}

export default DescriptionRecruiter;