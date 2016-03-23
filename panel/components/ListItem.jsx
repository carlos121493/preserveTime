import React, {PropTypes} from 'react';
import { Tag} from 'antd';

const ListItem = React.createClass({
  propTypes: {
    method: PropTypes.string,
    url: PropTypes.string,
    content: PropTypes.string,
  },

  getInitialState() {
    return {
      showDetail: false,
    };
  },

  toggle() {
    const {showDetail} = this.state;
    this.setState({
      showDetail: !showDetail,
    });
  },

  render() {
    const {method, url, content} = this.props;

    return (<div className="web-list-item"><div className="web-list-item-title" onClick={this.toggle}>
        <Tag color={content && content.status == 200 ? 'green' : 'blue' }>{method}</Tag>
        <span style={{padding: '0 5px'}}>{url}</span>
      </div>
      {this.state.showDetail ? <div className="web-list-item-content">{JSON.stringify(content)}</div> : null}
    </div>);
  },
});

export default ListItem;
