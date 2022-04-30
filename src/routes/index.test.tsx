import React from "react";
import App from "../App";
import { act, render, screen, waitFor } from "../test-utils";
import userEvent from '@testing-library/user-event';
import { TestId } from '../constant/TestId';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { api } from "../constant/response/api";
import { configDataResponse } from "../constant/response/configDataResponse";
const renderWithRoutes = ({ route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(<App />)
};

const { containers, components, button } = TestId;
const mockAxios = new MockAdapter(axios);
const API_URL = api;
const data = configDataResponse;
const mockSpy = jest.spyOn(axios, "get");

describe("__ROUTES", () => {
  it("app => home, force navigating then lazy rendering", async () => {
    await act(async () => {
      renderWithRoutes();
    });

    const lazyHome = await screen.findByText(containers.home.value);
    expect(lazyHome).toBeInTheDocument();
  });

  it("app => login, force navigating then lazy rendering", async () => {
    await act(async () => {
      renderWithRoutes({ route: '/login' });
    });

    const lazyLogin = await screen.findByText(containers.login.value);
    expect(lazyLogin).toBeInTheDocument();
  });

  it("app => stores, force navigating then lazy rendering", async () => {
    await act(async () => {
      renderWithRoutes({ route: '/stores' });
    });

    let lazyStores = await screen.findByText(containers.stores.value);
    expect(lazyStores).toBeInTheDocument();
  });

  it("app => stores/slug, force navigating then lazy rendering", async () => {
    await act(async () => {
      renderWithRoutes({ route: '/stores/basic-tee-black?id=1' })
    });
    const lazyProductDetail = await screen.findByText(containers.product.value);
    expect(lazyProductDetail).toBeInTheDocument();
  });

  it("app => checkout, force navigating then lazy rendering", async () => {
    await act(async () => {
      renderWithRoutes({ route: '/checkout' })
    });

    const lazyCheckout = await screen.findByText(containers.checkout.value);
    expect(lazyCheckout).toBeInTheDocument();
  });

  it("app => 404, force navigating then lazy rendering bad page", async () => {
    await act(async () => {
      renderWithRoutes({ route: '/something-that-does-not-match' });
    });

    const lazyFallback404 = await screen.findByText(containers.fallback404.value);
    expect(lazyFallback404).toBeInTheDocument();
  });

  it('landing on stores page triger by user', async () => {
    await act(async () => {
      render(<App />);
    });
    userEvent.click(screen.getByTestId(button.nav.stores));
    expect(screen.getByTestId(containers.stores.id)).toHaveTextContent(containers.stores.value);
  });

  it('landing on home page triger by user', async () => {
    await act(async () => {
      render(<App />);
    });
    userEvent.click(screen.getByTestId(button.nav.home));
    expect(screen.getByTestId(containers.home.id)).toHaveTextContent(containers.home.value);
  });

  it('landing on carts modal then checkout page triger by user', async () => {
    await act(async () => {
      renderWithRoutes();
    });

    userEvent.click(screen.getByTestId(button.modal.carts.open));
    expect(screen.getByTestId(components.carts.id)).toHaveTextContent(components.carts.value);

    userEvent.click(screen.getByTestId(button.nav.checkout));
    expect(screen.getByTestId(containers.checkout.id)).toHaveTextContent(containers.checkout.value);
  });

  it('landing on login page triger by user', async () => {
    await act(async () => {
      render(<App />);
    });
    userEvent.click(screen.getByTestId(button.nav.login));
    expect(screen.getByTestId(containers.login.id)).toHaveTextContent(containers.login.value)
  });
})

describe("___ROUTE_WITH_FETCH", () => {
  beforeEach(() => {
    mockSpy.mockClear();
    // clear any previous calls to this spy mock
  });

  afterAll(() => {
    mockSpy.mockRestore();
    // restore spy mock to original Axios.get
  });

  test("fails to make an API request config data", async () => {
    mockAxios.onGet(API_URL.config).reply(404) // at first, it fails to fetch
    render(<App />);

    // using "waitFor" because submitting the form calls an async request
    // therefore you need to "waitFor" the request to resolve
    await waitFor(() => {
      expect(mockSpy).toHaveBeenCalledTimes(1);
      const waitingGetConfigData = screen.queryByText(components.navbarBanner.value);
      expect(waitingGetConfigData).not.toBeInTheDocument()
    });
  });

  test("success an API request to config data ", async () => {
    mockAxios.onGet(API_URL.config).reply(200, data);
    render(<App />);

    await waitFor(async () => {
      expect(mockSpy).toHaveBeenCalledTimes(1);
      const waitingGetConfigData = await screen.findByText(components.navbarBanner.value);
      expect(waitingGetConfigData).toBeInTheDocument();
    });
  });
})

describe("___ROUTES_RENDER_BANNER_IN_NAVBAR", () => {
  beforeEach(async () => {
    await act(async () => {
      render(<App />);
    });
  });

  test("App => Waiting get config data an rendering", async () => {
    await waitFor(async () => {
      const waitingGetConfigData = await screen.findByText(components.navbarBanner.value);
      expect(waitingGetConfigData).toBeInTheDocument();
    }, {
      timeout: 20000
    });
  });

  test("App => Waiting get config data after rendering dismiss button in banner navbar", async () => {
    await waitFor(async () => {
      const waitingGetConfigData = await screen.findByText(components.navbarBanner.value);
      userEvent.click(screen.getByTestId(button.nav.bannerDismiss));
      expect(waitingGetConfigData).not.toBeInTheDocument()
    }, {
      timeout: 20000
    });
  });
})