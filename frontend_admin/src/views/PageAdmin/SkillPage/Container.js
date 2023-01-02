/* eslint-disable no-console */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Tooltip } from "@material-ui/core";
import { toast } from "react-toastify";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
// core components
import styles from "./styles";
import SkillPage from "./Component";
// import { Helper } from "../../../utils";
import Modal from "./component/Modal";
import axios from "axios";
import ModalConfirm from "../../Common/components/ModalDelete/index";

// const { getTxt } = Helper;

const getInitialState = () => {
  const initialState = {
    type: "",
    isOpenModal: false,
    modalDelete: false,
    row: {},
    isLoading: true,
    skills: [],
    idDelte: "",
    form: {
      id: null,
      skillName: "",
      
    }
  };
  return initialState;
};

class SkillPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
  }

  componentWillMount() {
    this.getListSkill();
  }

  getListSkill = () => {
    axios
      .get("/admin/api/skill/list")
      .then(response => {
        this.setState({ skills: response.data, isLoading: false });
      }).catch(err => {
        if (err) {
          toast.error(err);
        }
      });
  };

  handleAdd = () => this.setState({ isOpenModal: true});

  handleUpdate = value => {
    this.setState({
      isOpenModal: true,
      type: "edit",
      row: value
    });
  };

  handleClose = () => {
    this.setState(getInitialState());
    this.getListSkill();
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
    axios
      .delete(`/admin/api/skill/${idDelte}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(() => {
        this.getListSkill();
        toast.success('Xoá kỹ năng thành công')
      }).catch(err => {
        if (err) {
          toast.error('Xoá kỹ năng không thành công');
        }
      })
    this.setState({ modalDelete: false })
  };

  onChangeValue = (key, value) => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.form[key] = value;
  };

  onCreateSkill = () => {
    const { form } = this.state;
    fetch("/admin/api/skill", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        // data = res.data
        if (data) {
          toast.success('Thêm mới kỹ năng thành công')
          this.getListSkill();
        }
      }).catch(err => {
        if (err) {
          toast.error('Thêm mới kỹ năng không thành công');
        }
      })
    this.setState({ isOpenModal: false });
  };

  onUpdateSkill = async id => {
    let { form } = this.state;
    form = {
      ...form,
      id
    };
    await fetch(`/admin/api/skill/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      // params: {id},
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        // data = res.data
        if (data) {
          toast.success('Cập nhật kỹ năng thành công')
          this.getListSkill();
        }
      }).catch(err => {
        if (err) {
          toast.error('Cập nhật kỹ năng không thành công');
        }
      })
    this.setState({ isOpenModal: false });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    const { skills, isOpenModal, row, type, modalDelete } = this.state;

    const columns = [
      {
        
        Header: "Kỹ năng",
        id: "name",
        accessor: row =>
        <Tooltip title={row.skillName}>
          <div style={{ textAlign: "center" }}>{row.skillName}</div>
        </Tooltip>
      },
      {
        Header: "Chức năng",
        width: 150,
        sortable: false,
        Cell: row => (
          <div style={{ textAlign: "center" }}>
            <Tooltip title="Sửa">
              <EditIcon
                className={this.props.classes.edit}
                onClick={() => this.handleUpdate(row.original)}
              />
            </Tooltip>
            <Tooltip title="Xoá">
              <DeleteIcon
                className={this.props.classes.delete}
                onClick={() => this.handleDelete(row.original.id)}
              />
            </Tooltip>
          </div>
        )
      }
    ]

    return (
      <Fragment>
        <SkillPage
          skills={skills}
          columns={columns}
          classes={classes}
          handleAdd={this.handleAdd}
        />
        {isOpenModal && (
          <Modal
            isOpenModal={isOpenModal}
            handleClose={this.handleClose}
            onChangeValue={this.onChangeValue}
            onCreateSkill={this.onCreateSkill}
            onUpdateSkill={this.onUpdateSkill}
            row={row}
            type={type}
          />
        )}
        {modalDelete && (
          <ModalConfirm
            modalDelete={modalDelete}
            title="Xoá kỹ năng ?"
            onConfirm={this.onhandleDelete}
            handleClose={this.handleCloseModalDelete}
          />
        )}
      </Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(SkillPageContainer));
