import { productActionTypes } from "./action-types/productActionTypes";
import { productActionInterface } from "./interface/productActionInterface";
import { productReducerInterface } from "./interface/productReducerInterface";

export const initialState = {
  favorite: {
    loading: true,
    list: [],
    fetch: {
      status: 0,
      code: "",
      message: ""
    }
  },
  stores: {
    loading: true,
    list: [],
    fetch: {
      status: 0,
      code: "",
      message: ""
    }
  },
  detail: {
    loading: true,
    fetch: {
      status: 0,
      code: "",
      message: ""
    },
    data: null
  }
}

export const productsReducer = (state: productReducerInterface = initialState, action: productActionInterface) => {
  switch (action.type) {
    case productActionTypes.ADD_FAVORITE_PRODUCTS_WITH_RESOLVE:
      return {
        ...state,
        favorite: {
          ...state.favorite,
          loading: false,
          list: action.payload.items,
          fetch: {
            status: action.payload.status,
            code: action.payload.code,
            message: action.payload.message
          }
        }
      };

    case productActionTypes.ADD_FAVORITE_PRODUCTS_WITH_REJECT:
      return {
        ...state,
        favorite: {
          ...state.favorite,
          loading: false,
          list: [],
          fetch: {
            status: action.payload.status,
            code: action.payload.code,
            message: action.payload.message
          }
        }
      };

    case productActionTypes.ADD_PRODUCTS_TO_STORE_WITH_RESOLVE:
      return {
        ...state,
        stores: {
          ...state.stores,
          loading: false,
          list: action.payload.items,
          fetch: {
            status: action.payload.status,
            code: action.payload.code,
            message: action.payload.message
          }
        }
      };

    case productActionTypes.ADD_PRODUCTS_TO_STORE_WITH_REJECT:
      return {
        ...state,
        stores: {
          ...state.stores,
          loading: false,
          list: [],
          fetch: {
            status: action.payload.status,
            code: action.payload.code,
            message: action.payload.message
          }
        }
      };

    case productActionTypes.ADD_PRODUCT_TO_DETAIL_WITH_RESOLVE:
      return {
        ...state,
        detail: {
          loading: false,
          fetch: {
            status: action.payload.status,
            code: action.payload.code,
            message: action.payload.message
          },
          data: action.payload.product
        }
      }

    case productActionTypes.ADD_PRODUCT_TO_DETAIL_WITH_REJECT:
      return {
        ...state,
        detail: {
          ...state.detail,
          loading: false,
          fetch: {
            status: action.payload.status,
            code: action.payload.code,
            message: action.payload.message
          },
          data: null
        }
      }

    case productActionTypes.RESET_VALUE_PRODUCTS:
      return {
        favorite: {
          loading: true,
          list: [],
          fetch: {
            status: 0,
            code: "",
            message: ""
          }
        },
        stores: {
          loading: true,
          list: [],
          fetch: {
            status: 0,
            code: "",
            message: ""
          }
        },
        detail: {
          loading: true,
          fetch: {
            status: 0,
            code: "",
            message: ""
          },
          data: null
        }
      }

    default:
      return state
  }
};