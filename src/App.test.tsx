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
    const getConfigReducer = store.getState().user;
    const expected = {
      name: "",
      isAuthentication: false,
      carts: []
    };

    expect(getConfigReducer.isAuthentication).toEqual(expected.isAuthentication);
    expect(getConfigReducer.cart).toEqual(expected.carts);
    expect(getConfigReducer.name).toEqual(expected.name);
  });
});