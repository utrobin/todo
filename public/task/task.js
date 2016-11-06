import React from 'react';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import Form from '../form/form';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Settings from 'material-ui/svg-icons/action/settings';

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

    this.props.handleTouchTap("Задача успешно удалена");
  }

  handleChangeSingle = (event, value) => {
    switch(value) {
      case "1":
        this.onDelete();

      case "2":
        this.handleOpen();
    }
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = message => {
    this.setState({
      open: false,
    });
    if (message === "message") {
      this.props.handleTouchTap("Задача успешно изменена");
    }
  };

  render() {
    const toolsBlock = (
      <div className="task__tools">
        <IconMenu
          iconButtonElement={
            <IconButton
              style={{
                padding: 0,
                width: 20,
                height: 20,
                marginTop: "-5px",
                marginRight: "-8px"
              }}
              iconStyle={{
                width: 20,
                height: 20
              }}
            >
              <Settings hoverColor={"rgb(0, 188, 212)"} />
            </IconButton>}
          onChange={this.handleChangeSingle}
        >
          <MenuItem value="1" primaryText="Удалить" />
          <MenuItem value="2" primaryText="Изменить" />
        </IconMenu>
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
            dedline_date={this.props.dedline_date}
            dedline_time={this.props.dedline_time}
            id={this.props.id}
            nameButton="Изменить"
          />
        </Dialog>
      </div>
    );

    let dedlineBlock = "";
      if (this.props.dedline_date !== null || this.props.dedline_time !== null) {
        dedlineBlock = (
          <div className="task__dedline">
            Выполнить до:
            <data> {this.props.dedline_date} </data>
            <time>{this.props.dedline_time}</time>
            {toolsBlock}
          </div>
        )
      } else {
        dedlineBlock = (
          <div className="task__dedline">
            {toolsBlock}
          </div>
        )
      }

    return (
    <Paper zDepth={1}>
      <div className="task">
        <Checkbox
          style={{float: "left", padding: "0 5 5 0", display: "block", width: "auto", transform: "scale(1.5)", marginRight: 15}}
          labelStyle={{display: "none"}}
          onCheck={this.onCheck}
          checked={this.state.completed}
          iconStyle={{marginRight: 0}}
        />
        {dedlineBlock}
        <h2 className="task__title">{this.props.title}</h2>
        <p className="task__descreption">{this.props.description}</p>
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
