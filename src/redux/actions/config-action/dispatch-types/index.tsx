import { _setBannerInNavbarDismissAction, _rejectGetConfigAction, _resolveGetConfigAction } from "..";

export type _resolveGetConfigActionDispatchType = typeof _resolveGetConfigAction;
export type _rejectGetConfigActionDispatchType = typeof _rejectGetConfigAction
export type _configSetBannerInNavDismissActionDispatchType = typeof _setBannerInNavbarDismissAction

export type _configActionDispatchTypes = ReturnType<
  | typeof _resolveGetConfigAction
  | typeof _rejectGetConfigAction
  | typeof _setBannerInNavbarDismissAction
>;