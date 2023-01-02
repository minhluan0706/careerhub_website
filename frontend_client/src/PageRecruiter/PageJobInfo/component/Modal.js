import React from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { withRouter } from "react-router";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from '@material-ui/core/DialogTitle';

class FormDialog extends React.Component {

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
    this.props.handleClose();
  };

  render() {
    // const {item} =this.state;
    const { isOpenModal, handleClose, job, cities, status } = this.props;
    const statusOptionList = status.map(tus => {
      return (
        <option key={tus.id} value={tus.id}>
          {tus.statusName}
        </option>
      );
    });

    const cityOptionList = cities.map(city => {
      return <option value={city.id}>{city.name}</option>;
    });
    return (
      <div>
        <Dialog
          open={isOpenModal}
          fullWidth={true}
          style={{ color: "#3A3A3A" }}
        >
          <DialogTitle id="form-dialog-title" className="text-center" >
            <h5>Chỉnh sửa thông tin công việc</h5>
          </DialogTitle>
          <DialogContent style={{ padding: "10px 50px" }}>
            <div className="row form-group">
              <div className="col-md-9 mb-3 mb-md-0">
                <label className="font-weight-bold" htmlFor="fullname">Tên công việc</label>
                <input type="text" className="form-control" onChange={this.handleChange}
                  name="title" value={job.title} placeholder="Nhập vào tên công việc..." />
              </div>
              <div className="col-md-3 mb-3 mb-md-0">
                <label className="font-weight-bold" htmlFor="fullname">Kinh nghiệm</label>
                <input type="number" className="form-control" value={job.experience} onChange={this.handleChange}
                  name="experience" />
              </div>
            </div>
            <div className="row form-group mb-4">
              <div className="col-md-6 mb-3 mb-md-0">
                <label className="font-weight-bold" htmlFor="fullname">Ngày đăng tuyển</label>
                <input type="date" className="form-control" value={job.date} name="date" onChange={this.handleChange} />
              </div>
              <div className="col-md-6 mb-3 mb-md-0">
                <label className="font-weight-bold" htmlFor="fullname">Ngày hết hạn</label>
                <input type="date" className="form-control" value={job.expired} onChange={this.handleChange}
                  name="expired" />
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
                  defaultValue={job.city.id}
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
                  defaultValue={job.status.id}
                >
                  <option >Trạng thái...</option>
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
                  theme="snow"
                  modules={FormDialog.modules}
                  formats={FormDialog.formats}
                  placeholder={"Viết nội dung vào đây..."}
                  ref={el => {
                    this.reactQuill = el;
                  }}
                  style={{ height: "200px" }}
                />
              </div>
            </div>
          </DialogContent>
          <div className="text-center">
            <button className="btn btn-primary" onClick={handleClose} style={{ width: "20%", margin: "20px" }}>Đóng</button>
            <button className="btn btn-primary" onClick={this.onUpdateJob} style={{ width: "20%", margin: "20px" }}>Cập nhật</button>
          </div>
        </Dialog>
      </div>
    );
  }
}
FormDialog.formats = [
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

FormDialog.modules = {
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
export default withRouter(FormDialog);