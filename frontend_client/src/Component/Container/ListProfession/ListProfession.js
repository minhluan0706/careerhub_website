import React, { Component } from 'react';
import ProfessionItem from './ProfessionItem';

class ListProfession extends Component {
  render() {
    const { professions } = this.props;
    return (
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-md-7 text-center ">
            <h3 class="font-weight-light text-primary">Ngành nghề</h3>
          </div>
        </div>
        <div class="overlap-category mb-5">
          <div class="row align-items-stretch no-gutters">
            <ProfessionItem professions={professions}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ListProfession;