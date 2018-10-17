import React, { Component } from 'react';
import { Layout, Spin, Breadcrumb } from 'antd';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import SideBar from 'components/SideBar';
import Headers from 'components/Headers';
import { logout }  from 'action/user';
const { Content } = Layout;

const mapStateToProps = (state) => {
  return {
    user: state.user.get('user')
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}
@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class BasicLayout extends Component {
  render() {
    const { getRouteData, logout, user } = this.props;
    return  (
      <Layout className="basic-container">
        <SideBar {...this.props}/>
        <Layout>
          <Headers 
            {...this.props}
          />
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

export default BasicLayout