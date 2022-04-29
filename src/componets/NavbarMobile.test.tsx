import React from "react";
import { render, waitFor } from "../test-utils";
import userEvent from '@testing-library/user-event';
import NavbarMobile from './NavbarMobile'
import { BrowserRouter } from "react-router-dom";
import { TestId } from "../constant/TestId";
import { Navigations } from "../constant/Navigations";

const { components, button } = TestId;
let container: any;
const handleClose = jest.fn();
beforeEach(() => {
  container = render(
    <BrowserRouter>
      <NavbarMobile
        show={true}
        navigations={Navigations}
        setClose={handleClose}
      />
    </BrowserRouter>
  );
});

describe("__COMPONENT_NAVBAR_MOBILE", () => {
  test('Navbar Menu shows the children menu in Mobile and a close button', async () => {
    expect(container.getByText(components.main_menu_mobile.value)).toBeTruthy()
    userEvent.click(container.getByTestId(button.modal.main_menu_mobile.close_button))
    expect(handleClose).toHaveBeenCalledTimes(1)
  });

  test('Navbar Menu shows the children menu in Mobile and a close dialog', () => {
    expect(container.getByText(components.main_menu_mobile.value)).toBeTruthy();
    userEvent.click(container.getByTestId(button.modal.main_menu_mobile.close_dialog));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
})