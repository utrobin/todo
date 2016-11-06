import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import styles from './styleForm';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this.addFields = this.addFields.bind(this);
    this._onChange = this._onChange.bind(this);

    this.state = {
      submit: false,
      error: "",
    };
  }

  componentWillMount() {
    this.addFields();
  }

  addFields() {
    let title = this.props.title || "";
    let descreption = this.props.descreption || "";
    let tags = this.props.tags || [];
    let dedline_date = this.props.dedline_date ;
    let dedline_time = this.props.dedline_time ;

    tags = tags.map(el => {
      return el.title;
    });

    let date = [];
    let temp1 = new Date();
    if (dedline_date !== undefined && dedline_date !== null) {
      date = dedline_date.split("-");
      temp1.setFullYear(date[0], date[1], date[2]);
    } else {
      temp1 = undefined;
    }

    let time = [];
    let temp2 = new Date();
    if (dedline_time !== undefined && dedline_time !== null) {
      time = dedline_time.split(":");
      temp2.setHours(time[0], time[1]);
    } else {
      temp2 = null;
    }

    this.setState({
      title,
      descreption,
      tags,
      dedline_date: temp1,
      dedline_time: temp2,
    });
  }

  addTask(fields) {
    this.props.resetData();
    this.props.loading();

    if (this.props.id !== undefined) {
      fields.id = this.props.id;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', this.props.url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(fields));
    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) return;

      if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText + ' Произошла ошибка');
      } else {
        this.props.getTasks();
      }
    }
  }

  _onChange(event) {
    if (event.target.value !== "") {
      this.setState({
        submit: true,
      })
    }
  }

  _onFocus() {
    this.setState({ error: "" })
  }

  _onBlur(event) {
    if (event.target.value === "") {
      this.setState({
        error: "Это поле обязательное",
        submit: false,
      })
    }
    else {
      this.setState({ submit: true })
    }
  }

  _onSubmit() {
    let elements = this.form.elements;

    const fields = {};

    Object.keys(elements).forEach((element) => {
      const name = elements[element].name;
      let value = elements[element].value;

      if (!name) {
        return;
      }

      if (name === 'tags') {
        value = value.split(/\s*,\s*/);
      }

      fields[name] = value;
    });

    this.addTask(fields);
    this.props.close("message");
  }

  render() {
    return (
      <form ref={(form) => this.form = form}>
        <TextField
          name="title"
          autoFocus={true}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          onChange={this._onChange}
          errorText={this.state.error}
          fullWidth={true}
          floatingLabelText="Заголовок*"
          defaultValue={this.state.title}
        />
        <TextField
          name="description"
          fullWidth={true}
          hintText="Описание"
          floatingLabelText="Описание"
          multiLine={true}
          rows={2}
          defaultValue={this.state.descreption}
        />
        <TextField
          name="tags"
          fullWidth={true}
          floatingLabelText="Введите теги через запятую"
          defaultValue={this.state.tags.join(', ')}
        />
        <DatePicker
          name="date"
          style={styles.margin}
          fullWidth={true}
          hintText="Дата окончания задачи"
          defaultDate={this.state.dedline_date}
        />
        <TimePicker
          name="time"
          style={styles.margin}
          format="24hr"
          fullWidth={true}
          hintText="Время окончания задачи"
          defaultTime={this.state.dedline_time}
        />
        <RaisedButton
          disabled={!this.state.submit}
          onTouchTap={this._onSubmit}
          label={this.props.nameButton}
          primary={true}
          style={styles.button}
        />
        <RaisedButton
          label="Закрыть"
          onTouchTap={this.props.close}
          style={styles.button}
        />
      </form>
    );
  }
}
