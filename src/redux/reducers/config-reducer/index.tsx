import { configActionInterface } from "./interface/configActionInterface";
import { configReducerInterface } from "./interface/configReducerInterface";

export const initialState = {
  delay: 0,
  banners: {
    navbar: {
      show: false,
      message: "",
      href: ""
    }
  }
}

export const configReducer = (state: configReducerInterface = initialState, action: configActionInterface) => {
  switch (action.type) {
    default:
      return state
  }
};