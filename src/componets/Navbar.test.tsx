import React from "react";
import { act, render, screen } from "../test-utils";
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar'
import { BrowserRouter } from "react-router-dom";
import { TestId } from "../constant/TestId";

const { components, button } = TestId;
let container: any;
beforeEach(() => {
  container = render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
});
describe("__COMPONENT_NAVBAR", () => {
  test('Navbar Menu shows the children menu', async () => {
    expect(container.getByText(components.navbar.value)).toBeTruthy();
  });

  test('Navbar Menu Mobile shows the children menu', async () => {
    userEvent.click(container.getByTestId(button.modal.main_menu_mobile.open));
    expect(container.getByText(components.main_menu_mobile.value)).toBeTruthy();
  });
})