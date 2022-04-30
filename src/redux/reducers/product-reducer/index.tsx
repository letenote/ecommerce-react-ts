import { productActionTypes } from "./action-types/productActionTypes";
import { productActionInterface } from "./interface/productActionInterface";
import { productReducerInterface } from "./interface/productReducerInterface";

export const initialState = {
  favorite: {
    loading: true,
    list: []
  },
  stores: {
    loading: true,
    list: []
  }
}

export const productsReducer = (state: productReducerInterface = initialState, action: productActionInterface) => {
  switch (action.type) {
    case productActionTypes.ADD_FAVORITE_PRODUCTS:
      return {
        ...state,
        favorite: {
          loading: false,
          list: action.payload.items
        }
      }

    default:
      return state
  }
};