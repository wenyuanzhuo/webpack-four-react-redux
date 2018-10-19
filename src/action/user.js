import * as types from 'action/actionType';

export function logout() {
  return { 
    type: types.USER_LOGOUT
  }
}


export function getCurrentUser() {
  return (dispatch) => {
    dispatch({ type: types.GOT_CURRENT_USER_STATS})
    //return ajax promise...
    //mock
    return Promise.resolve()
      .then(() => {
        dispatch({
          type: types.GOT_CURRENT_USER_SUCC,
          user: {
            username: 'admin',
            password: 888888
          }
        })
        return {
          username: 'admin',
          password: 888888
        }
      })
      .catch(() => {
        return dispatch({
          type: types.GOT_CURRENT_USER_FAIL,
          user: {}
        })
      })
    }
  
}