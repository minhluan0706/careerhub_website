import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme({});

export default class SelectFieldExampleSelectionRenderer extends Component {
  state = {
    values: [],
    curentUser: null,
    listSkill: [],
  };

  handleChange = (event, index, values) => {
    const { type, onChange } = this.props;
    this.setState({ values });
    if (values) {
      onChange(type, values);
    }
  }

  selectionRenderer = (values) => {
    switch (values.length) {
      case 0:
        return '';
      // case 1:
      //   return this.props.options[values[0]];
      default:
        return `${values.length} Kỹ năng được chọn`;
    }
  }
  
  async componentDidMount() {
    const curUser = JSON.parse(localStorage.getItem('currentUser'));
    const list =  curUser.usersSkillList.map(item => item.skill.id)
    this.setState({
      curentUser: curUser,
      listSkill: list,
    })
  }

  menuItems(options) {
    return options.map((option) => (
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
          style={{ width: "100%", border: "1px solid #ccc", borderRadius: "5px" }}
          multiple={true}
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
