import React from 'react';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import Form from '../form/form';

import './task.scss';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default class Task extends React.Component {
  constructor(props) {
    super(props);

    this.onCheck = this.onCheck.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      open: false,
    };
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

  onDelete() {
    this.props.deletedTodo(this.state.id);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', `/api/delete/todo`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      id: this.state.id,
    }));
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
    <Paper zDepth={1}>
      <div className="task">
        <Checkbox
          style={{float: "left", padding: "0 5 5 0", display: "block", width: "auto"}}
          iconStyle={{width: 40, height: 40}}
          labelStyle={{display: "none"}}
          onCheck={this.onCheck}
          checked={this.state.completed}
        />
        <div className="task__dedline">
          <data>{this.props.date} </data>
          <time>{this.props.time}</time>
        </div>
        <h2 className="task__title">{this.props.title}</h2>
        <p className="task__descreption">{this.props.description}</p>
        <div className="task__tools" >
            <span
              onClick={ this.onDelete }
              className="task__tools__span"
            >
              Удалить
            </span>
            <br />
            <span
              onClick={this.handleOpen}
              className="task__tools__span"
            >
              Изменить
            </span>
            <Dialog
              title="Добавить задачу"
              autoScrollBodyContent={true}
              modal={true}
              open={this.state.open}
            >
              <Form
                getTasks={this.props.getTasks}
                close={this.handleClose}
                loading={this.props.loading}
                resetData={this.props.resetData}
                url="/api/edit/todo"
                title={this.props.title}
                descreption={this.props.description}
                tags={this.props.tags}
                dedline_date={this.props.date}
                dedline_time={this.props.time}
                id={this.props.id}
              />
            </Dialog>
        </div>
        <div className="task__tags" style={styles.wrapper}>
          {
            this.props.tags.map((el, i) => {
              return (
                <Chip
                  key={el.id}
                  backgroundColor={el.active? "rgb(0, 188, 212)" : "rgb(224, 224, 224)"}
                  labelColor={el.active? "#fff" : "#000"}
                  style={styles.chip}
                >
                  {el.title}
                </Chip>
              )
            })
          }
        </div>
      </div>
    </Paper>
    );
  }
}
