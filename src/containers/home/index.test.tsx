// import React from "react";
// import Home from "./index";
// import { act, cleanup, render, screen, waitFor } from "../../test-utils";
// import userEvent from '@testing-library/user-event';
// import { TestId } from '../../constant/TestId';
// import App from "../../App";
// import { BrowserRouter } from "react-router-dom";
// import axios from 'axios';
// import { idle } from "../../helper/idle";
// const { containers, components, button } = TestId;

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;
// jest.useRealTimers();

// // describe('WithFetching error', () => {
// //   // const { rerender } = render(<App />);
// //   test('should fetch failed', async () => {
// //     // await act(async () => {
// //     render(
// //       <BrowserRouter>
// //         <Home />
// //       </BrowserRouter>
// //     );
// //     // });
// //     mockedAxios.get.mockRejectedValueOnce([]);
// //     await waitFor(() => {
// //       expect(mockedAxios.get).toHaveBeenCalledTimes(1);
// //       const waitingGetConfigData = screen.queryByText(components.navbarBanner.value);
// //       expect(waitingGetConfigData).not.toBeInTheDocument()
// //     })
// //   });
// // })

// describe('WithFetching success', () => {

//   test('should fetch success', async () => {
//     await idle(5000)
//     render(<App />);
//     // reloadFn();
//     //arrange
//     const data = {
//       delay: 2000,
//       navbar: {
//         show: true,
//         // message: "Get free delivery on orders over $100",
//         message: "Big news! We're excited to announce a brand new product.",
//         href: "/stores",
//         type: "2",
//         dismiss: false
//       }
//     }
//     //act
//     mockedAxios.get.mockResolvedValue(data);

//     await waitFor(async () => {
//       const waitingGetConfigData = await screen.findByText(components.navbarBanner.value);
//       expect(waitingGetConfigData).toBeInTheDocument();
//     }, {
//       timeout: 8000
//     })
//   }, 10000);
// });

import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { screen, render, waitFor } from "../../test-utils";
import React from "react";
import { TestId } from "../../constant/TestId";
import { idle } from "../../helper/idle";
import { configDataResponse } from "../../constant/response/configDataResponse";
import { api } from "../../constant/response/api";
import Home from ".";
import { BrowserRouter } from "react-router-dom";
const { components } = TestId;

const mockAxios = new MockAdapter(axios);
const API_URL = api;
const data = configDataResponse;
const mockSpy = jest.spyOn(axios, "get");

describe("___HOME_CONTAINER_WITH_FETCH", () => {
  let container: any;
  beforeEach(() => {
    mockSpy.mockClear();
    // clear any previous calls to this spy mock
    container = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });

  afterAll(() => {
    mockSpy.mockRestore();
    // restore spy mock to original Axios.get
  });

  test("fails to make an API request favorite products", async () => {
    // mockAxios.resetHistory()
    mockAxios.onGet(API_URL.favorite).reply(404) // at first, it fails to fetch
    // render(<App />);
    await waitFor(() => {
      const waitingGetConfigData = screen.queryByText(components.productList.value);
      expect(waitingGetConfigData).not.toBeInTheDocument()
    });
  });

  test("success an API request to favorite products ", async () => {
    mockAxios.resetHistory()
    mockAxios.reset()
    mockAxios.resetHandlers()
    mockAxios.restore()
    mockAxios.onGet(API_URL.favorite).reply(200, data);
    // render(<App />);

    await waitFor(async () => {
      const waitingGetConfigData = await screen.findByText(components.productList.value);
      expect(waitingGetConfigData).toBeInTheDocument();
    });
  });
})

describe("__HOME_CONTAINER_WITH_FALLBACK_LOADING", () => {
  test('show fallback loading page', async () => {
    idle(1000)
    screen.findByText("loading page ...");
  });
});
