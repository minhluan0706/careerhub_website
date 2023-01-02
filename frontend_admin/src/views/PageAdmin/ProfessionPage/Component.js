/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button } from "@material-ui/core";
import CardIcon from "../../Common/components/Card/CardIcon";
import GridItem from "../../Common/components/Grid/GridItem";
import GridContainer from "../../Common/components/Grid/GridContainer";
import Card from "../../Common/components/Card/Card";
import CardHeader from "../../Common/components/Card/CardHeader";
import CardBody from "../../Common/components/Card/CardBody";

class ProfessionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ""
    }
  }

  handleFilter = (e) => {
    this.setState({
      search: e.target.value
    })
  };

  render() {
    const { classes, columns, handleAdd } = this.props;
    let data = this.props.professions
    if (this.state.search) {
      data = data.filter(row => {
        return row.professionJobName.includes(this.state.search)
      })
    }
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader>
              <CardIcon color="primary" className={classes.bgcolor}>
                <h4 className={classes.cardTitleWhite}>Ngành nghề</h4>
              </CardIcon>
              <div
                style={{ display: "flex", flexDirection: "row", float: "right" }}
              >
                <div className="form-group mb-0" style={{ marginRight: "20px" }} >
                  <input
                    placeholder="Tìm kiếm..."
                    className="form-control"
                    value={this.state.search}
                    onChange={this.handleFilter}
                  />
                </div>
              <Button
                className={classes.bgcolor}
                style={{ float: "right", color: "#fff" }}
                onClick={handleAdd}
              >
                Thêm mới
              </Button>
              </div>
            </CardHeader>
            <CardBody>
              <ReactTable
                style={{ textAlign: "center" }}
                data={data}
                columns={columns}
                defaultPageSize={6}
                sortable={false}
                showPageSizeOptions={false}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default ProfessionPage;
