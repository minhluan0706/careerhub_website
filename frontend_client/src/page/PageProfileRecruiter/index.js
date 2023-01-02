import React, { Component, Fragment } from 'react';
import Menu from "../../PageRecruiter/ComponentRecruiter/Header/Menu";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import JobRecruiter from "./myJobRecruiter";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curentRecruiter: null,
      listJobRecruiter: [],
      cities: []
    };
  }

  async componentDidMount() {
    const curRecruiter = await JSON.parse(localStorage.getItem('currentRecruiter'));

    let data = await fetch(`/admin/api/job/recruiter/` + curRecruiter.id).then(response => response.json())
    let city = await fetch(`/admin/api/city/list`).then(response => response.json())
    this.setState({
      curentRecruiter: curRecruiter,
      listJobRecruiter: data,
      cities: city
    })
  }

  handleChange = event => {
    const { curentRecruiter } = this.state
    curentRecruiter[event.target.name] = event.target.value
    this.setState({ curentRecruiter: { ...curentRecruiter } })
  };

  handleChangeSelect = event => {
    const { curentRecruiter } = this.state
    const target = event.target;
    const value = target.value;
    const name = target.name;
    curentRecruiter[name] = {
      id: value
    };
    this.setState({ curentRecruiter: { ...curentRecruiter } });
  };

  onChangeValueEditor = (key, value) => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.curentRecruiter[key] = value;
  };

  onUpdateRecruiter = () => {
    const { curentRecruiter } = this.state;
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
    const { curentRecruiter, listJobRecruiter, cities } = this.state;
    const cityOptionList = cities.map(city => {
      return <option value={city.id}>{city.name}</option>;
    });
    if (!curentRecruiter)
      return <div>Đang tải ...</div>
    return (
      <Fragment>
        <div className="site-navbar container py-0 " style={{ backgroundImage: 'url(images/hero-1.jpg)' }} role="banner">
          <Menu />
        </div>
        <div className="container bootstrap snippet" data-aos="fade" data-stellar-background-ratio="0.5">
          <div className="row" style={{ marginTop: "135px" }}>
            <div className="col-sm-3">
              <div className="text-center">
                {curentRecruiter.logo && (
                  <div className="img-select">
                    <img
                      src={curentRecruiter.logo}
                      className="avatar img-circle img-thumbnail"
                      alt="avatar"
                    />
                  </div>
                )}
                <h6 className="txt-img">Dán link ảnh vào đây để cập nhật logo công ty</h6>
                <input type="text" className="center-block file-upload"
                  name="logo"
                  value={curentRecruiter.logo ? curentRecruiter.logo : ""}
                  onChange={this.handleChange}
                />
                {/* <button className="btn btn-primary mt-3" >Cập nhật logo</button> */}
              </div>
            </div>
            <div className="col-sm-9">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" href="#profilerecruiter" role="tab" data-toggle="tab">Hồ sơ công ty</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#myjobrecruiter" role="tab" data-toggle="tab">Công việc đã đăng</a>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane active" id="profilerecruiter">
                  <hr />
                  <div className="form">
                    <div className="form-group form-style">
                      <div className="col-xs-6">
                        <label htmlFor="name"><h4>Tên công ty</h4></label>
                        <input type="text" className="form-control input-form" value={curentRecruiter.companyName ? curentRecruiter.companyName : ""} name="companyName" onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="phone"><h4>Số điện thoại</h4></label>
                        <input type="text" className="form-control input-form" value={curentRecruiter.phone ? curentRecruiter.phone : ""} name="phone" onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="email"><h4>Email</h4></label>
                        <input type="email" className="form-control input-form" value={curentRecruiter.email ? curentRecruiter.email : ""} name="email" onChange={this.handleChange} disabled/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="address"><h4>Địa chỉ</h4></label>
                        <input type="text" className="form-control input-form" value={curentRecruiter.address ? curentRecruiter.address : ""} name="address" onChange={this.handleChange}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="password"><h4>Mật khẩu</h4></label>
                        <input type="password" className="form-control input-form" value={curentRecruiter.password ? curentRecruiter.password : ""} name="password" onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label className="" style={{ margin: "13px 0px 0px" }}>Thành phố</label>
                        <select
                          className="form-control"
                          style={{ height: "35px", borderRadius: "5px" }}
                          defaultValue={curentRecruiter.city.id }
                          name="city"
                          onChange={this.handleChangeSelect}
                        >
                          <option selected>Thành phố...</option>
                          {cityOptionList}
                        </select>
                      </div>
                    </div>
                    <div className="form-group" >
                    <div className="col-xs-12">
                      <label className="font-weight-bold" style={{ margin: "15px 0px 0px",fontSize:"20px" }} >Giới thiệu công ty</label>
                      <ReactQuill
                        name="description"
                        value={curentRecruiter.description}
                        onChange={value =>
                          this.onChangeValueEditor("description", value)
                        }
                        theme="snow"
                        modules={index.modules}
                        formats={index.formats}
                        placeholder={"Viết nội dung vào đây..."}
                        ref={el => {
                          this.reactQuill = el;
                        }}
                        style={{ height: "200px" }}
                      />
                      </div>
                    </div>
                    <div className="form-btn mt-5">
                      <div className="col-xs-12">
                        <button className="btn btn-lg btn-primary mt-5 " onClick={this.onUpdateRecruiter}> Cập nhật</button>
                      </div>
                    </div>
                  </div>
                  {/* <ProfileRecruiter curentRecruiter={curentRecruiter} /> */}
                  <hr />
                </div>
                <div className="tab-pane" id="myjobrecruiter">
                  <hr />
                  <JobRecruiter listJobRecruiter={listJobRecruiter} curentRecruiter={curentRecruiter} />
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
index.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image"
];

index.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};
export default index;