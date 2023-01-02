/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Tooltip } from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
// core components
import styles from "./styles";
import UsersPage from "./Component";
// import { Helper } from "../../../utils";
import Modal from "./component/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import ModalConfirm from "../../Common/components/ModalDelete/index";

// const { getTxt } = Helper;

const getInitialState = () => {
  const initialState = {
    type: "",
    isOpenModal: false,
    modalDelete: false,
    idDelte: "",
    row: {},
    isLoading: true,
    users: [],
    form: {
      id: null,
      name: "",
      email: "",
      sdt: "",
      birthday: "",
      address: "",
      avatar:"",
      password:""
    }
  };
  return initialState;
}
class UsersPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
  }

  componentDidMount() {
    this.getListUsers();
  }

  getListUsers = () => {
    axios
      .get("/admin/api/users/list")
      .then(response => {
        this.setState({ users: response.data, isLoading: false });
      })
      .catch(err => {
        if (err) {
          toast.error(err);
        }
      });
  };

  handleAdd = () => this.setState({ isOpenModal: true });

  handleClose = () => {
    this.setState(getInitialState());
    this.getListUsers();
  }

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
      .delete(`/admin/api/users/${idDelte}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        this.getListUsers();
        toast.success('Xoá người dùng thành công')
      }).catch(err => {
        if (err) {
          toast.error('Xoá người dùng không thành công');
        }
      })
    this.setState({ modalDelete: false })
  };

  onChangeValue = (key, value) => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.form[key] = value;
    // eslint-disable-next-line no-console
  };

  onCreateUser = async () => {
    const { form } = this.state;
    fetch("/admin/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          toast.success('Thêm mới người dùng thành công')
          this.getListUsers();
        }
      })
      .catch(err => {
        if (err) {
          toast.error('Thêm mới người dùng không thành công');
        }
        })
    this.setState({ isOpenModal: false });
  };

  handleUpdate = row => {
    this.setState({
      isOpenModal: true,
      type: "edit",
      row,
      form: row
    });
  };

  onUpdateUser = async id => {
    let { form } = this.state;
    form = { ...form, id };
    await fetch(`/admin/api/users/`, {
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
          toast.success('Cập nhật người dùng thành công')
          this.getListUsers();
        }
      })
      .catch(err => {
        if (err) {
          toast.error('Cập nhật người dùng không thành công');
        }
      })
    this.setState({ isOpenModal: false });
  };

  render() {
    const { classes } = this.props;
    const { users, isOpenModal, isAdmin, row, type,modalDelete } = this.state;

    const columns = [
      {
        Header: "Họ tên",
        id: "name",
        accessor: row =>
        <Tooltip title={row.name}>
          <div style={{ textAlign: "center" }}>{row.name}</div>
        </Tooltip>
      },
      {
        Header: "Email",
        id: "email",
        accessor: row =>
        <Tooltip title={row.email}>
          <div style={{ textAlign: "center" }}>{row.email}</div>
        </Tooltip>
      },
      {
        Header: "Số điện thoại",
        id: "sdt",
        accessor: row =>
        <Tooltip title={row.sdt}>
          <div style={{ textAlign: "center" }}>{row.sdt}</div>
        </Tooltip>
      },
      {
        Header: "Địa chỉ",
        id: "address",
        accessor: row =>
        <Tooltip title={row.address}>
          <div style={{ textAlign: "center" }}>{row.address}</div>
        </Tooltip>
      },
      {
        Header: "Ngày sinh",
        id: "birthday",
        accessor: row =>
        <Tooltip title={row.birthday}>
          <div style={{ textAlign: "center" }}>{row.birthday}</div>
        </Tooltip>
      },
      {
        Header: "Kỹ năng",
        id: "usersSkillList",
        accessor: row =>
        <Tooltip title={row.usersSkillList.map(item =>(<Fragment>{item.skill.skillName}, </Fragment>))}>
        <div style={{ textAlign: "center" }}>{row.usersSkillList.map(item => (
          <Fragment>{item.skill.skillName}, </Fragment>)
          )}</div>
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
    ];

    return (
      <Fragment>
        <UsersPage
          users={users}
          columns={columns}
          classes={classes}
          handleAdd={this.handleAdd}
        />
        {isOpenModal && (
          <Modal
            isOpenModal={isOpenModal}
            handleClose={this.handleClose}
            onChangeValue={this.onChangeValue}
            onCreateUser={this.onCreateUser}
            onUpdateUser={this.onUpdateUser}
            type={type}
            row={row}
            isAdmin={isAdmin}
          />
        )}
        {modalDelete && (
          <ModalConfirm
            modalDelete={modalDelete}
            title="Xoá người dùng ?"
            onConfirm={this.onhandleDelete}
            handleClose={this.handleCloseModalDelete}
          />
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(UsersPageContainer);
