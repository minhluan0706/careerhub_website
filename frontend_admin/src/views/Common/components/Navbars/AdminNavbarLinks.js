/* eslint-disable react/prop-types */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Tooltip } from "@material-ui/core";
// @material-ui/icons
import { ExitToApp as LogoutIcon } from "@material-ui/icons";
// core components
// import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import { Link } from "react-router-dom";
import headerLinksStyle from "../../assets/jss/material-dashboard-react/components/headerLinksStyle";

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };
  handleLogout = () => {
    localStorage.removeItem("user");
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* <div className={classes.searchWrapper}>
          <CustomInput
            formControlProps={{
              className: classes.margin + " " + classes.search
            }}
            inputProps={{
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search"
              }
            }}
          />
          <Button color="white" aria-label="edit" justIcon round>
            <Search />
          </Button>
        </div> */}
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Person"
          className={classes.buttonLink}
        >
          <Link to="/login">
            <Tooltip title="Đăng xuất">
              <LogoutIcon className={classes.icons} onClick={this.handleLogout}>
                {" "}
              </LogoutIcon>
            </Tooltip>
          </Link>
        </Button>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
