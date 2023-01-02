/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-direct-mutation-state */
import React, { Fragment } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Tooltip } from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
// core components
import styles from "./styles";
import { toast } from "react-toastify";
import CityPage from "./Component";
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
    cities: [],
    idDelte: "",
    form: {
      id: null,
      name: ""
    }
  };
  return initialState;
};

class CityPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
  }

  componentDidMount() {
    this.getListCity();
  }

  getListCity = () => {
    axios
      .get("/admin/api/city/list")
      .then(response => {
        this.setState({
          cities: response.data,
          isLoading: false
        });
      }).catch(err => {
        if (err) {
          toast.error(err);
        }
      });
  };

  handleDelete = (idDelte) => this.setState({ idDelte, modalDelete: true });

  onhandleDelete = () => {
    const { idDelte } = this.state;
    axios
      .delete(`/admin/api/city/${idDelte}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        this.getListCity();
        toast.success('Xoá thành phố thành công')
      }).catch(err => {
        if (err) {
          toast.error('Xoá thành phố không thành công');
        }
      })
    this.setState({ modalDelete: false })
  }

  handleAdd = () => this.setState({ isOpenModal: true});

  handleClose = () => {
    this.setState(getInitialState());
    this.getListCity();
  };

  onChangeValue = (key, value) => {
    this.state.form[key] = value;
  };

  onCreateCity = async () => {
    const { form } = this.state;
    fetch("/admin/api/city", {
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
          toast.success('Thêm mới thành phố thành công')
          this.getListCity();
        }
      }).catch(err => {
        if (err) {
          toast.error('Thêm mới thành phố không thành công');
        }
      })
    this.setState({ isOpenModal: false });
  };

  handleCloseModalDelete = () => {
    this.setState({
      row: {},
      modalDelete: false
    });
  };

  onUpdateCity = async id => {
    let { form } = this.state;
    form = {
      ...form,
      id
    };
    await fetch(`/admin/api/city/`, {
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
          toast.success('Cập nhật thành phố thành công')
          this.getListCity();
        }
      }).catch(err => {
        if (err) {
          toast.error('Cập nhật thành phố không thành công');
        }
      })
    this.setState({ isOpenModal: false });
  };

  handleUpdate = value => {
    this.setState({
      isOpenModal: true,
      type: "edit",
      row: value
    });
  };

  render() {
    const { classes } = this.props;
    const { cities, isOpenModal, row, type, modalDelete } = this.state;

    const columns = [
      {
        Header: "Thành phố",
        id: "name",
        accessor: row =>
        <Tooltip title={row.name}>
          <div style={{ textAlign: "center" }}>{row.name}</div>
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
        <CityPage
          cities={cities}
          columns={columns}
          classes={classes}
          handleAdd={this.handleAdd}
        />
        {isOpenModal && (
          <Modal
            isOpenModal={isOpenModal}
            handleClose={this.handleClose}
            onChangeValue={this.onChangeValue}
            onCreateCity={this.onCreateCity}
            onUpdateCity={this.onUpdateCity}
            row={row}
            type={type}
          />
        )}
          {modalDelete && (
          <ModalConfirm
            modalDelete={modalDelete}
            title="Xoá thành phố ?"
            onConfirm={this.onhandleDelete}
            handleClose={this.handleCloseModalDelete}
          />
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(CityPageContainer);
