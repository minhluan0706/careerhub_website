import {
  cardTitle,
  primaryColor
} from "../../Common/assets/jss/material-dashboard-react";

// import { Styles } from "../../Common/theme";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  customCardContentClass: {
    paddingLeft: "0",
    paddingRight: "0"
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  floatRight: {
    float: "right"
  },
  floatLeft: {
    float: "left"
  },
  view: {
    cursor: "pointer",
    margin: "0px 10px"
  },
  edit: {
    cursor: "pointer",
    color: "#00bfff",
    margin: "0px 10px"
  },
  delete: {
    cursor: "pointer",
    color: "red",
    margin: "0px 10px"
  },
  switchBase: {
    color: `${primaryColor}!important`
  },
  switchChecked: {
    "& + $switchBar": {
      backgroundColor: "#55bbf9 !important"
    }
  },
  switchIcon: {
    boxShadow: "0 1px 3px 1px rgba(0, 0, 0, 0.4)",
    color: "#FFFFFF !important",
    border: "1px solid rgba(0, 0, 0, .54)",
    transform: "translateX(-4px)!important"
  },
  switchIconChecked: {
    borderColor: "#55bbf9",
    transform: "translateX(0px)!important"
  },
  switchBar: {
    width: "30px",
    height: "15px",
    backgroundColor: "rgb(80, 80, 80)",
    borderRadius: "15px",
    opacity: "0.7!important"
  },
  bgcolor: {
    background: "linear-gradient(60deg, #00bfff, #17a2b8) !important",
    textAlign: "center"
  }
};

export default styles;
