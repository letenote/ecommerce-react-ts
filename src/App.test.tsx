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
      isAuthentication: false,
      carts: []
    };

    expect(getUserReducer.isAuthentication).toEqual(expected.isAuthentication);
    expect(getUserReducer.cart).toEqual(expected.carts);
    expect(getUserReducer.name).toEqual(expected.name);
  });

  it('should render with given default "Config" state from Redux store', () => {
    const getConfigReducer = store.getState().config;
    const expected = {
      delay: 0,
      banners: {
        navbar: {
          show: false,
          message: "",
          href: ""
        }
      }
    };

    expect(getConfigReducer.delay).toEqual(expected.delay);
    expect(getConfigReducer.banners).toEqual(expected.banners);
  });
});