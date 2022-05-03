import { bindActionCreators } from "redux";
import { products } from "../../../constant/response/products";
import { store } from "../../store";
import * as productActionCreators from './index';

const {
  _resetProducts,
  _resolveAddFavoriteToProduct,
  _rejectAddFavoriteToProduct,
  _resolveAddProductsToStores,
  _rejectAddProductsToStores,
  _resolveAddProductToDetail,
  _rejectAddProductToDetail
} = bindActionCreators(
  productActionCreators,
  store.dispatch
);

describe("__REDUX/ACTION/product-action", () => {
  beforeEach(() => _resetProducts());

  test("_ACTION: _resolveAddFavoriteToProduct if get 1 product", async () => {
    let getStoreReducerBeforeSetProduct = store.getState().products.favorite;
    expect(getStoreReducerBeforeSetProduct.loading).toEqual(true);
    expect(getStoreReducerBeforeSetProduct.fetch.status).toEqual(0);
    expect(getStoreReducerBeforeSetProduct.list.length).toEqual(0);

    _resolveAddFavoriteToProduct([products[0]]);
    let getStoreReducerAfterSetProduct = store.getState().products.favorite;
    expect(getStoreReducerAfterSetProduct.loading).toEqual(false);
    expect(getStoreReducerAfterSetProduct.fetch.status).toEqual(200);
    expect(getStoreReducerAfterSetProduct.list.length).toEqual(1);
  });

  test("_ACTION: _resolveAddFavoriteToProduct if get 4 product", async () => {
    let getStoreReducerBeforeSetProduct = store.getState().products.favorite;
    expect(getStoreReducerBeforeSetProduct.loading).toEqual(true);
    expect(getStoreReducerBeforeSetProduct.fetch.status).toEqual(0);
    expect(getStoreReducerBeforeSetProduct.list.length).toEqual(0);

    _resolveAddFavoriteToProduct(products);
    let getStoreReducerAfterSetProduct = store.getState().products.favorite;
    expect(getStoreReducerAfterSetProduct.loading).toEqual(false);
    expect(getStoreReducerAfterSetProduct.fetch.status).toEqual(200);
    expect(getStoreReducerAfterSetProduct.list.length).toEqual(4);
  });

  test("_ACTION: _rejectAddFavoriteToProduct", () => {
    const rejectExpected = { status: 404, code: "Bad Request", message: "fetch Bad Request" }
    _rejectAddFavoriteToProduct(rejectExpected);
    let getStoreReducerAfterSetProduct = store.getState().products.favorite;
    expect(getStoreReducerAfterSetProduct.loading).toEqual(false);
    expect(getStoreReducerAfterSetProduct.fetch.status).toEqual(rejectExpected.status);
    expect(getStoreReducerAfterSetProduct.list.length).toEqual(0);
    expect(getStoreReducerAfterSetProduct.fetch.message).toEqual(rejectExpected.message);
  })

  test("_ACTION: _resolveAddProductsToStores if get 1 product", async () => {
    let getStoreReducerBeforeSetProduct = store.getState().products.stores;
    expect(getStoreReducerBeforeSetProduct.loading).toEqual(true);
    expect(getStoreReducerBeforeSetProduct.fetch.status).toEqual(0);
    expect(getStoreReducerBeforeSetProduct.list.length).toEqual(0);

    _resolveAddProductsToStores([products[0]]);
    let getStoreReducerAfterSetProduct = store.getState().products.stores;
    expect(getStoreReducerAfterSetProduct.loading).toEqual(false);
    expect(getStoreReducerAfterSetProduct.fetch.status).toEqual(200);
    expect(getStoreReducerAfterSetProduct.list.length).toEqual(1);
  });

  test("_ACTION: _resolveAddProductsToStores if get 8 product", async () => {
    let getStoreReducerBeforeSetProduct = store.getState().products.stores;
    expect(getStoreReducerBeforeSetProduct.loading).toEqual(true);
    expect(getStoreReducerBeforeSetProduct.fetch.status).toEqual(0);
    expect(getStoreReducerBeforeSetProduct.list.length).toEqual(0);

    _resolveAddProductsToStores([...products, ...products]);
    let getStoreReducerAfterSetProduct = store.getState().products.stores;
    expect(getStoreReducerAfterSetProduct.loading).toEqual(false);
    expect(getStoreReducerAfterSetProduct.fetch.status).toEqual(200);
    expect(getStoreReducerAfterSetProduct.list.length).toEqual(8);
  });

  test("_ACTION: _rejectAddProductsToStores", () => {
    const rejectExpected = { status: 404, code: "Bad Request", message: "fetch Bad Request" }
    _rejectAddProductsToStores(rejectExpected);
    let getStoreReducerAfterSetProduct = store.getState().products.stores;
    expect(getStoreReducerAfterSetProduct.loading).toEqual(false);
    expect(getStoreReducerAfterSetProduct.fetch.status).toEqual(rejectExpected.status);
    expect(getStoreReducerAfterSetProduct.list.length).toEqual(0);
    expect(getStoreReducerAfterSetProduct.fetch.message).toEqual(rejectExpected.message);
  })

  test("_ACTION: _resolveAddProductToDetail if get not found product", async () => {
    let getStoreReducerBeforeSetProduct = store.getState().products.detail;
    expect(getStoreReducerBeforeSetProduct.loading).toEqual(true);
    expect(getStoreReducerBeforeSetProduct.fetch.status).toEqual(0);
    expect(getStoreReducerBeforeSetProduct.data).toEqual(null);

    _resolveAddProductToDetail(null);
    let getStoreReducerAfterSetProduct = store.getState().products.detail;
    expect(getStoreReducerAfterSetProduct.loading).toEqual(false);
    expect(getStoreReducerAfterSetProduct.fetch.status).toEqual(200);
    expect(getStoreReducerAfterSetProduct.data).toEqual(null);
  });

  test("_ACTION: _resolveAddProductToDetail if get product", async () => {
    let getStoreReducerBeforeSetProduct = store.getState().products.detail;
    expect(getStoreReducerBeforeSetProduct.loading).toEqual(true);
    expect(getStoreReducerBeforeSetProduct.fetch.status).toEqual(0);
    expect(getStoreReducerBeforeSetProduct.data).toEqual(null);

    _resolveAddProductToDetail(products[0]);
    let getStoreReducerAfterSetProduct = store.getState().products.detail;
    expect(getStoreReducerAfterSetProduct.loading).toEqual(false);
    expect(getStoreReducerAfterSetProduct.fetch.status).toEqual(200);
    expect(getStoreReducerAfterSetProduct.data).toEqual(products[0]);
  });

  test("_ACTION: _rejectAddProductToDetail", () => {
    const rejectExpected = { status: 404, code: "Bad Request", message: "fetch Bad Request" }
    _rejectAddProductToDetail(rejectExpected);
    let getStoreReducerAfterSetProduct = store.getState().products.detail;
    expect(getStoreReducerAfterSetProduct.loading).toEqual(false);
    expect(getStoreReducerAfterSetProduct.fetch.status).toEqual(rejectExpected.status);
    expect(getStoreReducerAfterSetProduct.data).toEqual(null);
    expect(getStoreReducerAfterSetProduct.fetch.message).toEqual(rejectExpected.message);
  })
});