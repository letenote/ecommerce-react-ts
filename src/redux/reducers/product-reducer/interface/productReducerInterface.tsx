import { FetchStatus } from "../../../../models/FetchStatus"
import { Product } from "../../../../models/Product"

export interface productReducerInterface {
  favorite: {
    loading: boolean,
    list: Array<Product>,
    fetch: FetchStatus
  },
  stores: {
    loading: boolean,
    list: Array<Product>,
    fetch: FetchStatus
  }
  detail: {
    loading: boolean,
    fetch: FetchStatus,
    data: null | Product
  }
}