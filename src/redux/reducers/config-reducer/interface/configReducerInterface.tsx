export interface configReducerInterface {
  loaded: boolean,
  delay: number,
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