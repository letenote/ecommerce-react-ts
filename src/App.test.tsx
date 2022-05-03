import React from "react";
import renderer from "react-test-renderer";
import { render } from "./test-utils";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// get real redux store
// https://reactjs.org/docs/test-renderer.html
let myApp: any;
let instance;
beforeEach(() => {
  myApp = renderer.create(
    <Provider store={store}>
      <App />
    </Provider>
  );
  instance = myApp.root;
});

describe("__REDUX_CONNECTED", () => {
  it("create snapshoot", () => {
    const tree = myApp.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with given default "User" state from Redux store', () => {
    const getUserReducer = store.getState().user;
    const expected = {
      name: "",
      isAuthentication: false
    };

    expect(getUserReducer.isAuthentication).toEqual(expected.isAuthentication);
    expect(getUserReducer.name).toEqual(expected.name);
  });

  it('should render with given default "Config" state from Redux store', () => {
    const getConfigReducer = store.getState().config;
    const expected = {
      loaded: false,
      fetch: {
        status: 0,
        code: "",
        message: ""
      },
      banners: {
        navbar: {
          show: false,
          message: {
            desktop: "",
            mobile: ""
          },
          href: "",
          dismiss: false,
          type: ""
        }
      }
    };

    expect(getConfigReducer).toEqual(expected);
  });

  it('should render with given default "Products" state from Redux store', () => {
    const getProductsReducer = store.getState().products;
    const expected = {
      favorite: {
        loading: true,
        list: [],
        fetch: {
          status: 0,
          code: "",
          message: ""
        }
      },
      stores: {
        loading: true,
        list: [],
        fetch: {
          status: 0,
          code: "",
          message: ""
        }
      },
      detail: {
        loading: true,
        fetch: {
          status: 0,
          code: "",
          message: ""
        },
        data: null
      }
    }

    expect(getProductsReducer).toEqual(expected);
  });

  it('should render with given default "Carts" state from Redux store', () => {
    const getCartReducer = store.getState().cart;
    const expected = {
      items: []
    }

    expect(getCartReducer).toEqual(expected);
  });
});