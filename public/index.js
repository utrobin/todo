import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Todo from './todo/todo'

import './css/reset.css';
import './css/fonts.css';
import './css/main.scss';

render(
<Todo />,
  document.querySelector('.content')
);