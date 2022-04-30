import { productActionTypes } from "./action-types/productActionTypes";
import { productActionInterface } from "./interface/productActionInterface";
import { productReducerInterface } from "./interface/productReducerInterface";

export const initialState = {
  favorite: {
    loading: true,
    list: [],
    fetch: {
      status: 0,
      message: ""
    }
  },
  stores: {
    loading: true,
    list: [],
    fetch: {
      status: 0,
      message: ""
    }
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
            message: action.payload.message
          }
        }
      };

    default:
      return state
  }
};