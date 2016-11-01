import React from 'react';
import AddTodo from '../addTodo/addTodo';
import BlockFilter from '../blockFilter/blockFilter';
import Tasks from '../tasks/tasks';

import './todoList.scss';

export default class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.getTasks = this.getTasks.bind(this);
    this.loading = this.loading.bind(this);
    this.resetData = this.resetData.bind(this);

    this.state = {
      page: 0,
      error: false,
      loading: true,
      visibleButton: false,
      data: []
    };
  }

  resetData() {
    this.setState({
      data: [],
      page: 0
    })
  }

  loading() {
    this.setState({
      loading: true,
      visibleButton: false,
    });
  }

  getTasks() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `/api/get/tasks`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify( {page: this.state.page} ));
    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) return;

      if (xhr.status != 200) {
        this.setState({ error: true });
      } else {
        let data = JSON.parse(xhr.responseText);

        let visibleButton = true;
        if (data.page - this.state.page === 1) {
          visibleButton = false
        }

        this.setState({
          data: this.state.data.concat(data.tasks),
          loading: false,
          page: ++this.state.page,
          visibleButton: visibleButton,
        });
        console.log(data);
      }
    }
  }

  componentWillMount() {
    this.getTasks();
  }

  render() {
    return (
      <div className="todolist">
        <AddTodo
          getTasks={this.getTasks}
          loading={this.loading}
          resetData={this.resetData}
        />
        <BlockFilter />
        <Tasks
          error={this.state.error}
          loading={this.state.loading}
          data={this.state.data}
          getTasks={this.getTasks}
          visibleButton={this.state.visibleButton}
        />
      </div>
    );
  }
}
