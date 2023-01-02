import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Search from "@material-ui/icons/Search";

// core components
import Input from "../CustomInput/CustomInput"
import Button from "../CustomButtons/Button";

import headerLinksStyle from "../../assets/jss/material-dashboard-react/components/headerLinksStyle";

type Props = {
  classes: Object,
  onSearchValue: Function,
  handleSearch: Function,
  result: Number
};

const InputSearch = (props: Props) => {
  const { classes, onSearchValue, handleSearch,result} = props;
  return (
    <div>
      <Input
        inputProps={{
          placeholder: "Search",
          onChange: e => onSearchValue("key", e.target.value),
          defaultValue: "",
          inputProps: {
            className: classes.searchInput
          }
        }}
      />
      <Button
        disabled = {!result}
        onClick={handleSearch}
        aria-label="edit"
        justIcon
        round
        className={classes.marginBtn}>
        <Search className={`${classes.headerLinksSvg} ${classes.margin}  `} />
      </Button>
    </div>
  );
};

InputSearch.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
};

export default withStyles(headerLinksStyle)(InputSearch);
