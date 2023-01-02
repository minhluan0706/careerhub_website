import React, { Component, Fragment } from 'react';
import ReactQuill from "react-quill";
import SelectField from "./SelectField";
import "react-quill/dist/quill.snow.css";
import Modal from "./Modal";
import { withRouter } from "react-router";

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

class NewPost extends Component {

  emptyItem = {
    expired: "",
    title: "",
    description: "",
    experience: "",
    date: this.today,
    recruiter: this.props.curentRecruiter,
    city: "",
    status: {id:1},
    jobRequireProfessionJobList: "",
    jobRequireSkillList:""
  };

  constructor(props) {
    super(props);
    this.state = {
      jobRequireProfessionJobList: [],
      jobRequireSkillList:[],
      isOpenModal: false,
      item: this.emptyItem,
    };
  }
  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item: item });
  };

  onChangeValueEditor = (key, value) => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.item[key] = value;
  };

  handleChangeSelect = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = {
      id: value
    };
    this.setState({ item: item });
  };

  handleChangeSelectField = (key, value) => {
    let { item } = this.state;
    item[key] = {
      id: value
    };
    this.setState({ item: item });
  };

  onRecruiterPostJob = async () => {
    const { item } = this.state;
    const { title, description, expired, experience, date, status, recruiter, city, jobRequireProfessionJobList,jobRequireSkillList } = item;

    const jobItem = {
      title,
      description,
      expired,
      experience,
      date,
      status,
      recruiter,
      city
    }

    //Add job
    const newJob = await fetch(`/admin/api/job`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jobItem)
    }).then(res => res.json())

    const jrpjList = [...jobRequireProfessionJobList.id.map(profId => ({
      job: { id: newJob.id },
      professionJob: { id: profId }
    }))]
    const SkillUserList = [...jobRequireSkillList.id.map(skilluser => ({
      job: { id: newJob.id },
      skill: { id: skilluser }
    }))]

    //add profession Job to that job
    await jrpjList.map(async jrpj => {
      await fetch('/admin/api/jobrequireprofession', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jrpj)
      }).then(res => res.json())
    })
    //add skill Job to that job
    await SkillUserList.map(async Listskiluser => {
      await fetch('/admin/api/jobrequireskill', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Listskiluser)
      }).then(res => res.json())
    })

    this.setState({ isOpenModal: true });
  };

  handleClose = () => {
    this.setState({ isOpenModal: false });
    this.props.history.push("/trang-nha-tuyen-dung")
  };
  // onCreateJob = async () => {
  //   const { item } = this.state;
  //   fetch(`/admin/api/job`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(item)
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data) {
  //         alert("Đăng công việc thành công")
  //       }
  //     })
  //     .catch(err => alert(err));
  // };

  render() {

    const { item, isOpenModal } = this.state;
    const { profession,skills } = this.props;
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
        {isOpenModal && (
          <Modal
            isOpenModal={isOpenModal}
            handleClose={this.handleClose}
          />
        )}
        <div className="p-5 bg-white">
          <div className="row form-group">
            <div className="col-md-12 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="fullname">Tên công việc</label>
              <input type="text" className="form-control" onChange={this.handleChange}
                name="title" value={item.title} placeholder="Nhập vào tên công việc..." required/>
            </div>
          </div>
          <div className="row form-group mb-5">
            <div className="col-md-4 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="fullname">Ngày đăng tuyển</label>
              <input disabled type="text" className="form-control" value={today} name="date" required/>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="fullname">Ngày hết hạn</label>
              <input type="date" className="form-control" value={item.expired} onChange={this.handleChange}
                name="expired" required/>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="fullname">Kinh nghiệm</label>
              <input type="number" className="form-control" value={item.experience} onChange={this.handleChange}
                name="experience" required/>
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
                required
              >
                <option selected>Thành phố...</option>
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
                required
              >
                <option selected>Trạng thái...</option>
                {statusOptionList}
              </select>
            </div>
          </div>
          <div className="row form-group mb-3">
            <div className="col-md-12 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="fullname">Thuộc Ngành nghề</label>
              <SelectField
                options={profession ? profession.map(el => ({ name: el.professionJobName, value: el.id })) : []}
                type="jobRequireProfessionJobList"
                onChange={this.handleChangeSelectField}
                required
              />
            </div>
          </div>
          <div className="row form-group mb-4">
            <div className="col-md-12 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="fullname">Chọn kỹ năng</label>
              <SelectField
                options={skills ? skills.map(sk => ({ name: sk.skillName, value: sk.id })) : []}
                type="jobRequireSkillList"
                onChange={this.handleChangeSelectField}
                required
              />
            </div>
          </div>
          <div className="row form-group mb-4">
            <div className="col-md-12 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="fullname">Mô tả</label>
              <ReactQuill
                name="description"
                value={item.description}
                onChange={value =>
                  this.onChangeValueEditor("description", value)
                }
                required
                theme="snow"
                modules={NewPost.modules}
                formats={NewPost.formats}
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
            <input type="submit" className="btn btn-primary py-2 px-5" onClick={this.onRecruiterPostJob} value="Đăng tuyển" ></input>
          </div>
        </div>
      </Fragment>
    );
  }
}
NewPost.formats = [
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

NewPost.modules = {
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
export default withRouter(NewPost);