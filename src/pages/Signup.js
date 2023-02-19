import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
// ASSETS
import logo from "../assets/images/1x/logo.png";
import mobile from "../assets/images/1x/mobile-homepage.png";
import cardTop from "../assets/images/1x/card-top.png";
import { LockIcon, MailIcon, PhoneIcon, UserIcon } from "../handler/Icon";
// REDUCERS
import { useRegisterUserMutation } from "../features/api/userApiSlice";

const Signup = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [registerUser, { isLoading, isSuccess, isError, error, data }] =
    useRegisterUserMutation();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    registerUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError]);

  return (
    <>
      <div className="signup-form before-login">
        <div
          className="verification-container"
          style={{ display: isSuccess ? "block" : "none" }}
        >
          <div className="message-container">
            <div className="text-container">
              <h3>{`A verification link has been sent to .`}</h3>
            </div>
            <div className="button-container">
              <button
                className="btn btn-primary"
                onClick={(e) => navigate("/")}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
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
                        <h2>Signup</h2>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="card-body">
                        <label htmlFor="name">
                          <span>Username</span>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <div className="icon-container">
                                <UserIcon />
                              </div>
                            </div>
                            <input
                              id="name"
                              type="text"
                              placeholder="Type your username"
                              autoComplete="name"
                              className="form-control"
                              {...register("name", {
                                required: "This is required",
                                minLength: {
                                  value: 3,
                                  message: "Must be more than 3 character",
                                },
                              })}
                            />
                          </div>
                          {errors.name && (
                            <CSSTransition
                              in={errors.name}
                              timeout={330}
                              classNames="liveValidateMessage"
                              unmountOnExit
                            >
                              <p className="error-msg">
                                {errors.name && errors.name.message}
                              </p>
                            </CSSTransition>
                          )}
                        </label>

                        <label htmlFor="phone">
                          <span>Mobile Number</span>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <div className="icon-container">
                                <PhoneIcon />
                              </div>
                            </div>
                            <input
                              id="phone"
                              type="number"
                              placeholder="Type your phone number"
                              autoComplete="phone"
                              className="form-control"
                              {...register("phone", {
                                required: "This is required",
                                maxLength: {
                                  value: 10,
                                  message:
                                    "Number must not be more than 10 character",
                                },
                                minLength: {
                                  value: 10,
                                  message:
                                    "Number must not be less than 10 character",
                                },
                              })}
                            />
                          </div>
                          <CSSTransition
                            in={errors.phone}
                            timeout={330}
                            classNames="liveValidateMessage"
                            unmountOnExit
                          >
                            <p className="error-msg">
                              {errors.phone && errors.phone.message}
                            </p>
                          </CSSTransition>
                        </label>

                        <label htmlFor="email">
                          <span>Email</span>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <div className="icon-container">
                                <MailIcon />
                              </div>
                            </div>
                            <input
                              id="email"
                              type="email"
                              autoComplete="email"
                              placeholder="Type your email address"
                              className="form-control"
                              {...register("email", {
                                required: "This is required",
                                pattern: {
                                  value:
                                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                  message: "Invalid email address",
                                },
                              })}
                            />
                          </div>
                          {errors.email && (
                            <CSSTransition
                              in={errors.email}
                              timeout={330}
                              classNames="liveValidateMessage"
                              unmountOnExit
                            >
                              <p className="error-msg">
                                {errors.email && errors.email.message}
                              </p>
                            </CSSTransition>
                          )}
                        </label>

                        <label htmlFor="password">
                          <span>Password</span>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <div className="icon-container">
                                <LockIcon />
                              </div>
                            </div>
                            <input
                              id="password"
                              type="password"
                              placeholder="Type your password"
                              autoComplete="current-password"
                              className="form-control"
                              {...register("password", {
                                required: "This is required",
                                minLength: {
                                  value: 8,
                                  message: "Password must be 8 characters long",
                                },
                                pattern: {
                                  value:
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                                  message:
                                    "Password must contain uppercase, lowercase, number, string and atleast one special character",
                                },
                              })}
                            />
                          </div>
                          <CSSTransition
                            in={errors.password}
                            timeout={330}
                            classNames="liveValidateMessage"
                            unmountOnExit
                          >
                            <p className="error-msg">
                              {errors.password && errors.password.message}
                            </p>
                          </CSSTransition>
                        </label>

                        <label htmlFor="c_password">
                          <span> Confirm Password</span>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <div className="icon-container">
                                <LockIcon />
                              </div>
                            </div>
                            <input
                              id="c_password"
                              type="password"
                              placeholder="Confirm password"
                              className="form-control"
                              {...register("c_password", {
                                required: "This is required",
                                validate: (value) =>
                                  value === password.current ||
                                  "Passwords do not match",
                              })}
                              autoComplete="c_password"
                            />
                          </div>
                          <CSSTransition
                            in={errors.c_password}
                            timeout={330}
                            classNames="liveValidateMessage"
                            unmountOnExit
                          >
                            <p className="error-msg">
                              {errors.c_password && errors.c_password.message}
                            </p>
                          </CSSTransition>
                        </label>

                        <input
                          id="section"
                          type="hidden"
                          value="admin"
                          {...register("section", {
                            required: "Section field is required",
                          })}
                          autoComplete="section"
                        />
                      </div>

                      <div className="card-footer">
                        <button className="btn btn-primary btn-large zoom-in">
                          {isLoading ? "Loading..." : "Sign Up"}
                        </button>
                        <span>
                          {error &&
                            Object.values(error.data.data).map((values, i) => {
                              return (
                                <p className="text-danger mt-2" key={i}>
                                  {values}
                                </p>
                              );
                            })}
                        </span>
                        <div className="text-box">
                          <p className="mb-1">Already have an account?</p>
                          <Link to="/">LOG IN</Link>
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

export default Signup;
