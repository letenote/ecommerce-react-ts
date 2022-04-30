import { _setBannerInNavbarDismissAction, _setBannersAction, _setDelayAction } from "..";

export type _configSetDelayActionDispatchType = typeof _setDelayAction;
export type _configSetBannerActionDispatchType = typeof _setBannersAction;
export type _configSetBannerInNavDismissActionDispatchType = typeof _setBannerInNavbarDismissAction

export type _configActionDispatchTypes = ReturnType<
  | typeof _setDelayAction
  | typeof _setBannersAction
  | typeof _setBannerInNavbarDismissAction
>;