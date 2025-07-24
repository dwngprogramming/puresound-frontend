import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

let _router: AppRouterInstance | null = null;

export const setRouter = (router: AppRouterInstance) => {
  _router = router;
};

export const getRouter = () => {
  return _router;
};
