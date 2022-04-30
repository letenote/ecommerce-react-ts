import { userActionTypes } from '../action-types/userActionTypes';
import { Product } from '../../../../models/Product';

interface userLoginInterface {
  type: userActionTypes.USER_LOGIN,
  payload: {
    email: string,
    password: string
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

interface userAddItemToCartInterface {
  type: userActionTypes.USER_ADD_ITEM_TO_CART,
  payload: Product
}

export type userActionInterface = userLoginInterface | userLogoutInterface | userSignupInterface | userAddItemToCartInterface