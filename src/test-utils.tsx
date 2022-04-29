import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const AllTheProviders: FC = ({ children }) => {
  return (
    <React.StrictMode>
      <Provider store={store}>{children}</Provider>
    </React.StrictMode>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, {
  wrapper: AllTheProviders,
  ...options,
});

export * from "@testing-library/react";
export { customRender as render };