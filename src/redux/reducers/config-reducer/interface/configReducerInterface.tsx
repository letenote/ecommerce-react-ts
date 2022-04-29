export interface configReducerInterface {
  delay: number,
  banners: {
    navbar: bannerNavbar
  }
};

export interface bannerNavbar {
  show: boolean,
  message: string,
  href: string
}