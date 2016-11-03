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
    this._onChange = this._onChange.bind(this);

    this.state = {
      submit: false,
      error: ""
    };
  }

  componentWillMount() {
    this.addFields();
  }

  addFields() {
    let title = this.props.title || "";
    let descreption = this.props.descreption || "";
    let tags = this.props.tags || [];
    let dedline_date = this.dedline_date ;
    let dedline_time = this.dedline_date ;

    tags = tags.map(el => {
      return el.title;
    });

    this.setState({
      title,
      descreption,
      tags,
      dedline_date,
      dedline_time
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

    this.props.close();
    this.addTask(fields);
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
        />
        <TimePicker
          name="time"
          style={styles.margin}
          format="24hr"
          fullWidth={true}
          hintText="Время окончания задачи"
        />
        <RaisedButton
          disabled={!this.state.submit}
          onTouchTap={this._onSubmit}
          label="Добавить"
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
