import React from "react";
// import PropTypes from "prop-types";
import classNames from "classnames";
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
// import { BorderBottom } from "@material-ui/icons";

const styles = theme => ({
  root: {
    flexGrow: 1,
    // marginTop: 25,
    // paddingBottom: 25
  },
  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(theme.palette.type === "light" ? theme.palette.grey[300] : theme.palette.grey[700], 0.08)
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 14
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 14
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography color="textSecondary" className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontSize: "13px",
        padding: "10px 20px",
        margin: "0 5px",
        borderRadius: "2px",
        transition: "all 150ms linear",
        display: "block",
        clear: "both",
        fontWeight: "400",
        lineHeight: "2",
        whiteSpace: "nowrap",
        color: "#333",
        "&:hover": {
          backgroundColor: "#55bbf9 !important",
          color: "#FFFFFF",
          boxShadow: "0px 5px 20px 0px rgba(0,0,0,0.86)"
        }
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography color="textSecondary" className={props.selectProps.classes.placeholder} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

class IntegrationReactSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      single: this.props.defaultValue,
      loading: false
    };
    this.searchTimeout = null;
  }

  handleChange = name => value => {
    const { type, onChange } = this.props;
    this.setState({
      [name]: value
    });
    if (value) {
      onChange(type, value.value);
    }
  };

  render() {
    const { classes, theme, data } = this.props;
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit",
          fontSize: "14px !important",
          color: "#3c4858 !important",
          fontWeight: "400"
        }
      }),
      BorderBottom: {
        "&:hover": {
          color: "#fff"
        }
      }
    };
    return (
      <div className={classes.root}>
        <Select
          classes={classes}
          styles={selectStyles}
          options={data}
          components={components}
          value={this.state.single}
          onChange={this.handleChange("single")}
          isClearable
          isLoading={this.state.loading}
        />
      </div>
    );
  }
}

IntegrationReactSelect.propTypes = {
  // classes: PropTypes.objectOf(PropTypes.object()),
  // theme: PropTypes.objectOf(PropTypes.object()),
};

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);
