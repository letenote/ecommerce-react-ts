import {
  _rejectAddFavoriteToProduct, _rejectAddProductsToStores,
  _resolveAddFavoriteToProduct, _resolveAddProductsToStores,
  _resolveAddProductToDetail, _rejectAddProductToDetail
} from "..";

export type _resolveAddFavoriteToProductDispatchType = typeof _resolveAddFavoriteToProduct;
export type _rejectAddFavoriteToProductDispatchType = typeof _rejectAddFavoriteToProduct;
export type _resolveAddProductsToStoresDispatchType = typeof _resolveAddProductsToStores;
export type _rejectAddProductsToStoresDispatchType = typeof _rejectAddProductsToStores;
export type _resolveAddProductToDetailDispatchType = typeof _resolveAddProductToDetail;
export type _rejectAddProductToDetailDispatchType = typeof _rejectAddProductToDetail;


export type _productActionDispatchTypes = ReturnType<
  | typeof _resolveAddFavoriteToProduct
  | typeof _rejectAddFavoriteToProduct
  | typeof _resolveAddProductsToStores
  | typeof _rejectAddProductsToStores
  | typeof _resolveAddProductToDetail
  | typeof _rejectAddProductToDetail
>;