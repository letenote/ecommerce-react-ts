import { Product } from "./Product"

export interface productReducerInterface {
  favorite: {
    loading: boolean,
    list: Array<Product>
  },
  stores: {
    loading: boolean,
    list: Array<Product>
  }
}