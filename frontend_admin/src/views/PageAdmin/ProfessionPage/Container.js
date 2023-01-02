/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Tooltip } from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
// core components
import styles from "./styles";
import ProfessionPage from "./Component";
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
    row: {},
    isLoading: true,
    modalDelete: false,
    idDelte: "",
    skills: [],
    form: {
      id: null,
      professionJobName: ""
    }
  };
  return initialState;
};

class ProfessionPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
  }

  componentDidMount() {
    this.getListProfession()
  }

  getListProfession = () => {
    axios
      .get("/admin/api/profession/list")
      .then(response => {
        this.setState({ professions: response.data, isLoading: false })
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
    this.getListProfession();
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
      .delete(`/admin/api/profession/${idDelte}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        this.getListProfession();
        toast.success('Xoá ngành nghề thành công')
      })
      .catch(err => {
        if (err) {
          toast.error('Xoá ngành nghề không thành công');
        }
      })
    this.setState({ modalDelete: false })
  };

  onChangeValue = (key, value) => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.form[key] = value;
  };

  onCreateProfession = async () => {
    const { form } = this.state;
    fetch("/admin/api/profession", {
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
          toast.success('Thêm mới ngành nghề thành công')
          this.getListProfession();
        }
      })
      .catch(err => {
        if (err) {
          toast.error('Thêm mới ngành nghề không thành công');
        }
      })
    this.setState({ isOpenModal: false });
  };

  handleUpdate = row => {
    this.setState({
      isOpenModal: true,
      type: "edit",
      row
    });
  };

  onUpdateProfession = async id => {
    let { form } = this.state;
    form = {
      ...form,
      id
    };
    await fetch(`/admin/api/profession/`, {
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
        if (data) {
          toast.success('Cập nhật ngành nghề thành công')
          this.getListProfession();
        }
      })
      .catch(err => {
        if (err) {
          toast.error('Cập nhật ngành nghề không thành công');
        }
      })
    this.setState({ isOpenModal: false });
  };

  render() {
    const { classes } = this.props;
    const { professions, isOpenModal, row, type, modalDelete } = this.state;

    const columns = [
      {
        Header: "Ngành nghề",
        id: "name",
        // accessor: row => getTxt(row.professionJobName)
        accessor: row =>
        <Tooltip title={row.professionJobName}>
          <div style={{ textAlign: "center" }}>{row.professionJobName}</div>
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
        <ProfessionPage
          professions={professions}
          columns={columns}
          classes={classes}
          handleAdd={this.handleAdd}
        />
        {isOpenModal && (
          <Modal
            isOpenModal={isOpenModal}
            handleClose={this.handleClose}
            onChangeValue={this.onChangeValue}
            onCreateProfession={this.onCreateProfession}
            onUpdateProfession={this.onUpdateProfession}
            row={row}
            type={type}
          />
        )}
        {modalDelete && (
          <ModalConfirm
            modalDelete={modalDelete}
            title="Xoá ngành nghề ?"
            onConfirm={this.onhandleDelete}
            handleClose={this.handleCloseModalDelete}
          />
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(ProfessionPageContainer);
