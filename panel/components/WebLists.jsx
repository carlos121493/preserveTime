import React from 'react';
import {Button} from 'antd';
import ListItem from './ListItem';

const WebLists = React.createClass({
  getInitialState() {
    return {
      entries: [],
      questions: [],
    };
  },

  componentDidMount() {
    const {questions} = this.state;
    const self = this;
    chrome.devtools.network.getHAR(function(result) {
      const entries = result.entries;
      for (let i = 0; i < entries.length; ++i) {
        // alert(JSON.stringify(entries[i]));
      }

      chrome.devtools.network.onRequestFinished.addListener((item) => {
        const itemInfo = {...item};
        const req = itemInfo.request;
        questions.push({
          url: req.url,
          method: req.method,
          content: JSON.stringify(item.response),
        })
        self.setState({questions});
        chrome.runtime.sendMessage(chrome.devtools.tabId, {"hello": "world"});
      });
    });
  },

  render() {
    const {questions} = this.state;
    const ListInfo = questions.map(item => {
      return <ListItem {...item} />;
    })
    return (<div>{ListInfo}<Button>ceshi</Button></div>);
  },
});

export default WebLists;
