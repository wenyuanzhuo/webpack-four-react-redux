import React, { Component } from 'react'
import { Icon } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';


class UserLayout extends Component {
  render() {
    const { getRouteData } = this.props;
    console.log(getRouteData('UserLayout'))
    const Home = () => <div>home</div>;
    const WillMatch = () => <h3>Matched!</h3>;
    const NoMatch = ({ location }) => (
      <div>
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
      </div>
    );
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
        {/* <Switch>
          <Route path="/user/login"  exact component={Home} />
          <Route path="/user/register" exact component={WillMatch} />
        </Switch> */}
        <Switch>
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
        </Switch>
      </div>
    )
  }
}

export default UserLayout;
