/* eslint-disable react/prop-types */
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "../../../Common/components/CustomButtons/Button";
import Input from "../../../Common/components/CustomInput/CustomInput"
import GridContainer from "../../../Common/components/Grid/GridContainer";
import GridItem from "../../../Common/components/Grid/GridItem";

export default class FormDialog extends React.Component {
  render() {
    const {
      isOpenModal,
      handleClose,
      onChangeValue,
      onCreateSkill,
      row,
      type,
      onUpdateSkill
    } = this.props;

    const title = type === "edit" ? "Sửa thông tin" : "Thêm mới";
    const onSave =
      type === "edit" ? () => onUpdateSkill(row.id) : onCreateSkill;
    return (
      <div>
        <Dialog
          open={isOpenModal}
          // onClose={handleClose}
          fullWidth={true}
          maxWidth="true"
        >
          <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
            {title}
          </DialogTitle>
          <DialogContent>
            <GridContainer justify="center" noMargin>
              <GridItem xs={11} md={6}>
                <Input
                  labelText="Tên kỹ năng"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => onChangeValue("skillName", e.target.value),
                    defaultValue: row.skillName || ""
                  }}
                />
              </GridItem>
            </GridContainer>
          </DialogContent>
          <GridContainer
            style={{ height: "10%" }}
            justify="center"
            alignItems="center"
          >
            <GridItem>
              <Button
                onClick={onSave}
                color="info"
                style={{ margin: "10px 10px" }}
              >
                Lưu
              </Button>
              <Button
                onClick={handleClose}
                color="secondary"
                style={{ margin: "10px 10px" }}
              >
                Thoát
              </Button>
            </GridItem>
          </GridContainer>
        </Dialog>
      </div>
    );
  }
}
