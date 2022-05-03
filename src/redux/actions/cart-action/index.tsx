import { Dispatch } from "redux";
import { Cart } from "../../../models/Cart";
import { cartActionTypes } from "../../reducers/cart-reducer/action-type/cartActionTypes";
import { cartActionInterface } from "../../reducers/cart-reducer/interface/cartActionInterface";

export const _addProductToCartAction = (cart: Cart) => {
  return (dispatch: Dispatch<cartActionInterface>) => {
    dispatch({
      type: cartActionTypes.ADD_PRODUCT_TO_CART,
      payload: {
        product: cart
      }
    });
  };
};

export const _removeProductFromCartAction = (product_id: string, product_index: number) => {
  return (dispatch: Dispatch<cartActionInterface>) => {
    dispatch({
      type: cartActionTypes.REMOVE_PRODUCT_FROM_CART,
      payload: {
        product_id,
        product_index
      }
    });
  };
};

export const _resetCartAction = () => {
  return (dispatch: Dispatch<cartActionInterface>) => {
    dispatch({
      type: cartActionTypes.RESET_CART_ITEMS
    });
  };
};