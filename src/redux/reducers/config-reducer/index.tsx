import { configActionType } from "./action-types/configActionTypes.enum";
import { configActionInterface } from "./interface/configActionInterface";
import { configReducerInterface } from "./interface/configReducerInterface";

export const initialState = {
  loaded: false,
  fetch: {
    status: 0,
    code: "",
    message: ""
  },
  banners: {
    navbar: {
      show: false,
      message: {
        desktop: "",
        mobile: ""
      },
      href: "",
      dismiss: false,
      type: ""
    }
  }
}

export const configReducer = (state: configReducerInterface = initialState, action: configActionInterface) => {
  switch (action.type) {
    case configActionType.RESOLVE_ADD_CONFIG_BANNERS:
      return {
        ...state,
        loaded: true,
        banners: action.payload.banners,
        fetch: {
          status: action.payload.status,
          code: action.payload.code,
          message: action.payload.message
        }
      };

    case configActionType.REJECT_ADD_CONFIG_BANNERS:
      return {
        ...state,
        loaded: false,
        fetch: {
          status: action.payload.status,
          code: action.payload.code,
          message: action.payload.message
        }
      };

    case configActionType.SET_BANNER_IN_NAVBAR_DISMISS:
      return {
        ...state,
        banners: {
          ...state.banners,
          navbar: {
            ...state.banners.navbar,
            show: false,
            dismiss: true
          }
        }
      };

    default:
      return state
  }
};