import { cartActionTypes } from "./action-type/cartActionTypes";
import { cartActionInterface } from "./interface/cartActionInterface";
import { cartReducerInterface } from "./interface/cartReducerInterface";

export const initialState = {
  items: []
}

export const cartsReducer = (state: cartReducerInterface = initialState, action: cartActionInterface) => {
  switch (action.type) {
    case cartActionTypes.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload.product]
      };

    case cartActionTypes.REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item, itemIndex) => itemIndex !== action.payload.product_index)
      }

    case cartActionTypes.RESET_CART_ITEMS:
      return {
        ...state,
        items: []
      }

    default:
      return state
  }
};