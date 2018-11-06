import React from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';
import logo from 'assets/logo.svg';
import { getNavData } from 'common/nav'
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.menus = props.getNavData.filter(item => item.layout !== 'UserLayout').reduce((arr, current) => arr.concat(current.children),[])
    this.state = {
    }
  }
  componentDidMount() {
  }

  getCurrentMenuSelectKeys(){
    const { location: { pathname } } = this.props
    // "/".split("/") = ["", ""]
    const keys = pathname.split('/').filter(item => item !== '/').slice(1);
    if (keys.length === 1 && keys[0] === '') {
      return [this.menus[0].path];
    }
    return keys;
  }
  getCurrentOpenKeysNav(){
    const { location: { pathname } } = this.props
    const arr = pathname.split('/').filter(item => item !== '/')
    if(arr.length >= 2) {
      return [arr[arr.length - 2]]
    }
    return [this.menus[0].path]
  }
  getNavMenuItem(menuData, parentPath = '') {
    if(!menuData) {
      return []
    }
    return menuData.map((item) => {
      if (!item.name) {
        return null
      }
      let itemPath
      //item.path 可能是 http https 在这不考虑
      if (!/^(http|https):\/\//.test(item.path)) {
        itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/')
      } else {
        itemPath = item.path
      }
      console.log(itemPath)
      if(item && item.children && item.children.some(child => child.name )) {
        return (
          <SubMenu
            title={
              item.icon ?
                <span>
                  <Icon type={item.icon}/>
                  <span>{item.name}</span>
                </span> 
              : item.name
            }
            key={item.key || item.path}
          >
            {this.getNavMenuItem(item.children, itemPath)}
          </SubMenu>
        )
      }
      const icon = item.icon && <Icon type={item.icon} />;
      return (
        <Menu.Item key={item.path}>
          <Link 
            to={itemPath}
          >
            {icon}<span>{item.name}</span>
          </Link>
        </Menu.Item>
      )
    })
  }
  render() {
     console.log(3333, this.props.location)
    return (
      <div className="basic-container-sidebar">
        <Sider style={{ height: '100%'}}>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo"/>
              <h1>video++</h1>
            </Link>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={this.getCurrentOpenKeysNav()}
            selectedKeys={this.getCurrentMenuSelectKeys()}
          >
          {
            this.getNavMenuItem(this.menus)
          }
          </Menu>
        </Sider>
      </div>
    )
  }
}