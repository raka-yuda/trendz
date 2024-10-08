import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { login } from "../../actions/auth";
import Form from "react-validation/build/form";
import DarkModeSwitcher from "../../components/DarkModeSwitcher";

// import Skeleton from "react-loading-skeleton";

// import { MainHead } from "@/common/components";

// type UserLoginAttributes = {
//   username: string;
//   password: string;
// };

const Login = () => {
  const navigate = useNavigate();

  const form = useRef<HTMLFormElement | null>(null);
  const checkBtn = useRef<HTMLButtonElement>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const message = useSelector((state: RootState) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e: any) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e: any) => {
    const password = e.target.value;
    setPassword(password);
  };

  const notify = (message: string) => toast.error(message);

  useEffect(() => {
    const latestMessage = (message as Record<string, string>)?.message
    if (latestMessage) notify((message as Record<string, string>)?.message)
    
  }, [message, dispatch])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // notify();

    setLoading(true);

    if (form.current as any) {
      (form.current as any).validateAll();

      dispatch(login(username, password) as any)
        .then((res: any) => {
          navigate("/");
          window.location.reload();
        })
        .catch((e: Error) => {
          setLoading(false);
          console.log(message)
          // notify((message as Record<string, string>)?.message)
        });
    }
  };


  useEffect(() => {
    console.log('Login Rendered..')
  }, [])

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <React.Fragment>
      {/* <MainHead title="Login" /> */}
      {/* bg-image: https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80 */}
      <div className="w-full h-screen bg-gray-800 dark:bg-boxdark-2 ">
        <div className="container mx-auto h-full ">
          <div className="flex flex-row w-full h-full">
            <div className="absolute left-0 top-0 m-4">
              <DarkModeSwitcher />
            </div>
            <div className="flex justify-center items-center p-4 xl:max-w-[40%] w-full md:basis-1/2 md:ml-auto">
              <div className="flex flex-col justify-between p-6 py-12 w-full bg-white rounded-md shadow-sm md:p-12">
                <div>
                  <h3 className="mb-24 text-2xl font-bold text-center">Trendz</h3>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-start">Login</h3>
                  <Form 
                      onSubmit={handleLogin} 
                      ref={form}
                    >
                    <div className="mt-4">
                      <div>
                        <label className="block mb-2" htmlFor="email">
                          Username
                        </label>
                        <div className="relative">
                          <input
                            required
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            placeholder="Enter your username"
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:text-white"
                          />

                          <span className="absolute right-4 top-4">
                            <svg
                              className="fill-current"
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.5">
                                <path
                                  d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block mb-2">Password</label>
                        <div className="relative">
                          <input
                            required
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            placeholder="6+ Characters, 1 Capital letter"
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:text-white"
                          />

                          <span className="absolute right-4 top-4">
                            <svg
                              className="fill-current"
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.5">
                                <path
                                  d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                  fill=""
                                />
                                <path
                                  d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        {/* {checked ? (
                          <Skeleton />
                        ) : ( */}
                          <button type="submit" className="p-4 mt-4 w-full text-white bg-blue-600 rounded-lg bg-black">
                            Login
                          </button>
                        {/* )} */}
                      </div>
                      <div className="flex items-center mt-8">
                        {/* <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-gray-600 form-checkbox"
                            checked={checked}
                            onChange={handleChange}
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Remember Me
                          </span>
                        </label> */}
                        <a href="#" className="text-sm text-blue-600 ml-auto hover:underline">
                          You&apos;re not registered yet?
                        </a>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;