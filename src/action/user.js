import * as types from 'action/actionType';

export function logout() {
  return { 
    type: types.USER_LOGOUT
  }
}