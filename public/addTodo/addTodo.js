import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Form from '../form/form';
import Snackbar from 'material-ui/Snackbar';

import './addTodo.scss';

export default class AddTodo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openMessage: false,
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = message => {
    this.setState({
      open: false
    }, () => { if (message === "message") this.handleTouchTap(); });
  };

  handleTouchTap = () => {
    this.setState({
      openMessage: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      openMessage: false,
    });
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
          labelStyle={{fontSize: 24, fontWeight: 700}}
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
            nameButton="Добавить"
            url="/api/save/todo"
          />
        </Dialog>
        <Snackbar
          open={this.state.openMessage}
          message="Задача успешно добавленна"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
