import { productActionTypes } from "../action-types/productActionTypes"
import { Product } from "../../../../models/Product"

interface resolveAddFavoriteToProduct {
  type: productActionTypes.ADD_FAVORITE_PRODUCTS_WITH_RESOLVE,
  payload: {
    items: Array<Product>,
    status: number,
    message: string
  }
};

interface rejectAddFavoriteToProduct {
  type: productActionTypes.ADD_FAVORITE_PRODUCTS_WITH_REJECT,
  payload: {
    status: number,
    message: string
  }
};

interface addProductsToStores {
  type: productActionTypes.ADD_PRODUCTS_TO_STORES,
  payload: {
    items: Array<Product>
  }
}

export type productActionInterface = resolveAddFavoriteToProduct | rejectAddFavoriteToProduct | addProductsToStores