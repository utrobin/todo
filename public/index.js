import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import TodoList from './todoList/todoList'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import './css/reset.css';
import './css/main.scss';

const App = () => (
  <MuiThemeProvider>
    <TodoList />
  </MuiThemeProvider>
);

render(
  <App />,
  document.querySelector('.content')
);