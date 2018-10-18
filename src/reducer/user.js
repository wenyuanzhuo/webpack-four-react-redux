import { fromJS } from 'immutable';
import * as types from 'action/actionType'

const initState = fromJS({
  user: {
    username: 'Aaron',
    password: 123456,
  },
})


export default function (state = initState, action) {
  switch(action.type) {
    case types.USER_LOGOUT: 
      return state.set('user', fromJS({}))
    case types.GOT_CURRENT_USER_STATS:
      return state.set('getUserState', 'pending')
    case types.GOT_CURRENT_USER_SUCC:
      return state.set('getUserState', 'success')
        .set('user', fromJS(action.user))
    case types.GOT_CURRENT_USER_FAIL:
      return state.set('getUserState', 'fail')
        .set('user', fromJS({}))
    default:
      return state
  }
}