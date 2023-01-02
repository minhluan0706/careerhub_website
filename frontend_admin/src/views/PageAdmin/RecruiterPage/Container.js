/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Tooltip } from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
// core components
import styles from "./styles";
// import { Helper } from "../../../utils";
import RecruiterPage from "./Component";
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
    recruiters: [],
    citys: [],
    city: "",
    form: {
      id: null,
      companyName: "",
      email: "",
      description: "",
      address: "",
      logo: "",
      phone: "",
      city: "",
      password:""
    }
  };
  return initialState;
};

class RecruiterPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
  }

  componentDidMount () {
    this.getListRecruiter();
  }

  getListRecruiter = () => {
    axios
      .get("/admin/api/recruiter/list")
      .then(response => {
        this.setState({ recruiters: response.data, isLoading: false });
      })
      .catch(err => console.log(err));
    axios
      .get("/admin/api/city/list")
      .then(response => {
        this.setState({ citys: response.data, isLoading: false });
      })
      .catch(err => {
        if (err) {
          toast.error(err);
        }
      });
  };

  handleAdd = () => this.setState({ isOpenModal: true});

  handleClose = () => {
    this.setState(getInitialState());
    this.getListRecruiter();
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
      .delete(`/admin/api/recruiter/${idDelte}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        this.getListRecruiter();
        toast.success('Xoá nhà tuyển dụng thành công')
      })
      .catch(err => {
        if (err) {
          toast.error('Xoá nhà tuyển dụng không thành công');
        }
      })
    this.setState({ modalDelete: false })
  };

  onChangeValue = (key, value) => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.form[key] = value;
  };

  handleChangeSelect = (key, value) => {
    let { form } = this.state;
    form[key] = {
      id: value
    };
    this.setState({ form: form });
  };


  onCreateRecruiter =  () => {
    const { form } = this.state;
    fetch("/admin/api/recruiter", {
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
          toast.success('Thêm mới nhà tuyển dụng thành công')
          this.getListRecruiter();
        }
      })
      .catch(err => {
        if (err) {
          toast.error('Thêm mới nhà tuyển dụng không thành công');
        }
      })
    this.setState({ isOpenModal: false });
  };

  handleUpdate = row => {
    this.setState({
      isOpenModal: true,
      type: "edit",
      row,
      form: row,
      city: row.city.id
    });
  };

  onUpdateRecruiter = async id => {
    let { form } = this.state;
    form = { ...form, id };
    await fetch(`/admin/api/recruiter/`, {
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
          toast.success('Cập nhật thông tin nhà tuyển dụng thành công')
          this.getListRecruiter();
        }
      })
      .catch(err => {
        if (err) {
          toast.error('Cập nhật thông tin nhà tuyển dụng không thành công');
        }
      })
    this.setState({ isOpenModal: false });
  }

  render() {
    const { classes } = this.props;
    const { recruiters, isOpenModal, row, type, citys, city, modalDelete } = this.state;
    const columns = [
      {
        Header: "Nhà tuyển dụng",
        id: "companyName",
        accessor: row =>
        <Tooltip title={row.companyName}>
          <div style={{ textAlign: "center" }}>{row.companyName}</div>
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
        Header: "Địa chỉ",
        id: "address",
        accessor: row =>
        <Tooltip title={row.address}>
          <div style={{ textAlign: "center" }}>{row.address}</div>
        </Tooltip>
      },
      {
        Header: "Số điện thoại",
        id: "phone",
        accessor: row =>
        <Tooltip title={row.phone}>
          <div style={{ textAlign: "center" }}>{row.phone}</div>
        </Tooltip>
      },
      {
        Header: "Thuộc thành phố",
        id: "name",
        accessor: row =>
        <Tooltip title={row.city.name}>
          <div style={{ textAlign: "center" }}>{row.city.name}</div>
        </Tooltip>
        //  accessor: "city.name"
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
        <RecruiterPage
          recruiters={recruiters}
          columns={columns}
          classes={classes}
          handleAdd={this.handleAdd}
        />
        {isOpenModal && (
          <Modal
            citys={citys}
            city={city}
            isOpenModal={isOpenModal}
            handleClose={this.handleClose}
            handleChangeSelect={this.handleChangeSelect}
            onChangeValue={this.onChangeValue}
            onCreateRecruiter={this.onCreateRecruiter}
            onUpdateRecruiter={this.onUpdateRecruiter}
            row={row}
            type={type}
          />
        )}
         {modalDelete && (
          <ModalConfirm
            modalDelete={modalDelete}
            title="Xoá nhà tuyển dụng ?"
            onConfirm={this.onhandleDelete}
            handleClose={this.handleCloseModalDelete}
          />
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(RecruiterPageContainer);
