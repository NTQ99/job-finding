import React, { Component } from "react";
import Header from '../../component/header';

import { Button, Layout } from 'antd';
import { FileAddOutlined, SearchOutlined } from '@ant-design/icons';
import './index.css';

const { Content } = Layout;

class Home extends Component {
  render() {
    return (
      <div>
        <Header>
          <SearchOutlined style={{color: 'white', fontSize: '18pt', margin: '12px'}} />
          {localStorage.accounttype === '0' && <Button style={{margin: '12px'}} icon={<FileAddOutlined />}>
              Add CV
          </Button>}
        </Header>
        <Content>
          <div className="site-layout-content">Content</div>
        </Content>
      </div>
    );
  }
}

export default Home;
