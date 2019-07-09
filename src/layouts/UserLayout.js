import React, { Component } from 'react'
import { Icon } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config'

class UserLayout extends Component {
  render() {
    const { getRouteData } = this.props;

    return (
      <div className="user-container">
        <div className="top">
          <div className="header">
            <Link to="/">
              <span className="title">Ant 设计首页</span>
            </Link>
          </div>
          <div className="desc">react 16.5 webpack 4.0 redux react-router 4.0</div>
        </div>
        {
          renderRoutes(getRouteData('UserLayout'))
        }
        {/* <Switch>
          {
            getRouteData('UserLayout').map(item => 
              (
                <Route
                  exact={item.exact}
                  key={item.path}
                  path={item.path}
                  component={item.component}
                />
              )              
            )
          }
        </Switch> */}
      </div>
    )
  }
}

export default UserLayout;
