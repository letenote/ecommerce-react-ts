import { Cart } from "../../../../models/Cart"
import { cartActionTypes } from "../action-type/cartActionTypes"

interface addProductToCartInterface {
  type: cartActionTypes.ADD_PRODUCT_TO_CART,
  payload: {
    product: Cart
  }
};

interface removeProductfromCartInterface {
  type: cartActionTypes.REMOVE_PRODUCT_FROM_CART,
  payload: {
    product_id: string,
    product_index: number
  }
};

interface resetCartItemInterface {
  type: cartActionTypes.RESET_CART_ITEMS
}

export type cartActionInterface = addProductToCartInterface | removeProductfromCartInterface | resetCartItemInterface