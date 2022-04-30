import { productActionTypes } from "../action-types/productActionTypes"
import { Product } from "./Product"

interface addFavoriteToProduct {
  type: productActionTypes.ADD_FAVORITE_PRODUCTS,
  payload: {
    items: Array<Product>
  }
};

interface addProductsToStores {
  type: productActionTypes.ADD_PRODUCTS_TO_STORES,
  payload: {
    items: Array<Product>
  }
}

export type productActionInterface = addFavoriteToProduct | addProductsToStores