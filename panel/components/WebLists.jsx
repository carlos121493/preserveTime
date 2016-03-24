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

  getLinks() {
    const {questions} = this.state;
    const self = this;
    chrome.devtools.network.getHAR(function(result) {
      const entries = result.entries;
      for (let i = 0; i < entries.length; ++i) {
        // questions.push({
        //   url: 'cc',
        //   method: 'cc',
        //   content: entries[i],
        // })
        // alert(JSON.stringify(entries[i]));
      }

      chrome.devtools.network.onRequestFinished.addListener((item) => {
        const itemInfo = {...item};
        const req = itemInfo.request;
        item.getContent(content => {
          const isAjax = req.headers.find(head => {return head.name === "X-Requested-With";});
          if(isAjax) {
            questions.push({
              url: req.url,
              method: req.method,
              content: content,
            });
            self.setState({questions});
          }
        });
        chrome.runtime.sendMessage(chrome.devtools.tabId, {"hello": "world"});
      });
    });
  },

  addConnect() {
    const {questions} = this.state;
    // this.connect = chrome.runtime.connect({page: 'devtools-page'});
    // this.connect.onMessage.addListener(function (message) {
    //   questions.push({
    //     url: message,
    //     method: message,
    //     content: message,
    //   })
    // });
    // chrome.runtime.sendMessage({
    //   tabId: chrome.devtools.inspectedWindow.tabId,
    //   scriptToInject: "content_script.js",
    // });
  },

  getInfo(){
    const {questions} = this.state;
    this.connect.onMessage.addListener((message) => {
      questions.push({
        url: message,
        method: message,
        content: message,
      });
    });
  },

  reload() {
    chrome.devtools.inspectedWindow.reload({ignoreCache: true});
  },

  clear() {
    this.setState({questions: []});
  },

  componentDidMount() {
    this.getLinks();
    this.addConnect();
    this.getInfo();
  },

  render() {
    const {questions} = this.state;
    const ListInfo = questions.map(item => {
      return <ListItem {...item} />;
    })
    return (<div>
      <div className="preserve-btn-group"><Button onClick={this.reload}>reload</Button><Button onClick={this.clear}>clear</Button></div>
      <div className="preserve-container">{ListInfo}</div>
    </div>);
  },
});

export default WebLists;
