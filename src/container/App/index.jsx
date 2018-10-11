import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';

export default class App extends Component {
  render() {
    return (
      <div className="container"> { /* your usual react-router v4 routing 所以动态渲染path render*/ }
        <header className="header"></header>
        <Switch> 
          <Route path="/" render={() => (<div>Match</div>)} />
          <Route path="/miss" render={() => (<div>Miss</div>)} />
        </Switch>
        <footer className="footer">footer</footer>
      </div>
    )
  }
}