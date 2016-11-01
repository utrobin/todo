import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Form from '../form/form';

import './addTodo.scss';

export default class AddTodo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <div className="addTodo">
        <RaisedButton
          label="Добавить задачу"
          onTouchTap={this.handleOpen}
          fullWidth={true}
          primary={true}
          buttonStyle={{height: "50px"}}
          overlayStyle={{height: "50px", lineHeight: "50px"}}
        />
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
          />
        </Dialog>
      </div>
    );
  }
}
