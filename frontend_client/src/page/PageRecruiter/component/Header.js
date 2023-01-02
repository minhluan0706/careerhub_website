import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { cities } = this.props;
    return (
      <div className="row align-items-center justify-content-center text-center">
        <div className="col-md-10" data-aos="fade-up" data-aos-delay={400}>
          <div className="row justify-content-center mt-5">
            <div className="col-md-8 text-center">
              <h1>Nhà tuyển dụng</h1>
              {/* <p className="mb-0">Hãy chọn công việc phù hợp với bạn nhất</p> */}
            </div>
          </div>
        </div>
        <div className="form-search-wrap mb-3" data-aos="fade-up" data-aos-delay={200} style={{width:"60%"}}>
          <form method="post">
            <div className="row align-items-center">
              <div className="col-lg-12 mb-4 mb-xl-0 col-xl-5">
                <input type="text" className="form-control rounded" placeholder="Tìm nhà tuyển dụng..." />
              </div>
              <div className="col-lg-12 mb-4 mb-xl-0 col-xl-4">
                <div className="select-wrap">
                  <span className="icon"><span className="icon-keyboard_arrow_down" /></span>
                  <select className="form-control rounded">
                    <option selected>Thành phố ...</option>
                    {cities && cities.map(item => (
                      <option value={item.id} >{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-12 col-xl-3 ml-auto text-right">
                <button className="btn btn-primary btn-block rounded padding8">Tìm kiếm</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Header;