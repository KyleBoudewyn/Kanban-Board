import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import DisplayCards from './DisplayCards.js';
import CreateCard from './CreateCard.jsx';
import CreateTaskButton from './CreateTaskButton.jsx';
import HomeButton from './HomeButton.jsx';
import EditCard from './EditCard.jsx';
// import './app.css';

class App extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {};
  //   this.createCard = this.createCard.bind(this);
  // }

  // when global stat button is pressed
  // createCard(e) {
  //   console.log('I was here');
  // }

  componentDidMount() {
    // fetch('https://api.covid19api.com/summary')
    //   .then((data) => data.json())
    //   .then((data) => {
    //     return this.setState({
    //       global: data.Global,
    //     });
    //   });
  }
  render() {
    return (
      <div className="App">
        <h1>Kira Software</h1>
        <h2>The #2 software development tool used by agile teams!</h2>
        {/* switch to display buttons */}
        <Switch>
          <Route exact path="/" component={CreateTaskButton} />
          <Route exact path="/CreateTask" component={HomeButton} />
          <Route exact path="/editCard" component={HomeButton} />
        </Switch>
        {/* switch to display main component */}
        <Switch>
          <Route exact path="/" component={DisplayCards} />
          <Route exact path="/CreateTask" component={CreateCard} />
          <Route exact path="/editCard" component={EditCard} />
        </Switch>
      </div> 
    );
  }
}

export default App;
