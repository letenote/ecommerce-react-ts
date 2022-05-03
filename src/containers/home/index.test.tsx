import React from 'react';
import axios from 'axios';
import { waitFor } from '@testing-library/dom';
import { render } from "../../test-utils";
import Home from './index'
import { BrowserRouter } from 'react-router-dom';
import { TestId } from '../../constant/TestId';
import { products } from "../../constant/response/products";

const { containers, components } = TestId;
jest.mock('axios');

describe("___HOME_CONTAINER_WITH_FETCH", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  });

  test('show fallback loading page and loading fetch data', async () => {
    const favoriteProductsResponse = products;
    jest.spyOn(axios, 'get').mockResolvedValue({ data: favoriteProductsResponse });
    const wrapper = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    wrapper.findByText("loading page ...");
    wrapper.findByText("Loading..");
  });

  test(`Show ${containers.home.fetchRejectMessage} Message if response is Reject`, async () => {
    jest.spyOn(axios, 'get').mockRejectedValue({
      response: {
        status: 404
      },
      code: "BADREQUEST",
      message: "Badrequest error 404"
    });
    const wrapper = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    await waitFor(() => expect(wrapper.queryByText(containers.home.fetchRejectMessage)).toBeInTheDocument());
  });

  test("Show Favorite Products if response is resolve", async () => {
    const favoriteProductsResponse = products;
    jest.spyOn(axios, 'get').mockResolvedValue({ data: favoriteProductsResponse });
    const wrapper = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => {
      return expect(wrapper.queryAllByText(components.productList.value)).toHaveLength(1)
    });
  });
});
