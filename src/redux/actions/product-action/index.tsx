import { Dispatch } from "redux";
import { productActionTypes } from "../../reducers/product-reducer/action-types/productActionTypes";
import { Product } from "../../reducers/product-reducer/interface/Product";
import { productActionInterface } from "../../reducers/product-reducer/interface/productActionInterface";

export const _addFavoriteToProduct = (items: Array<Product>) => {
  return (dispatch: Dispatch<productActionInterface>) => {
    dispatch({
      type: productActionTypes.ADD_FAVORITE_PRODUCTS,
      payload: {
        items
      }
    });
  };
};