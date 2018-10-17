import React, { Component } from 'react';
import { Layout, Spin, Breadcrumb } from 'antd';
import { Switch, Route } from 'react-router-dom';
import SideBar from 'components/SideBar';
import Headers from 'components/Headers';
// import Footers from 'components/Footers';
const { Content } = Layout;

export default class BasicLayout extends Component {
  render() {
    const { getRouteData } = this.props;
    return  (
      <Layout className="basic-container">
        <SideBar {...this.props}/>
        <Layout>
          <Headers/>
          <div className="app-page">
            <Content style={{ margin: '24px 24px 0', height: '100%'}}>
              {
                <Switch>
                   {
                     getRouteData('BasicLayout').map(item => 
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
                </Switch>
              }
            </Content>
          </div>
        </Layout>
      </Layout>
    )
  }
}
