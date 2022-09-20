import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './app.css';

class HomeButton extends Component {
  render(props) {
    return (
      <div className="HomeButton">
        <Link to="/" className="backLink">
          <button type="button" className="homebtn">
            Home Page
          </button>
        </Link>
      </div>
    );
  }
}

export default HomeButton;
