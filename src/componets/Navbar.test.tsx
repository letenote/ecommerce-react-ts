import React from "react";
import { act, render, screen, within } from "../test-utils";
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar'
import { BrowserRouter } from "react-router-dom";
import { TestId } from "../constant/TestId";
import axios from 'axios';
import { waitFor } from '@testing-library/dom';
import { configDataResponse } from "../constant/response/configDataResponse";
const { components, button } = TestId;

describe("__COMPONENT_NAVBAR", () => {
  let container: any;
  beforeEach(() => {
    container = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  });

  test('Navbar Menu shows the children menu', async () => {
    expect(container.getByText(components.navbar.value)).toBeTruthy();
  });

  test('Navbar Menu Mobile shows the children menu', async () => {
    userEvent.click(container.getByTestId(button.modal.main_menu_mobile.open));
    expect(container.getByText(components.main_menu_mobile.value)).toBeTruthy();
  });
});

describe("__COMPONENT_NAVBAR_WITH_FETCH", () => {
  jest.mock('axios');
  beforeEach(() => {
    jest.clearAllMocks()
  });

  test(`Banner in Navbar not Show if response is Reject`, async () => {
    jest.spyOn(axios, 'get').mockRejectedValue({
      response: {
        status: 404
      },
      code: "BADREQUEST",
      message: "Badrequest error 404"
    });
    const wrapper = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    await waitFor(() => expect(wrapper.queryByText(components.navbarBanner.value)).not.toBeInTheDocument());
  });

  test("Banner in Navbar Show if response is Resolve", async () => {
    const configResponse = configDataResponse;
    jest.spyOn(axios, 'get').mockResolvedValue({ data: configResponse.navbar });
    const wrapper = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    await waitFor(() => {
      return expect(wrapper.queryAllByText(components.navbarBanner.value)).toHaveLength(1)
    });
  });

  test("After Banner in Navbar Show, simulate click dismiss button in banner navbar", async () => {
    const configResponse = configDataResponse;
    jest.spyOn(axios, 'get').mockResolvedValue({ data: configResponse.navbar });
    const wrapper = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    await waitFor(async () => {
      const waitingGetConfigData = await wrapper.findByText(components.navbarBanner.value);
      userEvent.click(wrapper.getByTestId(button.nav.bannerDismiss));
      expect(waitingGetConfigData).not.toBeInTheDocument()
    });
  });
});