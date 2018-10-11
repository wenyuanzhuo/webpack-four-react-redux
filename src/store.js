import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createLogger }  from 'redux-logger'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import rootReducer from './reducer'
import { Iterable } from 'immutable'
const history = createBrowserHistory()
const middlewares = [thunk]

const tojsTransformer = state => Object.keys(state).reduce((result, key) => {
  result[key] = Iterable.isIterable(state[key]) ? state[key].toJS() : state[key]
  return result;
}, {})
const logger = createLogger({
  collapsed: true,
  diff: true,
  timestamp: true,
  stateTransformer: tojsTransformer,//reducer Map {...}
  actionTransformer: tojsTransformer,
})

middlewares.push(logger)


middlewares.push(routerMiddleware(history))

const store = createStore(
  connectRouter(history)(rootReducer), // new root reducer with router state
  compose(
    applyMiddleware(
      ...middlewares, // for dispatching history actions
    ),
  ),
)

export default store;
export { history }