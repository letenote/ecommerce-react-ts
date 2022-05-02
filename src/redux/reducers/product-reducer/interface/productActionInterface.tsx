import { productActionTypes } from "../action-types/productActionTypes"
import { Product } from "../../../../models/Product"

interface resolveAddFavoriteToProduct {
  type: productActionTypes.ADD_FAVORITE_PRODUCTS_WITH_RESOLVE,
  payload: {
    items: Array<Product>,
    status: number,
    code: string,
    message: string
  }
};

interface rejectAddFavoriteToProduct {
  type: productActionTypes.ADD_FAVORITE_PRODUCTS_WITH_REJECT,
  payload: {
    status: number,
    code: string,
    message: string
  }
};

interface resolveAddProductsToStores {
  type: productActionTypes.ADD_PRODUCTS_TO_STORE_WITH_RESOLVE,
  payload: {
    items: Array<Product>,
    status: number,
    code: string,
    message: string
  }
}

interface rejectAddProductsToStores {
  type: productActionTypes.ADD_PRODUCTS_TO_STORE_WITH_REJECT,
  payload: {
    status: number,
    code: string,
    message: string
  }
};

interface resolveAddProductToDetail {
  type: productActionTypes.ADD_PRODUCT_TO_DETAIL_WITH_RESOLVE,
  payload: {
    product: Product,
    status: number,
    code: string,
    message: string
  }
};
interface rejectAddProductToDetail {
  type: productActionTypes.ADD_PRODUCT_TO_DETAIL_WITH_REJECT,
  payload: {
    status: number,
    code: string,
    message: string
  }
};

interface resetProducts {
  type: productActionTypes.RESET_VALUE_PRODUCTS
}

export type productActionInterface = resolveAddFavoriteToProduct
  | rejectAddFavoriteToProduct
  | resolveAddProductsToStores
  | rejectAddProductsToStores
  | resolveAddProductToDetail
  | rejectAddProductToDetail
  | resetProducts