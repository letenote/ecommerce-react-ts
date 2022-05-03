import React from 'react';
import axios from 'axios';
import { waitFor } from '@testing-library/dom';
import { render } from "../../test-utils";
import Product from './index'
import { BrowserRouter } from 'react-router-dom';
import { TestId } from '../../constant/TestId';
import { products } from "../../constant/response/products";
import userEvent from '@testing-library/user-event';
import { store } from "../../redux/store";
import { RenderResult } from '@testing-library/react';
import Layout from '../../componets/Layout';
import { sumOfNumbers } from '../../helper/sumOfNumbers';
import * as productActionCreators from '../../redux/actions/cart-action/index';
import { bindActionCreators } from 'redux';
import { act } from 'react-dom/test-utils';

const { _resetCartAction } = bindActionCreators(productActionCreators, store.dispatch);
const { containers, components, button } = TestId;
jest.mock('axios');

describe("__PRODUCT_CONTAINER_WITH_FETCH_AND_RESULT_IS_REJECT", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('show fallback loading page and loading fetch data', async () => {
    const productResponse = products[0];
    jest.spyOn(axios, 'get').mockResolvedValue({ data: productResponse });
    const wrapper = render(
      <BrowserRouter>
        <Product />
      </BrowserRouter>
    );
    wrapper.findByText("loading page ...");
    wrapper.findByText("Loading..");
  });

  test(`Show ${containers.product.productNotFound} if response is no Product`, async () => {
    jest.spyOn(axios, 'get').mockRejectedValue({
      response: {
        status: 404
      },
      code: "BADREQUEST",
      message: "Badrequest error 404"
    });
    const wrapper = render(
      <BrowserRouter>
        <Product />
      </BrowserRouter>
    );
    await waitFor(() => expect(wrapper.queryByText(containers.product.productNotFound)).toBeInTheDocument());
  });

  test("Show 'ProductName' and button 'addToBag' if response found data product", async () => {
    const productResponse = products[0];
    jest.spyOn(axios, 'get').mockResolvedValue({ data: productResponse });
    const wrapper = render(
      <BrowserRouter>
        <Product />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(wrapper.queryByText(productResponse.name)).toBeInTheDocument()
      expect(wrapper.queryByText(button.container.product.add_cart_button_title)).toBeInTheDocument()
    });
  });
});

describe("__PRODUCT_CONTAINER_WITH_USER_INTERACTION_ADD_PRODUCT_TO_CART", () => {
  let wrapper: RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement>
  beforeEach(() => {
    const productResponse = products[0];
    jest.spyOn(axios, 'get').mockResolvedValue({ data: productResponse });
    wrapper = render(
      <BrowserRouter>
        <Layout>
          <Product />
        </Layout>
      </BrowserRouter>
    );
    jest.clearAllMocks()
  });

  test(`Click button 'addToBag' before pick size product, then show validate message "${button.container.product.sizeValidationMessage}"`, async () => {
    await waitFor(() => {
      const user = userEvent;
      user.click(wrapper.getByTestId(button.container.product.add_cart_button));
      expect(wrapper.queryByText(button.container.product.sizeValidationMessage)).toBeInTheDocument();
      _resetCartAction()
    });
  });

  test("Simulate User Pick color - size product, if success add more 2 items to cart", async () => {
    await waitFor(async () => {
      const addProductToCart = async (color: string, size: string) => {
        const user = userEvent
        await user.click(wrapper.getByText(color));
        await user.click(wrapper.getByText(size));
        user.click(wrapper.getByTestId(button.container.product.add_cart_button));
      };
      await addProductToCart('black', 's')
      const cart1itemReducer = store.getState().cart.items
      expect(cart1itemReducer.length).toBe(1);

      // then simulate user add 2 items to cart
      await addProductToCart('grey', 'm');
      await addProductToCart('white', 'l')
      const cart3ItemReducer = store.getState().cart.items;
      expect(cart3ItemReducer.length).toBe(3)
    });
  });

  test("Makesure value subtotal in cart bag, after add 3 product item in bag", async () => {
    await waitFor(async () => {
      // makesure current product in cart is 3 items
      const cartReducer = store.getState().cart.items;
      expect(cartReducer.length).toBe(3);

      const subTotalExpected = 660000;
      const getSubTotal = sumOfNumbers(cartReducer.map((item) => { return { price: item.price } }));
      expect(getSubTotal).toBe(subTotalExpected)
    })
  });

  test("Simulate User remove 1 product in cart, after add 3 product to cart", async () => {
    await waitFor(async () => {
      // makesure current product in cart is 3 items
      const cartReducer = store.getState().cart.items;
      expect(cartReducer.length).toBe(3)

      // simulate open "cart" modal
      // and then "cart" modal is open
      userEvent.click(wrapper.getByTestId(button.modal.carts.open));
      expect(wrapper.getByTestId(components.carts.id)).toHaveTextContent(components.carts.value);

      // simulate user remove item in cart by button click
      const user = userEvent;
      user.click(wrapper.getAllByText("Hapus")[0])
      const cartReducerAfterRemove = store.getState().cart.items;
      expect(cartReducerAfterRemove.length).toBe(2)
    })
  });

  test("Makesure value subtotal in cart bag, after remove 1 product item in bag", async () => {
    await waitFor(async () => {
      // makesure current product in cart is 2 items
      const cartReducer = store.getState().cart.items;
      expect(cartReducer.length).toBe(2);

      const subTotalExpected = 440000;
      const getSubTotal = sumOfNumbers(cartReducer.map((item) => { return { price: item.price } }));
      expect(getSubTotal).toBe(subTotalExpected)
    })
  });
});