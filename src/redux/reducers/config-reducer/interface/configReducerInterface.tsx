export interface configReducerInterface {
  loaded: boolean,
  fetch: {
    status: number,
    code: string,
    message: string
  },
  banners: {
    navbar: bannerNavbar
  }
};

export interface bannerNavbar {
  show: boolean,
  message: {
    desktop: string,
    mobile: string
  },
  href: string,
  dismiss: boolean,
  type: string
}