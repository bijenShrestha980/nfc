import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
// ASSETS
import { LockIcon, UserIcon } from "../handler/Icon";
import logo from "../assets/images/1x/logo.png";
import mobile from "../assets/images/1x/mobile-homepage.png";
import cardTop from "../assets/images/1x/card-top.png";
// REDUCERS
import { useLoginUserMutation } from "../features/api/userApiSlice";
import { setAuth } from "../features/appSlice/appSlice";

const Login = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loginUser, { isLoading, isSuccess, isError, error, data }] =
    useLoginUserMutation();

  const onSubmit = (data) => {
    loginUser(data);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      cookies.set("nfcToken", data.data.token, {
        path: "/",
        expires: new Date(Date.now() + 25920000),
      });
      cookies.set("nfcUid", data.data.user_id, {
        path: "/",
        expires: new Date(Date.now() + 25920000),
      });
      dispatch(setAuth({ token: data.data.token, user_id: data.data.user_id }));
      toast.success(data.message);
      navigate("/dashboard");
    }
  }, [isError, isSuccess]);

  return (
    <>
      <div className="login-form before-login">
        <header className="header">
          <div className="container">
            <div className="logo-container">
              <img src={logo} alt="" />
            </div>
          </div>
        </header>
        <div className="main-body">
          <div className="container">
            <div className="row">
              <div className="col-xl-5 offset-xl-1 col-lg-5">
                <div className="image-outer-container">
                  <div className="image-container">
                    <img src={mobile} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5 offset-lg-1">
                <div className="card-container">
                  <div className="card">
                    <div className="card-header">
                      <div className="image-container">
                        <img src={cardTop} alt="" />
                      </div>
                      <div className="header-box">
                        <h2>Login </h2>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="card-body">
                        <label>
                          <span>Email / Mobile Number</span>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <div className="icon-container">
                                <UserIcon className="icon" />
                              </div>
                            </div>
                            <input
                              type="email"
                              placeholder="Type your email address or mobile number"
                              className="form-control"
                              {...register("email", {
                                pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                              })}
                            />
                          </div>
                        </label>

                        <label>
                          <span>Password</span>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <div className="icon-container">
                                <LockIcon className="icon" />
                              </div>
                            </div>
                            <input
                              type="password"
                              placeholder="Type your password"
                              className="form-control"
                              {...register("password", { required: true })}
                            />
                            <div className="input-group-append">
                              <div className="icon-container">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 576 512"
                                >
                                  <path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </label>
                        <div className="input-group align-items-center check">
                          <input type="checkbox" />
                          <span>Remember Me</span>
                        </div>
                        <div className="text-box d-flex justify-content-end">
                          <Link to="/forgotPassword"> Forgot Password? </Link>
                        </div>
                      </div>
                      <div className="card-footer">
                        <button className="btn btn-primary btn-large zoom-in">
                          {isLoading ? "Loging in ..." : "Login"}
                        </button>
                        <div className="text-box">
                          <Link className="text-small" to="/signup">
                            Don't have an account?
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
