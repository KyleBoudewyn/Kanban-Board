import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './app.css';

class CreateTaskButton extends Component {
  render(props) {
    return (
      <div className="CreateTaskButton">
        <Link to="/CreateTask">
          <button type="button" className="createTaskbtn">
            Create Task
          </button>
        </Link>
      </div>
    );
  }
}

export default CreateTaskButton;
