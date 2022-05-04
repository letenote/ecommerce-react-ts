import { userActionTypes } from '../action-types/userActionTypes';
import { Product } from '../../../../models/Product';

interface rejectUserLoginInterface {
  type: userActionTypes.USER_LOGIN_WITH_REJECT,
  payload: {
    status: number,
    code: string,
    message: string
  }
}

interface resolveUserLoginInterface {
  type: userActionTypes.USER_LOGIN_WITH_RESOLVE,
  payload: {
    name: string,
    avatar: string,
    status: number,
    code: string,
    message: string
  }
}

interface userLogoutInterface {
  type: userActionTypes.USER_LOGOUT
}

interface userSignupInterface {
  type: userActionTypes.USER_SIGNUP,
  payload: {
    email: string,
    password: string
  }
}

export type userActionInterface = resolveUserLoginInterface | rejectUserLoginInterface | userLogoutInterface | userSignupInterface 