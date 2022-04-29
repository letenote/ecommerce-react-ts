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
import { screen, render, waitFor, act } from "../../test-utils";
import React from "react";
import App from "../../App";
import userEvent from "@testing-library/user-event";
import { TestId } from "../../constant/TestId";
import { idle } from "../../helper/idle";
const { containers, components, button } = TestId;

const mockAxios = new MockAdapter(axios);
const API_URL = "https://jsonplaceholder.typicode.com/users"
const data = {
  delay: 2000,
  navbar: {
    show: true,
    // message: "Get free delivery on orders over $100",
    message: "Big news! We're excited to announce a brand new product.",
    href: "/stores",
    type: "2",
    dismiss: false
  }
}
const mockSpy = jest.spyOn(axios, "get");
beforeEach(() => {
  mockSpy.mockClear();
  // clear any previous calls to this spy mock
});

afterAll(() => {
  mockSpy.mockRestore();
  // restore spy mock to original Axios.get
});

describe("___HOME_CONTAINER_WITH_FETCH", () => {
  test("fails to make an API request", async () => {
    mockAxios.onGet(API_URL).reply(404) // at first, it fails to fetch
    render(<App />);

    // using "waitFor" because submitting the form calls an async request
    // therefore you need to "waitFor" the request to resolve
    await waitFor(() => {
      expect(mockSpy).toHaveBeenCalledTimes(1);
      const waitingGetConfigData = screen.queryByText(components.navbarBanner.value);
      expect(waitingGetConfigData).not.toBeInTheDocument()
    });
  });

  test("success an API request to retrieve ", async () => {
    mockAxios.onGet(API_URL).reply(200, data);
    render(<App />);

    await waitFor(async () => {
      expect(mockSpy).toHaveBeenCalledTimes(1);
      const waitingGetConfigData = await screen.findByText(components.navbarBanner.value);
      expect(waitingGetConfigData).toBeInTheDocument();
    });
  });

  test("fails again to make an API request", async () => {
    mockAxios.resetHistory()
    mockAxios.onGet(API_URL).reply(404) // at first, it fails to fetch

    await waitFor(() => {
      const waitingGetConfigData = screen.queryByText(components.navbarBanner.value);
      expect(waitingGetConfigData).not.toBeInTheDocument()
    });
  });

  test("success an API request to retrieve ", async () => {
    mockAxios.resetHistory()
    mockAxios.reset()
    mockAxios.resetHandlers()
    mockAxios.restore()
    mockAxios.onGet(API_URL).reply(200, data);
    render(<App />);

    await waitFor(async () => {
      const waitingGetConfigData = await screen.findByText(components.navbarBanner.value);
      expect(waitingGetConfigData).toBeInTheDocument();
    });
  });
})

describe("__HOME_CONTAINER", () => {
  test('show fallback loading page', async () => {
    idle(2000)
    render(<App />);
    screen.findByText("loading page ...");
  });

  test("Home => Waiting get config data an rendering", async () => {
    await act(async () => {
      render(<App />);
    });
    await waitFor(async () => {
      const waitingGetConfigData = await screen.findByText(components.navbarBanner.value);
      expect(waitingGetConfigData).toBeInTheDocument();
    }, {
      timeout: 20000
    });
  });

  test("Home => Waiting get config data after rendering dismiss button in banner navbar", async () => {
    await act(async () => {
      render(<App />);
    });

    await waitFor(async () => {
      const waitingGetConfigData = await screen.findByText(components.navbarBanner.value);
      userEvent.click(screen.getByTestId(button.nav.bannerDismiss));
      expect(waitingGetConfigData).not.toBeInTheDocument()
    }, {
      timeout: 20000
    });
  });
});
