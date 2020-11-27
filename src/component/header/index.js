import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth from '../../common/firebase/auth';

import { Button, Avatar, Layout, Menu, Dropdown, message, Badge } from 'antd';
import { LoginOutlined, SearchOutlined, BellOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

import UserInfo from '../user-info';

import './style.css';

let logout = async () => {
    console.log(1);
    await auth.logoutAccount();
    window.location.reload();
}

const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        {localStorage.email}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            isCandidate: false
        }
    }

    componentDidMount() {
        if (localStorage.uid) {
            this.setState({isLogin: true});
            if (localStorage.accounttype === '0') this.setState({isCandidate: false});
            else this.setState({isCandidate: true});
        } else { 
            this.setState({
                isLogin: false,
                isCandidate: false
            });
        }
    }
    returnHome() {
        window.open('/home', '_self');
    }

    openSignIn() {
        window.open('/login', '_self');
    }
    
    render() {
        return (
            <Layout className="layout">
                <Layout.Header style={{ color: 'white', display: 'flex', position: 'fixed', zIndex: 1, width: '100%', padding: '0', background: '#00255d', boxShadow: '0 2px 8px #505050' }}>
                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '50%'}}>
                        <span style={{margin: '12px', fontSize: '20pt'}}>
                            JobFinding
                        </span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '50%'}}>
                        <SearchOutlined style={{color: 'white', fontSize: '18pt', margin: '12px'}} />
                        <BellOutlined style={{color: 'white', fontSize: '18pt', margin: '12px'}} />
                        {this.state.isLogin && <Dropdown overlay={menu} size="large" placement="bottomRight" >
                            <Avatar size="medium" style={{margin: '12px'}} icon={<UserOutlined />} />
                        </Dropdown>}
                        {!this.state.isLogin && <Button style={{margin: '12px'}} icon={<LoginOutlined />} onClick={this.openSignIn}>Login</Button>}
                    </div>
                </Layout.Header>
            </Layout>
        );
    }
}

export default withRouter(Header);