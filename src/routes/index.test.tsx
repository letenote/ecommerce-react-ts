import React from "react";
import App from "../App";
import { act, render, screen } from "../test-utils";
import userEvent from '@testing-library/user-event';
import { TestId } from '../constant/TestId';

const renderWithRoutes = ({ route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(<App />)
};

const { containers, components, button } = TestId;

describe("__ROUTES_FORCE_NAVIGATING_WITH_LAZY", () => {
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
});

describe("__ROUTES_NAVIGATING_BY_USER_CLICK", () => {
  test('landing on stores page triger by user', async () => {
    await act(async () => {
      render(<App />);
    });

    // makesure current in "404" page
    expect(screen.getByText(containers.fallback404.value)).toBeInTheDocument();

    // then simulate user click menu "store" in navbar
    // and then redirect to "store" page
    userEvent.click(screen.getByTestId(button.nav.stores));
    expect(screen.getByTestId(containers.stores.id)).toHaveTextContent(containers.stores.value);
  });

  it('landing on home page triger by user', async () => {
    await act(async () => {
      render(<App />);
    });

    // makesure current in "stores" page
    expect(screen.getByText(containers.stores.value)).toBeInTheDocument();

    // then simulate user click menu "home" in navbar
    // and then redirect to "home" page
    userEvent.click(screen.getByTestId(button.nav.home));
    expect(screen.getByTestId(containers.home.id)).toHaveTextContent(containers.home.value);
  });

  it('landing on login page triger by user', async () => {
    await act(async () => {
      render(<App />);
    });

    // makesure current in "home" page
    expect(screen.getByText(containers.home.value)).toBeInTheDocument();

    // then simulate user click menu "login" in navbar
    // and then redirect to "login" page
    userEvent.click(screen.getByTestId(button.nav.login));
    expect(screen.getByTestId(containers.login.id)).toHaveTextContent(containers.login.value);
  });

  it('landing on carts modal then checkout page triger by user', async () => {
    await act(async () => {
      render(<App />);
    });

    // makesure current in "login" page
    expect(screen.getByText(containers.login.value)).toBeInTheDocument();

    // simulate open "cart" modal
    // and then "cart" modal is open
    userEvent.click(screen.getByTestId(button.modal.carts.open));
    expect(screen.getByTestId(components.carts.id)).toHaveTextContent(components.carts.value);

    // then simulate user click menu "checkout" in "cart" modal
    // and then redirect to "checkout" page
    userEvent.click(screen.getByTestId(button.nav.checkout));
    expect(screen.getByTestId(containers.checkout.id)).toHaveTextContent(containers.checkout.value);
  });


})