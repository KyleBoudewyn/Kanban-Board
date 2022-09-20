import React, { Component } from 'react';
// import { Switch, Route } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import Cards from './Cards.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import EditCard from './EditCard.jsx';
import './app.css';

class DisplayCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      fetchedCards: false,
      deleteCardCount: 0,
      editCardProps: {},
    };

    this.getCards = this.getCards.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  getCards() {
    fetch('/api/getCard')
      .then((response) => response.json())
      .then((cards) => {
        return this.setState({
          cards,
          fetchedCards: true,
        });
      })
      .catch((err) =>
        console.log('DisplayCards.componentDidMount: get cards: ERROR: ', err)
      );
  }

  componentDidMount() {
    return this.getCards();
  }

  edit(
    e,
    id,
    title,
    description,
    assignee,
    status,
    priority,
    story_points,
    due_date
  ) {
    console.log('edit clicked');
    return this.setState({
      editCardProps: {
        id,
        title,
        description,
        assignee,
        status,
        priority,
        story_points,
        due_date,
      },
    });
  }

  delete(e) {
    console.log('delete clicked');
    const id = { id: e.target.id };
    fetch('/api/deleteCards', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(id),
    })
      .then((response) => this.getCards())
      .catch((err) =>
        console.log('DeleteCard fetch /api/deleteCards: Error: ', err)
      );
    this.forceUpdate();
  }

  // dbContent(data) {
  //   console.log(data);
  // }

  render(props) {
    console.log(this.state.deleteCardCount);
    console.log(this.state.cards);
    console.log('this is in render');
    console.log(this.state.editCardProps);
    const todo = [];
    const inProgress = [];
    const done = [];
    for (let el of this.state.cards) {
      const card = (
        <Cards
          key={el.id}
          id={el.id}
          title={el.title}
          description={el.description}
          assignee={el.assignee}
          status={el.status}
          priority={el.priority}
          story_points={el.story_points}
          due_date={el.due_date}
          creation_date={el.creation_date}
          edit={this.edit}
          delete={this.delete}
        />
      );
      if (el.status === 'In Progress') {
        inProgress.push(card);
      } else if (el.status === 'Done') {
        done.push(card);
      } else {
        todo.push(card);
      }
    }

    return (
      <div className="DisplayCards">
        {this.state.editCardProps.id != undefined ? (
          <EditCard
            title={this.state.editCardProps.title}
            description={this.state.editCardProps.description}
            assignee={this.state.editCardProps.assignee}
            status={this.state.editCardProps.status}
            priority={this.state.editCardProps.priority}
            story_points={this.state.editCardProps.story_points}
            due_date={this.state.editCardProps.due_date}
          />
        ) : (
          ''
        )}
        <div className="toDo">
          <h3>TO DO</h3>
          {todo}
        </div>
        <div className="inProgres">
          <h3>IN PROGRESS</h3>
          {inProgress}
        </div>
        <div className="done">
          <h3>DONE</h3>
          {done}
        </div>
      </div>
    );
  }
}

export default DisplayCards;
