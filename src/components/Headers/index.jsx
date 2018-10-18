import React from 'react';
import { Layout, Icon, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
const { Header } = Layout;

export default class Headers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      loginOutPath: '',
    }
  }
  handleClick = ({ key }) => {
    // 退出登录 解决方案  
    // 1.store middleware 捕获action history change
    // 2.直接操作 history  push(location)
    const { logout, history } = this.props
    if (key === 'logout') { 
      //很多问题  action任何操作应该是异步
      //push到登录页 应该把history、用户信息、状态清空
      logout()
      // history.push('/user/login')
    }
  }

  render() {
    const { collapsed, loginOutPath } = this.state;
    const menu = (
      <Menu selectedKeys={[]} onClick={this.handleClick}>
        <Menu.Item><Icon type="user" />个人中心</Menu.Item>
        <Menu.Item><Icon type="setting" />设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
      </Menu>
    )

    return (
      <Header className="basic-container-headers" style={{ background: '#fff', padding: 0 }}>
        <Dropdown overlay={menu}>
          <Icon
            className="icon"
            type="setting"
          />
        </Dropdown>
      </Header>
    )
  }
}