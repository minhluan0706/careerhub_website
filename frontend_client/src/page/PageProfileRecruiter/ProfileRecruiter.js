import React, { Component } from 'react';

class Profile extends Component {

  handleChange = event => {
    const { curentRecruiter } = this.props
    curentRecruiter[event.target.name] = event.target.value
    this.setState({ curentRecruiter: { ...curentRecruiter } })
    // const target = event.target;
    // const value = target.value;
    // const name = target.name;
    // let item = { ...this.state.item };
    // item[name] = value;
    // this.setState({ item: item });
  };

  onUpdateRecruiter = () => {
    const { curentRecruiter } = this.props;
    // curentUser = { ...curentUser };
    fetch(`/admin/api/recruiter/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(curentRecruiter)
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ curentRecruiter: data, })
      localStorage.setItem('currentRecruiter', JSON.stringify(data));
      alert("Cập nhật thông tin thành công !")
    })
  };

  render() {
    const { curentRecruiter } = this.props;
    if (!curentRecruiter)
      return <div>Loading ...</div>
    return (
      <div className="form">
        <div className="form-group form-style">
          <div className="col-xs-6">
            <label htmlFor="name"><h4>Tên công ty</h4></label>
            <input type="text" className="form-control input-form" value ={curentRecruiter.companyName ? curentRecruiter.companyName : ""} name="companyName" onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-6">
            <label htmlFor="phone"><h4>Số điện thoại</h4></label>
            <input type="text" className="form-control input-form" value ={curentRecruiter.phone ? curentRecruiter.phone : ""} name="phone" onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-6">
            <label htmlFor="email"><h4>Email</h4></label>
            <input type="email" className="form-control input-form" value ={curentRecruiter.email ? curentRecruiter.email : ""} name="email" onChange={this.handleChange}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-6">
            <label htmlFor="address"><h4>Địa chỉ</h4></label>
            <input type="text" className="form-control input-form" value ={curentRecruiter.address ? curentRecruiter.address : ""} name="address" onChange={this.handleChange}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-6">
            <label htmlFor="password"><h4>Mật khẩu</h4></label>
            <input type="password" className="form-control input-form" value ={curentRecruiter.password ? curentRecruiter.password : ""} name="password" onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-6">
            <label htmlFor="password2"><h4>Nhập lại mật khẩu</h4></label>
            <input type="password" className="form-control input-form" value ={curentRecruiter.password ? curentRecruiter.password : ""} name="password" onChange={this.handleChange}/>
          </div>
        </div>
        <div className="form-btn">
          <div className="col-xs-12">
            <button className="btn btn-lg btn-primary mt-5" onClick={this.onUpdateRecruiter}> Cập nhật</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;