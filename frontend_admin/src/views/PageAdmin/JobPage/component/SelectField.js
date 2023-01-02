import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import "./style.css"

const muiTheme = getMuiTheme({});

export default class SelectFieldExampleSelectionRenderer extends Component {
  state = {
    // values: this.props.defaultValue ? this.props.defaultValue.map(item => (item.name) + ", ") : [],
    values: this.props.defaultValue ? this.props.defaultValue : [],

  };

  handleChange = (event, index, values) => {
    const { type, onChange } = this.props;
    this.setState({ values });
    if (values) {
      onChange(type, values);
    }
  }

  handleDelete = async (id) => {
    const { row } = this.props;
    this.props.sk ? (await fetch(`/admin/api/jobrequireskill/${row.id}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(async () => {
        let itemjob = await fetch(`/admin/api/job/${row.id}`).then(response => response.json())
        const skillofjob = itemjob.jobRequireSkillList && itemjob.jobRequireSkillList.map(item => ({ name: item.skill.skillName, value: item.skill.id }))
        this.setState({ values: skillofjob })
      }))
      :
      (await fetch(`/admin/api/jobrequireprofession/${row.id}/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      })
        .then(async () => {
          let itemProfession = await fetch(`/admin/api/job/${row.id}`).then(response => response.json())
          const Professionofjob = itemProfession.jobRequireProfessionJobList && itemProfession.jobRequireProfessionJobList.map(item => ({ name: item.professionJob.professionJobName, value: item.professionJob.id }))
          this.setState({ values: Professionofjob })
        }))
  }

  selectionRenderer = (values) => {
    switch (this.state.values) {
      case 0:
        return '';
      // case 1:
      //   return this.props.options[values[0]-1].name;
      default:
        return (
          <div className="e-input-group">
            {this.props.types ?
              (this.state.values && this.state.values.map(item => (
                <span className="e-chips">
                  <span className="e-chipcontent">{item.name}</span>
                  <button type="button" className="close" aria-label="Close" onClick={() => this.handleDelete(item.value)}>
                    <span aria-hidden="true" >&times;</span>
                  </button>
                </span>
              )))
              :
              <span className="e-chips">
                <span className="e-chipcontent">{`${this.state.values.length} mục được chọn`}</span>
              </span>
            }
          </div>
        );
    }
  }

  menuItems(options) {
    return this.props.types ?
      <div style={{ paddingLeft: "10px" }}>Đang xoá...</div> :
      options.map((option) => (
        <MenuItem
          key={option.value}
          insetChildren={true}
          checked={this.state.values.indexOf(option.value) > -1}
          value={option.value}
          primaryText={option.name}
        />
      ));
  }

  render() {
    const { options } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <SelectField
          style={{ width: "100%" }}
          multiple={true}
          // hintText="Công việc thuộc ngành nghề"
          value={this.state.values}
          onChange={this.handleChange}
          selectionRenderer={this.selectionRenderer}
        >
          {this.menuItems(options)}
        </SelectField>
      </MuiThemeProvider>
    );
  }
}
