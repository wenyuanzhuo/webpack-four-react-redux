import React, { Component } from 'react';
import { Layout, Spin, Breadcrumb } from 'antd';
import { Switch, Route, withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import SideBar from 'common/SideBar';
import Headers from 'common/Headers';
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
    console.log(getRouteData('BasicLayout'), renderRoutes(getRouteData('BasicLayout')))
    return  (
      <Layout className="basic-container">
        <SideBar {...this.props}/>
        <Layout>
          <Headers 
            {...this.props}
          />
          <div className="app-page" style={{ height: '100%' }}>
            <Content style={{ margin: '0px 24px 0', height: '100%'}}>
              {
                renderRoutes(getRouteData('BasicLayout'))
                // <Switch>
                //    {
                //      getRouteData('BasicLayout').map(item => 
                //       (
                //         <Route
                //           exact={item.exact}
                //           key={item.path}
                //           path={item.path}
                //           component={item.component}
                //         />
                //       )              
                //     )
                //    }
                // </Switch>
              }
            </Content>
          </div>
        </Layout>
      </Layout>
    )
  }
}

export default BasicLayout