import React, { useEffect, useState } from "react";
import { LockClosedIcon } from '@heroicons/react/solid'
import { TestId } from "../../constant/TestId";
import axios from "axios";
import { api } from "../../constant/response/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as userActionCreators from '../../redux/actions/user-action';
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";

const Login: React.FC<{}> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [getLogin, setGetLogin] = useState<boolean>(false);

  const { _resolveUserLogin, _rejectUserLogin } = bindActionCreators(
    userActionCreators,
    dispatch
  );

  useEffect(() => {
    localStorage.getItem('isAuthentication') && navigate(-1)
  }, [])

  const signinHandler = async (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    setGetLogin(true);
    await axios.get(api.login)
      .then((res) => (
        _resolveUserLogin(),
        setTimeout(() => (setGetLogin(false), navigate(-1)), 1000)
      ))
      .catch((err) => (
        _rejectUserLogin({
          status: err.response?.status,
          code: err.code,
          message: err.message
        }),
        setTimeout(() => setGetLogin(false), 1000)
      ));
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div data-testid={TestId.containers.login.id} style={{ display: "none" }}>{TestId.containers.login.value}</div>
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              and{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Happy Shopping
              </a>
            </p>
          </div>
          <form data-testid={TestId.form.login.signin_form_node} className="mt-8 space-y-6" onSubmit={signinHandler} method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div
              style={{
                position: "relative"
              }}
              className="rounded-md shadow-sm -space-y-px"
            >
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  data-testid={TestId.form.login.signin_email_field_input}
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  data-testid={TestId.form.login.signin_password_field_input}
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              {
                user.fetch.status >= 400 && (
                  <span style={{ position: "absolute", bottom: "-25px" }} className="text-sm font-small text-amber-600">
                    *email or password is incorrect
                  </span>
                )
              }
              {
                user.fetch.status >= 200 && user.fetch.status <= 300 && (
                  <span style={{ position: "absolute", bottom: "-25px" }} className="text-sm font-small text-emerald-600">
                    *login Success
                  </span>
                )
              }
            </div>

            <div style={{ marginTop: "50px" }} className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                disabled={getLogin ? true : false}
                data-testid={TestId.button.container.login.submit_login}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                {getLogin ? "Loading.." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}


export default Login;