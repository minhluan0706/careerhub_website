import React, { Component, Fragment } from 'react';
import ReactQuill from "react-quill";
// import SelectField from "./SelectField";
import "react-quill/dist/quill.snow.css";
import { withRouter } from "react-router";

class UpdateJob extends Component {
 
  handleChange = event => {
    const { job } = this.props;
    job[event.target.name] = event.target.value
    this.setState({ job: { ...job } })
  };

  onChangeValueEditor = (key, value) => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.props.job[key] = value;
  };

  handleChangeSelect = event => {
    const { job } = this.props;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.props.job };
    job[name] = {
      id: value
    };
    this.setState({ job: item });
  };

  onUpdateJob = () => {
    let { job } = this.props;
    job = { ...job };
    fetch(`/admin/api/job/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(job)
    })
    this.props.history.goBack()
  };
  
  handleExit = () =>{
    this.props.history.goBack()
  }

  render() {

    const { job } = this.props;
    const statusOptionList = this.props.status.map(tus => {
      return (
        <option key={tus.id} value={tus.id}>
          {tus.statusName}
        </option>
      );
    });

    const cityOptionList = this.props.cities.map(city => {
      return <option value={city.id}>{city.name}</option>;
    });

    return (
      <Fragment>
        <div className="p-5 bg-white">
          <div className="row form-group">
            <div className="col-md-9 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="fullname">Tên công việc</label>
              <input type="text" className="form-control" onChange={this.handleChange}
                name="title" value={job.title} placeholder="Nhập vào tên công việc..." required/>
            </div>
            <div className="col-md-3 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="fullname">Kinh nghiệm</label>
              <input type="number" className="form-control" value={job.experience} onChange={this.handleChange}
                name="experience" required/>
            </div>
          </div>
          <div className="row form-group mb-5">
            <div className="col-md-6 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="fullname">Ngày đăng tuyển</label>
              <input type="date" className="form-control" value={job.date} onChange={this.handleChange} name="date" required/>
            </div>
            <div className="col-md-6 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="fullname">Ngày hết hạn</label>
              <input type="date" className="form-control" value={job.expired} onChange={this.handleChange}
                name="expired" required/>
            </div>
           
          </div>
          <div className="row form-group mb-4">
            <div className="col-md-12 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="fullname">Thành phố</label>
              <select
                  id="selectRecruiter"
                  className="form-control"
                  name="city"
                  onChange={this.handleChangeSelect}
                  value={job.city.id}
                >
                  <option >Thành phố...</option>
                  {cityOptionList}
                </select>
            </div>
          </div>

          <div className="row form-group mb-4">
            <div className="col-md-12 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="fullname">Trạng thái công việc</label>
              <select
                id="selectRecruiter"
                className="form-control"
                name="status"
                onChange={this.handleChangeSelect}
                value={job.status.id}
                required
              >
                <option>Trạng thái...</option>
                {statusOptionList}
              </select>
            </div>
          </div>
          <div className="row form-group mb-4">
            <div className="col-md-12 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="fullname">Mô tả</label>
              <ReactQuill
                name="description"
                value={job.description}
                onChange={value =>
                  this.onChangeValueEditor("description", value)
                }
                required
                theme="snow"
                modules={UpdateJob.modules}
                formats={UpdateJob.formats}
                placeholder={"Viết nội dung vào đây..."}
                ref={el => {
                  this.reactQuill = el;
                }}
                style={{ height: "200px" }}
              />
            </div>
          </div>
        </div>
        <div className="row form-group text-center mt-3">
          <div className="col-md-12">
          <input type="submit" className="btn btn-primary py-2 px-5 mx-3" onClick={this.handleExit} value="Thoát" ></input>
            <input type="submit" className="btn btn-primary py-2 px-5" onClick={this.onUpdateJob} value="Cập nhật" ></input>
          </div>
        </div>
      </Fragment>
    );
  }
}
UpdateJob.formats = [
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

UpdateJob.modules = {
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
export default withRouter(UpdateJob);