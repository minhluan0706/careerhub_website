import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../../Common/components/Grid/GridItem";
import GridContainer from "../../Common/components/Grid/GridContainer";
import Card from "../../Common/components/Card/Card";
import CardHeader from "../../Common/components/Card/CardHeader";
import CardIcon from "../../Common/components/Card/CardIcon";
import CardFooter from "../../Common/components/Card/CardFooter";
import dashboardStyle from "../../Common/assets/jss/material-dashboard-react/views/dashboardStyle";

const getInitialState = () => {
  const initialState = {
    jobs: [],
    recruiters: [],
    cities: [],
    professions: [],
    users: [],
    skills: []
  };
  return initialState;
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
  }

  async componentDidMount() {
    let usersList = await fetch('/admin/api/users/list').then(response => response.json())
    let jobList = await fetch('/admin/api/job/list').then(response => response.json())
    let cityList = await fetch('/admin/api/city/list').then(response => response.json())
    let profList = await fetch('/admin/api/profession/list').then(response => response.json())
    let recruiterList = await fetch('/admin/api/recruiter/list').then(response => response.json())
    let skillsList = await fetch('/admin/api/skill/list').then(response => response.json())

    this.setState({
      users: usersList,
      jobs: jobList,
      recruiters: recruiterList,
      professions: profList,
      cities: cityList,
      skills: skillsList
    })
  }
  render() {
    const { classes } = this.props;
    const { jobs, recruiters, cities, professions, users, skills } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Ng?????i d??ng</p>
                <h3 className={classes.cardTitle}>
                  {users.length}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Warning />
                  Danh s??ch ng?????i d??ng
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Nh?? tuy???n d???ng</p>
                <h3 className={classes.cardTitle}>{recruiters.length}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Danh s??ch nh?? tuy???n d???ng
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>C??ng vi???c</p>
                <h3 className={classes.cardTitle}>{jobs.length}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Danh s??ch c??ng vi???c
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Ng??nh ngh???</p>
                <h3 className={classes.cardTitle}>{professions.length}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Danh s??ch ng??nh ngh???
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Cloud />
                </CardIcon>
                <p className={classes.cardCategory}>Th??nh ph???</p>
                <h3 className={classes.cardTitle}>{cities.length}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Danh s??ch th??nh ph???
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Code />
                </CardIcon>
                <p className={classes.cardCategory}>K??? n??ng</p>
                <h3 className={classes.cardTitle}>{skills.length}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Danh s??ch k??? n??ng
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
