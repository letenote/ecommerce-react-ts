import React from "react";
import { render } from "../../test-utils";
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from "react-router-dom";
import { TestId } from "../../constant/TestId";
import BannerInNavbar from "./BannerInNavbar";

const { components, button } = TestId;
let container: any;
let message: string = "sample test message"
const handleDismiss = jest.fn();
beforeEach(() => {
  container = render(
    <BrowserRouter>
      <BannerInNavbar
        show={true}
        message={{
          desktop: message,
          mobile: message
        }}
        type={"2"}
        href={"/stores"}
        setDismiss={() => handleDismiss()}
      />
    </BrowserRouter>
  );
});

describe("__COMPONENT_BANNER_NAVBAR", () => {
  test('Banner Navbar update rerender show', async () => {
    expect(container.getByText(components.navbarBanner.value)).toBeTruthy();
  });

  test('Banner Navbar show', async () => {
    expect(container.getByText(components.navbarBanner.value)).toBeTruthy();
  });

  test('Banner Navbar dismiss', async () => {
    userEvent.click(container.getByTestId(button.nav.bannerDismiss));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  test('renders message from props', () => {
    expect(container.getByText(message)).toBeTruthy();
  });
});