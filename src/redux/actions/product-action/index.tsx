import { Dispatch } from "redux";
import { productActionTypes } from "../../reducers/product-reducer/action-types/productActionTypes";
import { Product } from "../../../models/Product";
import { productActionInterface } from "../../reducers/product-reducer/interface/productActionInterface";
import { FetchStatus } from "../../../models/FetchStatus";

export const _resolveAddFavoriteToProduct = (items: Array<Product>) => {
  return (dispatch: Dispatch<productActionInterface>) => {
    dispatch({
      type: productActionTypes.ADD_FAVORITE_PRODUCTS_WITH_RESOLVE,
      payload: {
        items,
        status: 200,
        message: "ok"
      }
    });
  };
};

export const _rejectAddFavoriteToProduct = (fetchStatus: FetchStatus) => {
  return (dispatch: Dispatch<productActionInterface>) => {
    dispatch({
      type: productActionTypes.ADD_FAVORITE_PRODUCTS_WITH_REJECT,
      payload: {
        status: fetchStatus.status,
        message: fetchStatus.message
      }
    });
  };
};

export const _resolveAddProductsToStores = (items: Array<Product>) => {
  return (dispatch: Dispatch<productActionInterface>) => {
    dispatch({
      type: productActionTypes.ADD_PRODUCTS_TO_STORE_WITH_RESOLVE,
      payload: {
        items,
        status: 200,
        message: "ok"
      }
    });
  };
};

export const _rejectAddProductsToStores = (fetchStatus: FetchStatus) => {
  return (dispatch: Dispatch<productActionInterface>) => {
    dispatch({
      type: productActionTypes.ADD_PRODUCTS_TO_STORE_WITH_REJECT,
      payload: {
        status: fetchStatus.status,
        message: fetchStatus.message
      }
    });
  };
};

export const _resetProducts = () => {
  return (dispatch: Dispatch<productActionInterface>) => {
    dispatch({
      type: productActionTypes.RESET_VALUE_PRODUCTS
    });
  };
};