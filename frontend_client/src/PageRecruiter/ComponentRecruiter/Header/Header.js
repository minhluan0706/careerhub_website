import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="col-md-12">
        <div className="row justify-content-center mb-4">
          <div className="col-md-8 text-center">
            <h1 data-aos="fade-up">Hãy tự tin chúng tôi đi cùng bạn!</h1>
            <p data-aos="fade-up" data-aos-delay={100}>Người tốt - Việc tốt</p>
          </div>
        </div>
      </div> 
    );
  }
}

export default Header;