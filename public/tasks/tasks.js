import React from 'react';
import Task from '../task/task';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

import './tasks.scss';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
  }

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
                  date={el.date}
                  time={el.time}
                  completed={el.completed}
                  tags={el.tags}
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
        </div>
      );
    }
  }
}
