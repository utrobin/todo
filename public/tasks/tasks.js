import React from 'react';
import Task from '../task/task';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import './tasks.scss';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openMessage: false,
      message: ""
    }
  }

  handleTouchTap = message => {
    this.setState({
      message: message,
      openMessage: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      openMessage: false,
    });
  };

  render() {
    if (this.props.error) {
      return (
        <div className="tasks">
          <span className="tasks_empty">Задач не найдено</span>
        </div>
      )
    }
    else {
      return (
        <div className="tasks">
          {
            this.props.data.map((el) => {
              return (
                <Task
                  key={el.id}
                  id={el.id}
                  title={el.title}
                  description={el.description}
                  dedline_date={el.date}
                  dedline_time={el.time}
                  completed={el.completed}
                  tags={el.tags}
                  deletedTodo={this.props.deletedTodo}
                  getTasks={this.props.getTasks}
                  loading={this.props.loadingF}
                  resetData={this.props.resetData}
                  handleTouchTap={this.handleTouchTap}
                />
              )
            })
          }

          <div className="tasks__loading">
            <div className={this.props.loading ? '' : 'tasks_none'}>
              <CircularProgress size={60} thickness={7} />
            </div>

            <div className={this.props.visibleButton ? '' : 'tasks_none'}>
              <RaisedButton
                label="Загрузить ещё"
                primary={true}
                onTouchTap={this.props.getTasks}
              />
            </div>
          </div>
          <Snackbar
            open={this.state.openMessage}
            message={this.state.message}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      );
    }
  }
}
