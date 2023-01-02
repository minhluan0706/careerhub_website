/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "../../../Common/components/CustomButtons/Button";
import Input from "../../../Common/components/CustomInput/CustomInput";
import GridContainer from "../../../Common/components/Grid/GridContainer";
import GridItem from "../../../Common/components/Grid/GridItem";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Autocomplete from "../../../Common/components/Autocomple/Autocomplete";
import SelectField from "./SelectField";
import { FormLabel, FormControl } from "@material-ui/core";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ModalAddProfession from "./ModalAdd/ModalAddProfession";
import ModalAddSkill from "./ModalAdd/ModalAddSkill";

const styles = theme => ({
  textField: {
    marginRight: theme.spacing.unit,
    width: "100%"
  }
});

class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalAdd: false,
    };
  }

  handleOpenAdd = () => {
    this.setState({ isOpenModalAdd: true });
  };

  handleCloseAdd = () => {
    this.setState({ isOpenModalAdd: false });
  };


  render() {
    const {
      isOpenModal,
      handleClose,
      row,
      types,
      citys,
      professions,
      recruiters,
      statuss,
      onChangeValue,
      handleChangeSelect,
      status,
      recruiter,
      city,
      skills,
      onCreateJob,
      onUpdateJob,
      jobRequireSkillList,
      jobRequireProfessionJobList
    } = this.props;
    const { isOpenModalAdd } = this.state;

    const temp = citys ? citys.find(el => el.id === city) : {};
    const cities = {
      label: (temp || "").name,
      value: (temp || "").id
    };

    const temp1 = recruiters ? recruiters.find(el => el.id === recruiter) : {};
    const recrui = {
      label: (temp1 || "").companyName,
      value: (temp1 || "").id
    };

    const temp2 = statuss ? statuss.find(el => el.id === status) : {};
    const statu = {
      label: (temp2 || "").statusName,
      value: (temp2 || "").id
    };

    const skillofjob = jobRequireSkillList ? jobRequireSkillList.map(item => ({ name: item.skill.skillName, value: item.skill.id })) : []
    const Professionofjob = jobRequireProfessionJobList ? jobRequireProfessionJobList.map(item => ({ name: item.professionJob.professionJobName, value: item.professionJob.id })) : []


    const title = types === "edit" ? "Sửa thông tin" : "Thêm mới";

    const onSave = types === "edit" ? () => onUpdateJob(row.id) : onCreateJob;
    return (
      <div>
        {isOpenModalAdd && (
          <ModalAddProfession
            row={row}
            options={professions ? professions.map(el => ({ value: el.id, label: el.professionJobName })) : []}
            isOpenModalAdd={isOpenModalAdd}
            handleCloseAdd={this.handleCloseAdd}
            handleClose={handleClose}
            defaultValue={jobRequireProfessionJobList ? jobRequireProfessionJobList.map(item => ({ value: item.professionJob.id, label: item.professionJob.professionJobName })) : []}
          />
        )}
        {isOpenModalAdd && (
          <ModalAddSkill
            row={row}
            options={skills ? skills.map(el => ({ value: el.id, label: el.skillName })) : []}
            isOpenModalAdd={isOpenModalAdd}
            handleCloseAdd={this.handleCloseAdd}
            handleClose={handleClose}
            defaultValue={jobRequireSkillList ? jobRequireSkillList.map(item => ({ value: item.skill.id, label: item.skill.skillName })) : []}
          />
        )}
        <Dialog open={isOpenModal} fullWidth={true} maxWidth="false">
          <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
            {title}
          </DialogTitle>
          <DialogContent>
            <GridContainer justify="center" noMargin>
              <GridItem xs={11} md={7}>
                <Input
                  labelText="Tên công việc *"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => onChangeValue("title", e.target.value),
                    defaultValue: row.title || ""
                  }}
                />
              </GridItem>
              <GridItem xs={11} md={3}>
                <Input
                  labelText="Kinh nghiệm (năm) *"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "number",
                    onChange: e =>
                      onChangeValue("experience", Number(e.target.value)),
                    defaultValue: row.experience || ""
                  }}
                />
              </GridItem>

              <GridItem xs={11} md={5}>
                <Input
                  labelText="Ngày đăng tuyển (yyyy-mm-dd) *"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => onChangeValue("date", e.target.value),
                    defaultValue: row.date || ""
                  }}
                />
              </GridItem>
              <GridItem xs={11} md={5}>
                <Input
                  labelText="Kết thúc (yyyy-mm-dd) *"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => onChangeValue("expired", e.target.value),
                    defaultValue: row.expired || ""
                  }}
                />
              </GridItem>
              <GridItem xs={11} md={4} style={{ marginTop: "45px" }}>
                <InputLabel>Thành phố *</InputLabel>
                <Autocomplete
                  data={citys ? citys.map(el => ({ label: el.name, value: el.id })) : []}
                  defaultValue={cities}
                  type="city"
                  onChange={handleChangeSelect}
                />
              </GridItem>
              <GridItem xs={11} md={4} style={{ marginTop: "45px" }}>
                <InputLabel>Nhà tuyển dụng *</InputLabel>
                <Autocomplete
                  data={recruiters ? recruiters.map(el => ({ label: el.companyName, value: el.id })) : []}
                  defaultValue={recrui}
                  type="recruiter"
                  onChange={handleChangeSelect}
                />
              </GridItem>
              <GridItem xs={11} md={2} style={{ marginTop: "45px" }}>
                <InputLabel>Trạng thái *</InputLabel>
                <Autocomplete
                  data={statuss ? statuss.map(el => ({ label: el.statusName, value: el.id })) : []}
                  defaultValue={statu}
                  type="status"
                  onChange={handleChangeSelect}
                />
              </GridItem>
              <GridItem xs={11} md={9} style={{ margin: "35px 0px 20px 0px" }}>
                <InputLabel>Ngành nghề *</InputLabel>
                <SelectField
                  row={row}
                  types={types}
                  options={professions ? professions.map(el => ({ name: el.professionJobName, value: el.id })) : []}
                  type="jobRequireProfessionJobList"
                  onChange={handleChangeSelect}
                  defaultValue={Professionofjob}
                />
              </GridItem>
              {types ? <GridItem xs={11} md={1} style={{ lineHeight: "165px", maxHeight: "125px" }}>
                <Button
                  onClick={this.handleOpenAdd}
                  color="info"
                >
                  Thêm
                </Button>
              </GridItem> :
                <GridItem xs={11} md={1} style={{ lineHeight: "165px", maxHeight: "125px" }}>
                </GridItem>
              }
              <GridItem xs={11} md={9} style={{ margin: "0px 0px 20px 0px" }}>
                <InputLabel>Kỹ năng *</InputLabel>
                <SelectField
                  sk
                  row={row}
                  types={types}
                  options={skills ? skills.map(el => ({ name: el.skillName, value: el.id })) : []}
                  type="jobRequireSkillList"
                  onChange={handleChangeSelect}
                  defaultValue={skillofjob}
                />
              </GridItem>
              {types ? <GridItem xs={11} md={1} style={{ lineHeight: "93px", maxHeight: "125px" }}>
                <Button
                  onClick={this.handleOpenAdd}
                  color="info"
                >
                  Thêm
                </Button>
              </GridItem> :
                <GridItem xs={11} md={1} style={{ lineHeight: "93px", maxHeight: "125px" }}>
                </GridItem>
              }

              <GridItem xs={12} md={10}>
                <FormControl
                  style={{
                    width: "100%",
                    // marginTop: 20,
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
                    Description *
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

export default withStyles(styles)(FormDialog);
