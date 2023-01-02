import React, { Fragment } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Tooltip } from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
// core components
import styles from "./styles";
import JobPage from "./Component";
// import { Helper } from "../../../utils";
import Modal from "./component/Modal";
import { toast } from "react-toastify";
import ModalConfirm from "../../Common/components/ModalDelete/index";

// const { getTxt } = Helper;

const getInitialState = () => {
  const initialState = {
    types: "",
    jobs: [],
    isLoading: true,
    modalDelete: false,
    idDelte: "",
    row: {},
    isOpenModal: false,
    citys: [],
    statuss: [],
    skills: [],
    professions: [],
    recruiters: [],
    jobRequireProfessionJobList: [],
    jobRequireSkillList: [],
    status: "",
    recruiter: "",
    city: "",
    form: {
      title: "",
      description: "",
      expired: "",
      experience: "",
      date: "",
      status: "",
      recruiter: "",
      city: "",
      jobRequireProfessionJobList: "",
      jobRequireSkillList: ""
    }
  };
  return initialState;
};

class JobPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
  };

  componentDidMount() {
    this.getListJob();
  }

  async getListJob() {
    let ListJob = await fetch(`/admin/api/job/list`).then(response => response.json())
    let ListCity = await fetch(`/admin/api/city/list`).then(response => response.json())
    let ListStatus = await fetch(`/admin/api/status/list`).then(response => response.json())
    let ListRecruiter = await fetch(`/admin/api/recruiter/list`).then(response => response.json())
    let ListProf = await fetch(`/admin/api/profession/list`).then(response => response.json())
    let ListSkill = await fetch(`/admin/api/skill/list`).then(response => response.json())

    this.setState({
      jobs: ListJob,
      citys: ListCity,
      statuss: ListStatus,
      recruiters: ListRecruiter,
      professions: ListProf,
      skills: ListSkill
    })
  };

  handleAdd = () => {
    this.setState({ isOpenModal: true });
  };

  handleUpdate = row => {
    this.setState({
      isOpenModal: true,
      types: "edit",
      row,
      form: row,
      city: row.city.id,
      recruiter: row.recruiter.id,
      status: row.status.id,
      jobRequireSkillList: row.jobRequireSkillList,
      jobRequireProfessionJobList: row.jobRequireProfessionJobList
    });
  };


  handleClose = () => {
    this.setState(getInitialState());
    this.getListJob();
  };

  handleDelete = (idDelte) => this.setState({ idDelte, modalDelete: true });

  handleCloseModalDelete = () => {
    this.setState({
      row: {},
      modalDelete: false
    });
  };

  onhandleDelete = () => {
    const { idDelte } = this.state;
    fetch(`/admin/api/job/${idDelte}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => {
      this.getListJob();
      toast.success('Xoá công việc thành công')
    }).catch(err => {
      if (err) {
        toast.error('Xoá công việc không thành công');
      }
    })
    this.setState({ modalDelete: false })
  };

  onChangeValue = (key, value) => {
    // eslint-disable-next-line react/no-direct-mutation-state
    let { form } = this.state;
    form[key] = value;
    this.setState({ form });
    // eslint-disable-next-line no-console
  };

  handleChangeSelect = (key, value) => {
    let { form } = this.state;
    form[key] = {
      id: value
    };
    this.setState({ form: form });
  };

  onCreateJob = async () => {
    const { form } = this.state;
    const { title, description, expired, experience, date, status, recruiter, city, jobRequireProfessionJobList, jobRequireSkillList } = form;

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

    // const jrpjList = [...jobRequireProfessionJobList.id.map(profId => ({
    //   job: { id: newJob.id },
    //   professionJob: { id: profId }
    // }))]
    // const SkillUserList = [...jobRequireSkillList.id.map(skilluser => ({
    //   job: { id: newJob.id },
    //   skill: { id: skilluser }
    // }))]
    const jrpjList = jobRequireProfessionJobList ? [...jobRequireProfessionJobList.id.map(profId => ({
      job: { id: newJob.id },
      professionJob: { id: profId }
    }))] : []

    const SkillUserList = jobRequireSkillList ? [...jobRequireSkillList.id.map(skilluser => ({
      job: { id: newJob.id },
      skill: { id: skilluser }
    }))] : []



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
        .catch(err => {
          if (err) {
            toast.error('Thêm mới công việc không thành công');
          }
        })
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
        .catch(err => {
          if (err) {
            toast.error('Thêm mới công việc không thành công');
          }
        })
    })
    toast.success('Thêm mới công việc thành công')
    this.getListJob();
    this.setState({ isOpenModal: false });
  };

  onUpdateJob = async id => {
    let { form } = this.state;
    form = { ...form, id };
    await fetch(`/admin/api/job/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          toast.success('Cập nhật công việc thành công')
          this.getListJob();
        }
      }).catch(err => {
        if (err) {
          toast.error('Cập nhật công việc không thành công');
        }
      })
    this.setState({ isOpenModal: false });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    const {
      jobs,
      isOpenModal,
      row,
      citys,
      recruiters,
      professions,
      statuss,
      types,
      city,
      recruiter,
      status,
      modalDelete,
      skills,
      jobRequireSkillList,
      jobRequireProfessionJobList
    } = this.state;

    const columns = [
      {
        width: 200,
        Header: "Công việc",
        id: "title",
        accessor: row =>
          <Tooltip title={row.title}>
            <div style={{ textAlign: "center" }}>{row.title}</div>
          </Tooltip>
      },
      {
        width: 130,
        Header: "Kinh nghiệm",
        id: "experience",
        accessor: row =>
          <Tooltip title={row.experience}>
            <div style={{ textAlign: "center" }}>{row.experience}</div>
          </Tooltip>
      },
      {
        width: 200,
        Header: "Ngày đăng tuyển",
        id: "date",
        accessor: row =>
          <Tooltip title={row.date}>
            <div style={{ textAlign: "center" }}>{row.date}</div>
          </Tooltip>
      },
      {
        width: 200,
        Header: "Nhà tuyển dụng",
        id: "companyName",
        accessor: row =>
          <Tooltip title={row.recruiter.companyName}>
            <div style={{ textAlign: "center" }}>{row.recruiter.companyName}</div>
          </Tooltip>
        // accessor: "recruiter.companyName"
      },
      {
        width: 150,
        Header: "Thành phố",
        id: "name",
        accessor: row =>
          <Tooltip title={row.city.name}>
            <div style={{ textAlign: "center" }}>{row.city.name}</div>
          </Tooltip>
        // accessor: "city.name"
      },
      {
        width: 150,
        Header: "Trạng thái",
        id: "statusName",
        accessor: row =>
          <Tooltip title={row.status.statusName}>
            <div style={{ textAlign: "center" }}>{row.status.statusName}</div>
          </Tooltip>
        // accessor: "status.statusName"
      },
      {
        width: 200,
        Header: "Kỹ năng",
        id: "jobRequireSkillList",
        accessor: row =>
          <Tooltip title={row.jobRequireSkillList.map(item => (<Fragment>{item.skill.skillName}, </Fragment>))}>
            <div style={{ textAlign: "center" }}>{row.jobRequireSkillList.map(item => (
              <Fragment>{item.skill.skillName}, </Fragment>)
            )}</div>
          </Tooltip>
      },
      {
        width: 200,
        Header: "Ngành nghề",
        id: "jobRequireProfessionJobList",
        accessor: row =>
          <Tooltip title={row.jobRequireProfessionJobList.map(item => (<Fragment>{item.professionJob.professionJobName}, </Fragment>))}>
            <div style={{ textAlign: "center" }}>{row.jobRequireProfessionJobList.map(item => (
              <Fragment>{item.professionJob.professionJobName}, </Fragment>)
            )}</div>
          </Tooltip>
      },
      {
        Header: "Chức năng",
        fixed: "right",
        width: 120,
        sortable: false,
        Cell: row => (
          <div style={{ textAlign: "center" }}>
            <Tooltip title="Sửa">
              <EditIcon
                // eslint-disable-next-line react/prop-types
                className={this.props.classes.edit}
                onClick={() => this.handleUpdate(row.original)}
              />
            </Tooltip>
            <Tooltip title="Xoá">
              <DeleteIcon
                // eslint-disable-next-line react/prop-types
                className={this.props.classes.delete}
                onClick={() => this.handleDelete(row.original.id)}
              />
            </Tooltip>
          </div>
        )
      }
    ];

    return (
      <Fragment>
        <JobPage
          jobs={jobs}
          columns={columns}
          classes={classes}
          handleAdd={this.handleAdd}
        />
        <Modal
          isOpenModal={isOpenModal}
          handleClose={this.handleClose}
          row={row}
          types={types}
          recruiter={recruiter}
          city={city}
          status={status}
          citys={citys}
          skills={skills}
          professions={professions}
          recruiters={recruiters}
          statuss={statuss}
          onChangeValue={this.onChangeValue}
          handleChangeSelect={this.handleChangeSelect}
          onCreateJob={this.onCreateJob}
          onUpdateJob={this.onUpdateJob}
          jobRequireSkillList={jobRequireSkillList}
          jobRequireProfessionJobList={jobRequireProfessionJobList}
        />
        {modalDelete && (
          <ModalConfirm
            modalDelete={modalDelete}
            title="Xoá công việc ?"
            onConfirm={this.onhandleDelete}
            handleClose={this.handleCloseModalDelete}
          />
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(JobPageContainer);