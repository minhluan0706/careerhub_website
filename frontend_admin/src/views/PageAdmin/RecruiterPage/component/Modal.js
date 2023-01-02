/* eslint-disable react/prop-types */
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "../../../Common/components/CustomButtons/Button";
import Input from "../../../Common/components/CustomInput/CustomInput";
import GridContainer from "../../../Common/components/Grid/GridContainer";
import GridItem from "../../../Common/components/Grid/GridItem";
import InputLabel from '@material-ui/core/InputLabel';
import Autocomplete from "../../../Common/components/Autocomple/Autocomplete";
import { FormLabel, FormControl } from "@material-ui/core";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class FormDialog extends React.Component {
  render() {
    const {
      isOpenModal,
      handleClose,
      onChangeValue,
      handleChangeSelect,
      row,
      city,
      citys,
      type,
      onCreateRecruiter,
      onUpdateRecruiter
    } = this.props;
    const temp = citys ? citys.find(el => el.id === city) : {};
    const cities = {
      label: (temp || "").name,
      value: (temp || "").id
    };

    const title = type === "edit" ? "Sửa thông tin" : "Thêm mới";
    const onSave =
      type === "edit" ? () => onUpdateRecruiter(row.id) : onCreateRecruiter;
    return (
      <div>
        <Dialog open={isOpenModal} fullWidth={true} maxWidth="false">
          <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
            {title}
          </DialogTitle>
          <DialogContent>
            <GridContainer justify="center" noMargin>
              <GridItem xs={11} md={5}>
                <Input
                  labelText="Tên nhà tuyển dụng *"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => onChangeValue("companyName", e.target.value),
                    defaultValue: row.companyName || ""
                  }}
                />
              </GridItem>
              <GridItem xs={11} md={5}>
                <Input
                  labelText="Email *"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => onChangeValue("email", e.target.value),
                    defaultValue: row.email || ""
                  }}
                />
              </GridItem>
              <GridItem xs={11} md={5}>
                <Input
                  labelText="Địa chỉ"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => onChangeValue("address", e.target.value),
                    defaultValue: row.address || ""
                  }}
                />
              </GridItem>
              <GridItem xs={11} md={5} style={{marginTop:"9px"}}>
                <InputLabel >Thành phố *</InputLabel>
                <Autocomplete
                  data={citys ? citys.map(el => ({ label: el.name, value: el.id })) : []}
                  defaultValue={cities}
                  type="city"
                  onChange={handleChangeSelect}
                />
              </GridItem>
              <GridItem xs={11} md={4}>
                <Input
                  labelText="Ảnh"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => onChangeValue("logo", e.target.value),
                    defaultValue: row.logo || ""
                    
                  }}
                />
              </GridItem>
              <GridItem xs={11} md={3}>
                <Input
                  labelText="Mật khẩu *"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => onChangeValue("password", e.target.value),
                    defaultValue: row.password || ""
                  }}
                />
              </GridItem>
              <GridItem xs={11} md={3}>
                <Input
                  labelText="Số điện thoại"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => onChangeValue("phone", e.target.value),
                    defaultValue: row.phone || ""
                  }}
                />
              </GridItem>
             
              <GridItem xs={12} md={10}>
                <FormControl
                  style={{
                    width: "100%",
                    marginTop: 20,
                    marginBottom: 20
                  }}
                >
                  <FormLabel
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: "#b2b2b2",
                      paddingBottom: 10
                    }}
                  >
                    Description
                  </FormLabel>
                  <ReactQuill
                    theme="snow"
                    defaultValue={row.description || ""}
                    name="description"
                    onChange={value => onChangeValue("description", value)}
                    modules={FormDialog.modules}
                    formats={FormDialog.formats}
                    placeholder={"Viết nội dung vào đây..."}
                    style={{ height: 200, marginBottom: 20 }}
                  />
                </FormControl>
              </GridItem>
            </GridContainer>
          </DialogContent>
          <GridContainer
            style={{ height: "10%" }}
            justify="center"
            alignItems="center"
          >
            <GridItem>
              <Button onClick={onSave} color="info" style={{ margin: "10px" }}>
                Lưu
              </Button>
              <Button
                onClick={handleClose}
                color="secondary"
                style={{ margin: "10px" }}
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
/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
FormDialog.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
FormDialog.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

/* 
 * PropType validation
 */
export default FormDialog;