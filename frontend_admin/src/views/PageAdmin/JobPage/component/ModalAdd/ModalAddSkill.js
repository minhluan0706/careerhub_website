/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import { withRouter } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from '@material-ui/core/DialogTitle';
import GridContainer from "../../../../Common/components/Grid/GridContainer";
import GridItem from "../../../../Common/components/Grid/GridItem";
import Select from 'react-select';

class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: this.props.defaultValue ? this.props.defaultValue : [],
      list: []
    };
  }

  handleChange = (values) => {
    this.setState({
      values,
      list: (values.map(item => item.value))
    });
  }

  handleSave = async () => {
    const { row } = this.props;
    const { list } = this.state;

    const ListSkillJob = list ? [...list.map(skiljob => ({
      job: { id: row.id },
      skill: { id: skiljob }
    }))] : []

    await ListSkillJob.map(async listUpdate => {
      await fetch('/admin/api/jobrequireskill', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(listUpdate)
      })
        .then(async() => {
          await this.props.handleCloseAdd();
          // await this.props.handleClose;
        })
    })
  }

  render() {
    const { isOpenModalAdd, handleCloseAdd, options } = this.props;
    return (
      <Fragment>
        <Dialog
          open={isOpenModalAdd}
          onClose={handleCloseAdd}
          fullWidth={true}
          style={{ color: "#3A3A3A" }}
        >
          <GridContainer justify="center" noMargin style={{ height: "255px",padding:"20px 10px 10px" }}>
            {/* <DialogContent > */}
              <GridItem xs={5} md={12}>
                <Select
                  isMulti
                  name="colors"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={this.state.values}
                  onChange={this.handleChange}
                />
              </GridItem>
            {/* </DialogContent> */}
          </GridContainer>
          <div className="text-center">
            <button className="btn btn-primary" style={{ width: "35%", margin: "20px" }} onClick={this.handleSave}>Thêm kỹ năng</button>
          </div>
        </Dialog>
      </Fragment>
    );
  }
}
export default withRouter(FormDialog)