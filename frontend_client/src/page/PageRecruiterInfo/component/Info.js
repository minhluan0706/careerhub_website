import React, { Component } from 'react';

class Infomation extends Component {
  render() {
    const { recruiter } = this.props;
    return (
      <div className="info-employer col-xs-12">
        <div className="col-xs-12 col-sm-3 div-logo-employer">
          <div className="div-logo-12">
            <div className="logo-employer">
              <img src={recruiter.logo} alt={recruiter.companyName} />
            </div>
          </div>
        </div>
        <div className="col-sm-9 info-company">
          <h2 className="company-name">{recruiter.companyName}</h2>
          <table className="info_employer" style={{ width: 'auto', marginBottom:"15px" }}>
            <tbody>
              <tr className="marginBottom20">
                <td className="icon-detail-company">
                  <span><img className="icon2" src={"/images/icon2.png"} alt=""></img></span>
                </td>
                <td className="detail-info-company">
                  <b>Địa chỉ:&nbsp;</b>
                  <span>{recruiter.address}</span>
                </td>
              </tr>
              <tr className="marginBottom20">
                <td className="icon-detail-company">
                <span><img className="icon2" src={"/images/icon3.png"} alt=""></img></span>
                </td>
                <td className="detail-info-company">
                  <b>Email liên hệ:&nbsp;</b>
                  <span>{recruiter.email}</span>
                </td>
              </tr>
              <tr className="marginBottom20">
                <td className="icon-detail-company">
                <span><img className="icon2" src={"/images/icon4.png"} alt=""></img></span>
                </td>
                <td className="detail-info-company">
                  <b>Số điện thoại liên hệ:&nbsp;</b>
                  <span>{recruiter.phone}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Infomation;