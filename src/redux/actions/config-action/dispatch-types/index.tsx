import { _setBannerInNavbarDismissAction, _setBannersAction, _setDelayAction } from "..";

export type _configSetDelayActionDispatchTypes = typeof _setDelayAction;
export type _configSetBannerActionDispatchTypes = typeof _setBannersAction;
export type _configSetBannerInNavDismissActionDispatchTypes = typeof _setBannerInNavbarDismissAction

export type _configActionDispatchTypes = ReturnType<
  | typeof _setDelayAction
  | typeof _setBannersAction
  | typeof _setBannerInNavbarDismissAction
>;