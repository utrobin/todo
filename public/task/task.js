import React from 'react';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';

import './task.scss';

export default class Task extends React.Component {
  constructor(props) {
    super(props);

    this.onCheck = this.onCheck.bind(this);
  }

  componentWillMount() {
    this.setState({
      completed: this.props.completed,
      id: this.props.id
    })
  }

  onCheck(event) {
    this.setState({ completed: !this.state.completed });

    let xhr = new XMLHttpRequest();
    xhr.open('POST', `/api/edit/complete`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      id: this.state.id,
      completed: event.target.checked
    }));
  }

  render() {
    return (
    <Paper zDepth={1}>
      <div className="task">
        <Checkbox
          label="Выполнено"
          onCheck={this.onCheck}
          checked={this.state.completed}
        />
        <h2>{this.props.title}</h2>
        <p>{this.props.description}</p>
        <data>{this.props.date}</data>
        <br/>
        <time>{this.props.time}</time>
        <br/>
        <span>{this.props.tags.join(', ')}</span>
      </div>
    </Paper>
    );
  }
}
