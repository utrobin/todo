import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import CircularProgress from 'material-ui/CircularProgress';
import Chip from 'material-ui/Chip';

import './blockFilter.scss';

const styles = {
  radioButton: {
    marginBottom: 5,
  },
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default class BlockFilter extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeSort = this.onChangeSort.bind(this);
    this.getActiveTag = this.getActiveTag.bind(this);
    this.onChangeShow = this.onChangeShow.bind(this);
    this.chooseTag = this.chooseTag.bind(this);
    this.getTags = this.getTags.bind(this);

    this.state = {
      loadingTags: true,
      tags: [],
      activeTags: []
    };
  }

  getTags() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `/api/get/tags`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) return;

      if (xhr.status != 200) {
        this.setState({ errorTags: true });
      } else {
        let data = JSON.parse(xhr.responseText);
        this.setState({
          tags: data,
          loadingTags: false
        });
      }
    }
  }

  componentWillMount() {
    this.getTags();
  }

  onChangeSort(e) {
    this.props.changeSort(e.target.value);
  }

  onChangeShow(e) {
    this.props.changeShow(e.target.value);
  }

  getActiveTag() {
    let activeTags = [];
    this.state.tags.forEach((el) => {
      if (el.active) {
        activeTags.push(el.title);
      }
    });
    this.props.changeTags(activeTags);
  }

  chooseTag = (i) => {
    let temp = this.state.tags;
    temp[i].active = !temp[i].active;
    this.setState({tags: temp}, this.getActiveTag);
  };

  render() {
    return (
      <div className="blockFilter">
        <div className="blockFilter__sort">
          <span className="blockFilter__span">Сортировать по:</span>
          <RadioButtonGroup
            name="sort"
            defaultSelected="dedline"
            onChange={this.onChangeSort}
          >
            <RadioButton
              value="dedline"
              label="Времени завершения"
              style={styles.radioButton}
            />
            <RadioButton
              value="alphabetically"
              label="Алфавиту"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        </div>
        <div className="blockFilter__tags">
          <span className="blockFilter__span">Популярные теги:</span>
          <div className="blockFilter__loading">
            <div className={this.state.loadingTags ? '' : 'blockFilter_none'}>
              <CircularProgress size={40} thickness={7} />
            </div>
          </div>
          <div style={styles.wrapper}>
            {
              this.state.tags.map((el, i) => {
                return (
                  <Chip
                    key={el.id}
                    backgroundColor={el.active? "rgb(0, 188, 212)" : "rgb(224, 224, 224)"}
                    labelColor={el.active? "#fff" : "#000"}
                    onTouchTap={ () => this.chooseTag(i) }
                    style={styles.chip}
                  >
                    {el.title}
                  </Chip>
              )})
            }
          </div>
        </div>
        <div className="blockFilter__show">
          <span className="blockFilter__span">Показать:</span>
          <RadioButtonGroup
            name="show"
            defaultSelected="all"
            onChange={this.onChangeShow}
          >
            <RadioButton
              value="complete"
              label="Выполненные"
              style={styles.radioButton}
            />
            <RadioButton
              value="uncomplete"
              label="Не выполненные"
              style={styles.radioButton}
            />
            <RadioButton
              value="all"
              label="Вcе"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        </div>
      </div>
    );
  }
}
