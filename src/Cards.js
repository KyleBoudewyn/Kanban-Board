import React, { Component } from 'react';
// import { Switch, Route } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import './app.css';

class Cards extends Component {
  render(props) {
    return (
      <div className="Cards">
        <div className="editDelete">
          {/* <Link to="/editCard" className="editCard"> */}
            <button
              onClick={(e) =>
                this.props.edit(
                  e,
                  this.props.id,
                  this.props.title,
                  this.props.description,
                  this.props.assignee,
                  this.props.status,
                  this.props.priority,
                  this.props.story_points,
                  this.props.due_date
                )
              }
            >
              Edit
            </button>
          {/* </Link> */}
          <button
            onClick={this.props.delete}
            id={this.props.id}
            content={this.props}
          >
            Delete
          </button>
        </div>
        <ul>
          <li className="titles">{this.props.title}</li>
          <li>Description: {this.props.description}</li>
          <li>Assignee: {this.props.assignee}</li>
          <li>Status: {this.props.status}</li>
          <li>Priority: {this.props.priority}</li>
          <li>Story Points: {this.props.story_points}</li>
          <li>Due Date: {this.props.due_date}</li>
          <li>Creation Date: {this.props.creation_date}</li>
        </ul>
      </div>
    );
  }
}

export default Cards;
