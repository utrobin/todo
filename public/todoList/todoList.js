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
    this.changeSort = this.changeSort.bind(this);
    this.changeTags = this.changeTags.bind(this);
    this.changeShow = this.changeShow.bind(this);

    this.state = {
      page: 0,
      error: false,
      loading: true,
      visibleButton: false,
      data: [],
      sort: 'dedline',
      tags: [],
      show: 'all',
    };
  }

  changeSort(sort) {
    this.setState({
      sort: sort,
      data: [],
      page: 0,
    }, this.getTasks)
  }

  changeShow(value) {
    this.setState({
      show: value,
      data: [],
      page: 0,
    }, this.getTasks)
  }

  changeTags(tags) {
    this.setState({
      tags: tags,
      data: [],
      page: 0,
    }, this.getTasks)
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
    this.loading();

    let xhr = new XMLHttpRequest();
    xhr.open('POST', `/api/get/tasks`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      page: this.state.page,
      sort: this.state.sort,
      tags: this.state.tags,
      show: this.state.show,
    }));
    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) return;

      if (xhr.status != 200) {
        this.setState({ error: true });
      } else {
        let data = JSON.parse(xhr.responseText);
        if (data.tasks.length === 0) {
          this.setState({
            page: ++this.state.page,
            visibleButton: false,
            loading: false,
            error: true
          });
        } else {
          let visibleButton = true;
          if (data.page - this.state.page === 1) {
            visibleButton = false
          }

          this.setState({
            data: this.state.data.concat(data.tasks),
            loading: false,
            page: ++this.state.page,
            visibleButton: visibleButton,
            error: false
          });
        }
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
        <BlockFilter
          loading={this.loading}
          changeSort={this.changeSort}
          changeTags={this.changeTags}
          changeShow={this.changeShow}
        />
        <Tasks
          error={this.state.error}
          data={this.state.data}
          getTasks={this.getTasks}
          visibleButton={this.state.visibleButton}
        />
      </div>
    );
  }
}
