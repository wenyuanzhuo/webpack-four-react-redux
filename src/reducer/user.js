import { fromJS } from 'immutable';
import * as types from 'action/actionType'

const initState = fromJS({
  user: {},
})


export default function (state = initState, action) {
  switch(action.type) {
    case types.USER_LOGOUT: 
      return state.set('user', fromJS({}))
    default:
      return state
  }
}