import React from 'react';

import './blockFilter.scss';

export default class BlockFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <div className="blockFilter">
        тут будут фильтры и теги
      </div>
    );
  }
}
