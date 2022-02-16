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

describe("__ROUTES", () => {
  it("app => home, force navigating then rendering", () => {
    renderWithRoutes()
    expect(screen.getByText(containers.home.value)).toBeInTheDocument();
  });

  it("app => login, force navigating then rendering", () => {
    renderWithRoutes({ route: '/login' })
    expect(screen.getByText(containers.login.value)).toBeInTheDocument();
  });

  it("app => stores, force navigating then rendering", () => {
    renderWithRoutes({ route: '/stores' })
    expect(screen.getByText(containers.stores.value)).toBeInTheDocument();
  });

  it("app => stores/slug, force navigating then rendering", async () => {
    await act(async () => {
      renderWithRoutes({ route: '/stores/basic-tee-black?id=1' })
    });
    expect(screen.getByText(containers.product.value)).toBeInTheDocument();
  });

  it("app => checkout, force navigating then rendering", () => {
    renderWithRoutes({ route: '/checkout' })
    expect(screen.getByText(containers.checkout.value)).toBeInTheDocument();
  });

  it("app => 404, force navigating then rendering bad page", () => {
    renderWithRoutes({ route: '/something-that-does-not-match' })
    expect(screen.getByText(containers.fallback404.value)).toBeInTheDocument()
  });

  it('landing on stores page triger by user', async () => {
    render(<App />);
    userEvent.click(screen.getByTestId(button.nav.stores));
    expect(screen.getByTestId(containers.stores.id)).toHaveTextContent(containers.stores.value);
  });

  it('landing on home page triger by user', async () => {
    render(<App />);
    userEvent.click(screen.getByTestId(button.nav.home));
    expect(screen.getByTestId(containers.home.id)).toHaveTextContent(containers.home.value);
  });

  it('landing on carts modal then checkout page triger by user', async () => {
    renderWithRoutes();
    userEvent.click(screen.getByTestId(button.modal.carts.open));
    expect(screen.getByTestId(components.carts.id)).toHaveTextContent(components.carts.value);

    userEvent.click(screen.getByTestId(button.nav.checkout));
    expect(screen.getByTestId(containers.checkout.id)).toHaveTextContent(containers.checkout.value);
  });

  it('landing on login page triger by user', async () => {
    render(<App />);
    userEvent.click(screen.getByTestId(button.nav.login));
    expect(screen.getByTestId(containers.login.id)).toHaveTextContent(containers.login.value)
  });
})