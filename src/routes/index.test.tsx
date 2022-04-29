import React from "react";
import App from "../App";
import { act, render, screen, waitFor } from "../test-utils";
import userEvent from '@testing-library/user-event';
import { TestId } from '../constant/TestId';
import axios from "axios";
const renderWithRoutes = ({ route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(<App />)
};

const { containers, components, button } = TestId;
// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

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