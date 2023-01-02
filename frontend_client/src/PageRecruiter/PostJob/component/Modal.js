/* eslint-disable react/prop-types */
import React from "react";
import { withRouter } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from '@material-ui/core/DialogTitle';

class FormDialog extends React.Component {

  render() {
    const { isOpenModal, handleClose } = this.props;
    return (
      <div>
        <Dialog
          open={isOpenModal}
          fullWidth={true}
          style={{color: "#3A3A3A" }}
        >
          <DialogTitle id="form-dialog-title" className="text-center" >
            <h3>Thông báo</h3>
            <h3>--------------</h3>
          </DialogTitle>
          <DialogContent style={{ padding: "10px 50px" }}>
            <h5 className="text-center">Đăng công việc thành công</h5>
          </DialogContent>
          <div className="text-center">
            <button className="btn btn-primary" onClick={handleClose} style={{ width: "20%", margin: "20px" }}>Đóng</button>
          </div>
        </Dialog>
      </div>
    );
  }
}
export default withRouter(FormDialog)