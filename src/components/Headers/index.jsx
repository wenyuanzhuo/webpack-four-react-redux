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
    // 退出登录 解决方案  1.store middleware 捕获action history change
    const { logout, history } = this.props
    if (key === 'logout') {
      logout()
      history.push('/user/login')
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