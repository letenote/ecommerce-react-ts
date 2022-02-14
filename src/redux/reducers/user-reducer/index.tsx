import { userReducerInterface } from './interfaces/userReducerInterface';
import { userActionInterface } from './interfaces/userActionInterface';
export const initialState = {
  isAuthentication: false,
  carts: []
}

export const userReducer = (state: userReducerInterface = initialState, action: userActionInterface) => {
  switch (action.type) {
    default:
      return state
  }
};