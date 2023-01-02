import React, { Component, Fragment } from 'react';
import Menu from "../../Component/Header/Menu";
import "./style.css"
import Myjob from './myJob';
import SelectField from "./SelectField";

class index extends Component {
  emptyItem = {
    jobRequireSkillList: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      curentUser: null,
      jobRequireSkillList: [],
      jobUsers: [],
      skills: [],
      item: this.emptyItem,
      listSkill: [],
    };
  }

  async componentDidMount() {
    const curUser = JSON.parse(localStorage.getItem('currentUser'));
    let data = await fetch(`/admin/api/userjob/user/` + curUser.id).then(response => response.json())
    let skill = await fetch("/admin/api/skill/list").then(response => response.json())
    let itemUser = await fetch("/admin/api/users/" + curUser.id).then(response => response.json())
    this.setState({
      curentUser: curUser,
      jobUsers: data,
      skills: skill,
      listSkill: itemUser,
    })
  }

  handleChange = event => {
    const { curentUser } = this.state
    curentUser[event.target.name] = event.target.value
    this.setState({ curentUser: { ...curentUser } })
  };


  handleChangeSelectField = (key, value) => {
    let { item } = this.state;
    item[key] = {
      id: value
    };
    this.setState({ item: item });
  };

  handleChangeClose = async (id) => {
    const { curentUser } = this.state;
    await fetch(`/admin/api/usersskill/${curentUser.id}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(async () => {
        let itemUser = await fetch("/admin/api/users/" + curentUser.id).then(response => response.json())
        this.setState({ listSkill: itemUser })
        await fetch("/admin/api/users/" + JSON.parse(localStorage.getItem('currentUser')).id)
          .then(response => response.json())
          .then(data => {
            this.setState({ curentUser: data, })
            localStorage.setItem('currentUser', JSON.stringify(data));
            return 'tmp'
          })
      })
  }

  onUpdateUser = () => {
    const { curentUser } = this.state;
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

  onUpdateSkillUser = async () => {
    const { item, curentUser } = this.state;
    const { jobRequireSkillList } = item;
    const ListSkillUsers = [...jobRequireSkillList.id.map(skiluser => ({
      users: { id: curentUser.id },
      skill: { id: skiluser }
    }))]
    await ListSkillUsers.map(async Listskiluser => {
      await fetch(`/admin/api/usersskill`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Listskiluser)
      })
      .then(async () => {
        let itemUser = await fetch("/admin/api/users/" + curentUser.id).then(response => response.json())
        this.setState({ listSkill: itemUser })
        await fetch("/admin/api/users/" + JSON.parse(localStorage.getItem('currentUser')).id)
          .then(response => response.json())
          .then(data => {
            this.setState({currentUser: data})
            localStorage.setItem('currentUser', JSON.stringify(data));
            return 'tmp'
          })
      })
    })
  };


  render() {
    const { curentUser, jobUsers, skills, listSkill } = this.state;
    if (!curentUser)
      return <div>Đang tải ...</div>
    return (
      <Fragment>
        <div className="site-navbar container py-0" style={{ backgroundImage: 'url(images/hero-1.jpg)' }} role="banner">
          <Menu />
        </div>
        <div className="container bootstrap snippet" data-aos="fade" data-stellar-background-ratio="0.5">
          <div className="row" style={{ marginTop: "135px" }}>
            <div className="col-sm-4">
              <div className="text-center">
                {curentUser.avatar && (
                  <div className="img-select">
                    <img
                      src={curentUser.avatar}
                      className="avatar img-circle img-thumbnail"
                      alt="avatar"
                    />
                  </div>
                )}
                <h6 className="txt-img">Dán link hình vào đây để cập nhật hình đại diện</h6>
                <input
                  type="text"
                  name="avatar"
                  value={curentUser.avatar ? curentUser.avatar : ""}
                  onChange={this.handleChange}
                  className="center-block file-upload"
                />
              </div>

              <div className="form-group">
                <div className="col-xs-12">
                  <label className="mt-4 mb-0">Thêm kỹ năng</label>
                  <SelectField
                    options={skills ? skills.map(el => ({ name: el.skillName, value: el.id })) : []}
                    type="jobRequireSkillList"
                    onChange={this.handleChangeSelectField}
                  />
                </div>
              </div>
              <div className="form-btn">
                <div className="col-xs-12">
                  <button className="btn btn-primary" onClick={this.onUpdateSkillUser}>Lưu</button>
                </div>
              </div>
            </div>
            <div className="col-sm-8">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active" href="#profile" role="tab" data-toggle="tab">Hồ sơ</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#myjob" role="tab" data-toggle="tab">Công việc của bạn</a>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane active" id="profile">
                  <hr />
                  {/* <Profile curentUser={curentUser} /> */}
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
                        <input type="email" className="form-control input-form" value={curentUser.email ? curentUser.email : ""} name="email" onChange={this.handleChange} disabled/>
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
                      <div className="col-xs-12 mt-3">
                        <label htmlFor="birthday"><h4>Kỹ năng của bạn</h4></label>
                        {/* <input type="text" className="form-control input-form" disabled value={listSkill} /> */}
                        <div className="e-input-group">
                          {listSkill.usersSkillList && listSkill.usersSkillList.map(item => (
                            <span className="e-chips">
                              <span className="e-chipcontent">{item.skill.skillName}</span>
                              <button type="button" className="close" aria-label="Close" onClick={() => this.handleChangeClose(item.skill.id)}>
                                <span aria-hidden="true" >&times;</span>
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="form-btn">
                      <div className="col-xs-12">
                        <button className="btn btn-lg btn-primary mt-5" onClick={this.onUpdateUser}> Cập nhật</button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="tab-pane" id="myjob">
                  <hr />
                  <Myjob jobUsers={jobUsers} />
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default index;