import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';
import { getNavData } from 'common/nav';
import { getLayout, getRouteData } from 'routes'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getNavData,
      getRouteData: (path) => {
        return getRouteData(getNavData, path)
      }
    }
  }
  render() {
    const { getNavData } = this.state;
    const UserLayout = getLayout(getNavData, 'UserLayout').component;
    const BasicLayout = getLayout(getNavData, 'BasicLayout').component;
    return (
      <Switch>
        <Route path="/user" render={(props) => <UserLayout {...props} {...this.state}/>} />
        <Route path="/" render={(props) => <BasicLayout {...props} {...this.state}/>} />
      </Switch>
    )
  }
}