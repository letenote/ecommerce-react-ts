import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import { api } from "../../constant/response/api";
import { configDataResponse } from "../../constant/response/configDataResponse";
import { TestId } from "../../constant/TestId";
import { idle } from "../../helper/idle";
import { screen, render, waitFor } from "../../test-utils";
import Store from ".";
import { BrowserRouter } from "react-router-dom";

const { components } = TestId;

const mockAxios = new MockAdapter(axios);
const API_URL = api;
const data = configDataResponse;
const mockSpy = jest.spyOn(axios, "get");

describe("___STORE_CONTAINER_WITH_FETCH", () => {
  let container: any;
  beforeEach(() => {
    mockSpy.mockClear();
    // clear any previous calls to this spy mock
    container = render(
      <BrowserRouter>
        <Store />
      </BrowserRouter>
    );
  });

  afterAll(() => {
    mockSpy.mockRestore();
    // restore spy mock to original Axios.get
  });

  test("fails to make an API request products", async () => {
    mockAxios.resetHistory()
    mockAxios.onGet(API_URL.products).reply(404) // at first, it fails to fetch
    // render(<App />);

    await waitFor(() => {
      const waitingGetConfigData = screen.queryByText(components.productList.value);
      expect(waitingGetConfigData).not.toBeInTheDocument()
    });
  });

  test("success an API request to products ", async () => {
    mockAxios.resetHistory()
    mockAxios.reset()
    mockAxios.resetHandlers()
    mockAxios.restore()
    mockAxios.onGet(API_URL.products).reply(200, data);
    // render(<App />);

    await waitFor(async () => {
      const waitingGetConfigData = await screen.findByText(components.productList.value);
      expect(waitingGetConfigData).toBeInTheDocument();
    }, {
      timeout: 20000
    });
  });
});

describe("__STORE_CONTAINER_WITH_FALLBACK_LOADING", () => {
  test('show fallback loading page', async () => {
    idle(1000)
    screen.findByText("loading page ...");
  });
});