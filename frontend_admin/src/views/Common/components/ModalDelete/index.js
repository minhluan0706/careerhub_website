/* eslint-disable react/prop-types */
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "../../../Common/components/CustomButtons/Button";
import GridContainer from "../../../Common/components/Grid/GridContainer";
import GridItem from "../../../Common/components/Grid/GridItem";

export default class FormDialog extends React.Component {
  render() {
    const {
      modalDelete,
      onConfirm,
      title,
      handleClose,
    } = this.props;

    return (
      <div>
        <Dialog
          open={modalDelete}
          fullWidth={true}
        >
          <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
            {title}
          </DialogTitle>
          <DialogContent>
            <GridContainer justify="center" noMargin>
              Bạn chắc chắn muốn xoá mục này !!!
            </GridContainer>
          </DialogContent>
          <GridContainer
            style={{ height: "10%" }}
            justify="center"
            alignItems="center"
          >
            <GridItem>
              <Button
                onClick={handleClose}
                color="secondary"
                style={{ margin: "10px 10px" }}
              >
                Thoát
              </Button>
              <Button
                onClick={onConfirm}
                color="info"
                style={{ margin: "10px 10px" }}
              >
                Xoá
              </Button>
            </GridItem>
          </GridContainer>
        </Dialog>
      </div>
    );
  }
}
