import React from 'react';
import SelectField from "./SelectField";

class ProfileUser extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      jobRequireSkill:""
    };
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    fetch("/admin/api/skill/list")
      .then(response => response.json())
      .then(data => this.setState({ skills: data }));
  };

  handleChange = event => {
    const { curentUser } = this.props
    curentUser[event.target.name] = event.target.value
    this.setState({ curentUser: { ...curentUser } })
  };

  onUpdateUser = () => {
    const { curentUser } = this.props;
    fetch(`/admin/api/users/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(curentUser)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ curentUser: data, })
        localStorage.setItem('currentUser', JSON.stringify(data));
        alert("Cập nhật thông tin thành công !")
      })
  };

  render() {
    const { skills } = this.state;
    const { curentUser } = this.props;
    if (!curentUser)
      return <div>Loading ...</div>
    return (
      <div className="form">
        <div className="form-group form-style">
          <div className="col-xs-6">
            <label htmlFor="name"><h4>Họ và tên</h4></label>
            <input type="text" className="form-control input-form" value={curentUser.name ? curentUser.name : ""} name="name" onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-6">
            <label htmlFor="phone"><h4>Số điện thoại</h4></label>
            <input type="text" className="form-control input-form" value={curentUser.sdt ? curentUser.sdt : ""} name="sdt" onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-6">
            <label htmlFor="phone"><h4>Số chứng minh nhân dân</h4></label>
            <input type="text" className="form-control input-form" value={curentUser.cmnd ? curentUser.cmnd : ""} name="cmnd" onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-6">
            <label htmlFor="address"><h4>Địa chỉ</h4></label>
            <input type="text" className="form-control input-form" value={curentUser.address ? curentUser.address : ""} name="address" onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-6">
            <label htmlFor="gender"><h4>Giới tính</h4></label>
            <input type="text" className="form-control input-form" value={curentUser.gender ? curentUser.gender : ""} name="gender" onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-6">
            <label htmlFor="email"><h4>Email</h4></label>
            <input type="email" className="form-control input-form" value={curentUser.email ? curentUser.email : ""} name="email" onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-6">
            <label htmlFor="password"><h4>Mật khẩu</h4></label>
            <input type="password" className="form-control input-form" id="password" value={curentUser.password ? curentUser.password : ""} name="password" onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-6">
            <label htmlFor="birthday"><h4>Ngày sinh</h4></label>
            <input type="date" className="form-control input-form" value={curentUser.birthday ? curentUser.birthday : ""} name="birthday" onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-6">
            <label htmlFor="password2"><h4>Nhập lại mật khẩu</h4></label>
            <input type="password" className="form-control input-form" id="password" value={curentUser.password ? curentUser.password : ""} name="password" onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-6">
            <label className="font-weight-bold" htmlFor="fullname">Chọn kỹ năng</label>
            <SelectField
              options={skills ? skills.map(el => ({ name: el.skillName, value: el.id })) : []}
              type="jobRequireSkill"
              onChange={this.handleChangeSelectField}
            />
          </div>
        </div>
        <div className="form-btn">
          <div className="col-xs-12">
            <button className="btn btn-lg btn-primary mt-5" onClick={this.onUpdateUser}> Cập nhật</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileUser;