import React from 'react';
import axios from 'axios';
import { fireEvent, waitFor } from '@testing-library/dom';
import { render, screen } from "../../test-utils";
import Login from "./index";
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { TestId } from '../../constant/TestId';
import { act } from 'react-test-renderer';
import Layout from '../../componets/Layout';
import { RenderResult } from '@testing-library/react';

const { button, form } = TestId

describe("__LOGIN_CONTAINER", () => {
  test("should be to render email input, password input, and button signin", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = getByTestId(form.login.signin_email_field_input)
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");

    const passwordInput = getByTestId(form.login.signin_password_field_input)
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");

    const signinButtonSubmit = getByTestId(button.container.login.submit_login)
    expect(signinButtonSubmit).toBeInTheDocument();
    expect(signinButtonSubmit).toHaveAttribute("type", "submit");
  });

  test("Before user login, must be render link 'Sign in' and not render 'avatar' in navbar", () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <Layout>
          <Login />
        </Layout>
      </BrowserRouter>
    );

    const signInNavigator = queryByTestId(button.nav.login);
    expect(signInNavigator).not.toBeNull()

    const avatarNavigator = queryByTestId(button.nav.avatar);
    expect(avatarNavigator).toBeNull()
  })

  test("the form shoudl be invalid - there's a required input with no value", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const signFormNode = getByTestId(form.login.signin_form_node);
    expect(signFormNode).not.toBeValid()
  })

  test("validation form signin if email or password field is not value then show validation message", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const signinButton = getByTestId(button.container.login.submit_login);
    const signFormNode = getByTestId(form.login.signin_form_node);
    fireEvent.click(signinButton);
    expect(signFormNode).not.toBeValid()
  })
});

describe("__LOGIN_CONTAINER_FIELD_TEST", () => {
  const setup = (field: string) => {
    const utils = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    const input = utils.getByTestId(field);
    return {
      input,
      ...utils,
    }
  };

  test(`email field onchange test, user type '${"admin"}' is NOT VALID`, async () => {
    const { input } = setup(form.login.signin_email_field_input);
    expect(input).not.toBeValid();

    fireEvent.change(input, { target: { value: 'admin' } });
    expect((input as HTMLInputElement).value).toBe('admin');
    expect(input).not.toBeValid();
  });

  test(`email field onchange test, user type '${"admin.com"}' is NOT VALID`, async () => {
    const { input } = setup(form.login.signin_email_field_input);
    expect(input).not.toBeValid();

    fireEvent.change(input, { target: { value: 'admin.com' } });
    expect((input as HTMLInputElement).value).toBe('admin.com');
    expect(input).not.toBeValid();
  });

  test(`email field onchange test, user type '${"admin@lemariindah.com"}' is VALID`, async () => {
    const { input } = setup(form.login.signin_email_field_input);
    expect(input).not.toBeValid();

    fireEvent.change(input, { target: { value: 'admin@lemariindah.com' } });
    expect((input as HTMLInputElement).value).toBe('admin@lemariindah.com');
    expect(input).toBeValid();
  });

  test("password field onchange test", async () => {
    const { input } = setup(form.login.signin_password_field_input);
    expect(input).not.toBeValid();

    fireEvent.change(input, { target: { value: 'sukasuka189aja' } });
    expect((input as HTMLInputElement).value).toBe('sukasuka189aja');
    expect(input).toBeValid();
  });
});

describe("__LOGIN_CONTAINER_USER_LOGIN_SIMULATE", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("after form is valid, simulate click button SignIn, then text in button has change and button is disabled", () => {
    const { getByTestId, queryByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const signinButton = getByTestId(button.container.login.submit_login);

    fireEvent.click(signinButton);
    const textInButtonHasChange = queryByText("Loading..");
    expect(textInButtonHasChange).toBeInTheDocument();
    expect(signinButton).toBeDisabled();
  });

  test("after text in button has change, then hit API to get Auth and Result is REJECT, then show message '*email or password is incorrect'", async () => {
    jest.useFakeTimers();
    jest.spyOn(axios, 'get').mockRejectedValue({
      response: {
        status: 404
      },
      code: "BADREQUEST",
      message: "Badrequest error 404"
    });

    const wrapper = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const signinButton = wrapper.getByTestId(button.container.login.submit_login);
    fireEvent.click(signinButton);
    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(wrapper.queryByText(/email or password is incorrect/i)).toBeInTheDocument()
    });
  });

  test("after text in button has change, then hit API to get Auth and Result is RESOLVE, then show message '*login success'", async () => {
    jest.useFakeTimers();
    jest.spyOn(axios, 'get').mockResolvedValue({})

    const wrapper = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const signinButton = wrapper.getByTestId(button.container.login.submit_login);
    fireEvent.click(signinButton);
    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(wrapper.queryByText(/login success/i)).toBeInTheDocument()
    });
  });

  test("After user login, must be render link 'Sign out' and 'avatar' in navbar", async () => {
    jest.useFakeTimers();
    const wrapper = render(
      <BrowserRouter>
        <Layout>
          <Login />
        </Layout>
      </BrowserRouter>
    );

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      const signInNavigator = wrapper.queryByTestId(button.nav.logout);
      expect(signInNavigator).not.toBeNull()

      const avatarNavigator = wrapper.queryByTestId(button.nav.avatar);
      expect(avatarNavigator).not.toBeNull()
    });
  })

  test("User logout, must be render link 'Sign in' and not render 'avatar' in navbar", async () => {
    const wrapper = render(
      <BrowserRouter>
        <Layout>
          <Login />
        </Layout>
      </BrowserRouter>
    );

    const signOutNavigator = wrapper.getByTestId(button.nav.logout);
    fireEvent.click(signOutNavigator);
    expect(wrapper.queryByTestId(button.nav.logout)).toBeNull();

    const signInNavigator = wrapper.queryByTestId(button.nav.login);
    expect(signInNavigator).not.toBeNull();

    const avatarNavigator = wrapper.queryByTestId(button.nav.avatar);
    expect(avatarNavigator).toBeNull();
  })
})