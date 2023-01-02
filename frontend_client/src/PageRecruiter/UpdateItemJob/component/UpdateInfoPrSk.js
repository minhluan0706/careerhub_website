import React, { Component, Fragment } from 'react';
import SelectField from "./SelectField";

class UpdateInfoPrSk extends Component {
  emptyItem = {
    jobRequireSkillList: "",
    jobRequireProfessionJobList: ""

  };

  constructor(props) {
    super(props);
    this.state = {
      jobs: {},
      jobRequireSkillList: [],
      jobRequireProfessionJobList: [],
      item: this.emptyItem,
    };
  }

  componentWillMount() {
    this.setState({ jobs: this.props.job })
  }

  handleChangeSelectField = (key, value) => {
    let { item } = this.state;
    item[key] = {
      id: value
    };
    this.setState({ item: item });
  };

  handAddPrefSkill = async () => {
    const { item } = this.state;
    const { job } = this.props;
    const { jobRequireSkillList, jobRequireProfessionJobList } = item;

    const ListSkillJob = jobRequireSkillList ? [...jobRequireSkillList.id.map(skiluser => ({
      job: { id: job.id },
      skill: { id: skiluser }
    }))] : []

    const jrpjList = jobRequireProfessionJobList ? [...jobRequireProfessionJobList.id.map(profId => ({
      job: { id: job.id },
      professionJob: { id: profId }
    }))] : []

    await ListSkillJob.map(async listUpdate => {
      await fetch(`/admin/api/jobrequireskill`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(listUpdate)
      })
      .then(async () => {
        let itemjob = await fetch(`/admin/api/job/${job.id}`).then(response => response.json())
        this.setState({ jobs: itemjob })
      })
    })

    await jrpjList.map(async jrpj => {
      await fetch('/admin/api/jobrequireprofession', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jrpj)
      })
        .then(async () => {
          let itemjob = await fetch(`/admin/api/job/${job.id}`).then(response => response.json())
          this.setState({ jobs: itemjob })
        })
    })
  }


  handleDeleteProfes = async (id) => {
    const { job } = this.props
    await fetch(`/admin/api/jobrequireprofession/${job.id}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(async () => {
        let itemjob = await fetch(`/admin/api/job/${job.id}`).then(response => response.json())
        this.setState({ jobs: itemjob })
      })
  }

  handleDeleteSkill = async (id) => {
    const { job } = this.props
    await fetch(`/admin/api/jobrequireskill/${job.id}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(async () => {
        let itemjob = await fetch(`/admin/api/job/${job.id}`).then(response => response.json())
        this.setState({ jobs: itemjob })
      })
  }

  render() {
    const { profession, skills } = this.props;
    const { jobs } = this.state;
    return (
      <Fragment>
        <div className="p-5 mb-3 bg-white">
          <div className="row form-group">
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
          <div className="row form-group mb-3">
            <div className="col-md-12 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="fullname">Chọn Ngành nghề</label>
              <SelectField
                options={profession ? profession.map(el => ({ name: el.professionJobName, value: el.id })) : []}
                type="jobRequireProfessionJobList"
                onChange={this.handleChangeSelectField}
                required
              />
            </div>
          </div>
          <div className="col-md-12 text-center">
            <button className="btn btn-primary " onClick={this.handAddPrefSkill}> Lưu</button>
          </div>
        </div>

        <div className="p-4 mb-3 bg-white">
          <div className="row form-group mb-3">
            <div className="col-md-12 mt-3">
              <label ><h4>Yêu cầu về kĩ năng</h4></label>
              <div className="e-input-group1">
                {jobs.jobRequireSkillList && jobs.jobRequireSkillList.map(item => (
                  <span className="e-chips">
                    <span className="e-chipcontent">{item.skill.skillName}</span>
                    <button type="button" className="close" aria-label="Close" onClick={() => this.handleDeleteSkill(item.skill.id)}>
                      <span aria-hidden="true" >&times;</span>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="row form-group mb-4">
            <div className="col-md-12 mt-3">
              <label ><h4>Thuộc ngành nghề</h4></label>
              <div className="e-input-group1">
                {jobs.jobRequireProfessionJobList && jobs.jobRequireProfessionJobList.map(item => (
                  <span className="e-chips">
                    <span className="e-chipcontent">{item.professionJob.professionJobName}</span>
                    <button type="button" className="close" aria-label="Close" onClick={() => this.handleDeleteProfes(item.professionJob.id)}>
                      <span aria-hidden="true" >&times;</span>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Fragment >
    );
  }
}

export default UpdateInfoPrSk;