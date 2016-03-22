import React, {PropTypes} from 'react';
import { Tag} from 'antd';

const ListItem = React.createClass({
  propTypes: {
    method: PropTypes.string,
    url: PropTypes.string,
  },

  render() {
    const {name, method, url} = this.props;

    return (<div style={{borderBottom: '1px solid #ccc'}}>
      <Tag>{method}</Tag>
      <span style={{padding: '0 5px'}}>{url}</span>
    </div>);
  },
});

export default ListItem;
