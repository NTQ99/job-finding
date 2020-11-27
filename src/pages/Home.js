import React from "react";
import { Tabs } from 'antd';
import Header from '../component/header';

import { Button } from 'antd';
import { FileAddOutlined, SearchOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
function Home(props) {
  return (
    <div>
      <Header>
        <SearchOutlined style={{color: 'white', fontSize: '18pt', margin: '12px'}} />
        {localStorage.accounttype === '0' && <Button style={{margin: '12px'}} icon={<FileAddOutlined />}>
            Add CV
        </Button>}
      </Header>
    </div>
  );
}

export default Home;
