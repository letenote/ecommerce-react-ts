import React from "react";
import { render } from "../test-utils";
import userEvent from '@testing-library/user-event';
import Carts from './Carts'
import { BrowserRouter } from "react-router-dom";
import { TestId } from "../constant/TestId";

describe("__COMPONENT_CARTS", () => {
  test('Carts shows the children and a close button', () => {
    const handleClose = jest.fn();
    const container = render(
      <BrowserRouter>
        <Carts show={true} onClose={handleClose} />
      </BrowserRouter>
    );

    expect(container.getByText(TestId.components.carts.value)).toBeTruthy();
    userEvent.click(container.getByTestId(TestId.button.modal.carts.close));
    expect(handleClose).toHaveBeenCalledTimes(1)
  });
})