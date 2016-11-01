import React from 'react';
import AddTodo from '../addTodo/addTodo';
import BlockFilter from '../blockFilter/blockFilter';

import './todo.scss';

export default class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="todolist">
        <AddTodo />
        <BlockFilter />
      </div>
    );
  }
}
