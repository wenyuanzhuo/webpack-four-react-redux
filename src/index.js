import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
// import 'normalize.css'
import 'styles/index.scss'
import App from 'container/App'

const render = App => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App/>
      </ConnectedRouter>
    </Provider>,
    document.getElementById("app")
  );
}
render(App)

if (module.hot) {
  module.hot.accept('./container/App', () => {
    render(App)
  })
}