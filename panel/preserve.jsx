import React from 'react';
import { render } from 'react-dom';
import WebLists from './components/WebLists';
import 'antd/style/index.less';
import './preserve.less';

render(<WebLists />, document.getElementById('react_container'));
