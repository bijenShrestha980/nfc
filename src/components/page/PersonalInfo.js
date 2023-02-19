import React, { useState, useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import { useForm } from "react-hook-form";
import { CSSTransition } from "react-transition-group";
// ASSETS
import avatar from "../../assets/images/avatar.png";
// REDUCERS
import { useUserInfoMutation } from "../../features/api/userApiSlice";
// import ImageCropper from "../../../Components/ImageCropper";

// import countryCode from "../assets/data/countryCode.json";
// import { COUNTRIES } from "../../../assets/data/countries";
export default function PersonalInfo() {
  const cookies = new Cookies();
  const inputRef = useRef();
  const user_id = cookies.get("nfcUid");
  const [displayPicture, setDisplayPicture] = useState();
  const [imageFile, setImageFile] = useState();
  const triggerPopup = () => inputRef.current.click();
  const [
    userInfo,
    { isLoading, isSuccess, isError, error, data: infoResponse },
  ] = useUserInfoMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function setPicture(e) {
    console.log("before set picture");
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      console.log("afttter seimage");
      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setDisplayPicture(reader.result);
      });
    }
  }

  //   const newImage = (image) => {
  //     // console.log('CROPPED IMAGE', image)
  //     // dispatch({ type: "imageAsCroppedFile", value: image });
  //     setDisplayPicture(image);
  //     //convert image url to file type
  //     fetch(image)
  //       .then((res) => res.blob())
  //       .then((blob) => {
  //         console.log(blob);
  //         let extension = blob.type.split("/");
  //         setImageFile(
  //           new File([blob], `image.${extension[1]}`, {
  //             type: blob.type,
  //           })
  //         );
  //       });
  //   };

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();

    Object.entries(data).map((value) => {
      formData.append(value[0], value[1]);
    });
    formData.append("image", imageFile);
    userInfo({ formData });
  };
  return (
    <div className="personalInfo-outer-container">
      <div className="personalInfo-inner-container">
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <div className="profile-image d-flex">
                <div className="left">
                  <div className="image-container">
                    <img
                      src={displayPicture ? displayPicture : avatar}
                      onClick={triggerPopup}
                    />
                    {/* {state.image.hasErrors === true && (
                      <p className="error-msg">{state.image.message}</p>
                    )} */}
                  </div>
                  <input
                    type="file"
                    className="form-control"
                    onChange={setPicture}
                    accept="image/png, image/jpeg"
                    ref={inputRef}
                  />
                </div>
                <div className="right">
                  <h4>Profile Image</h4>
                  <div className="button-container">
                    <span className="btn btn-primary" onClick={triggerPopup}>
                      Change Profile Image
                    </span>
                  </div>
                </div>

                {/* {state.showCropper && (
                  <ImageCropper
                    image={state.image.value}
                    cancel={() => {
                      dispatch({ type: "cancelCrop" });
                    }}
                    newImage={(image) => newImage(image)}
                  />
                )} */}
              </div>
              <CSSTransition
                in={errors.picture}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <p className="error-msg">
                  {errors.picture && errors.picture.message}
                </p>
              </CSSTransition>
              <label>
                Identification Number
                <input
                  type="number"
                  className="form-control"
                  {...register("identification_number", {
                    required: "This field is required",
                    maxLength: {
                      value: 21,
                      message: "Must be less than 20 character",
                    },
                  })}
                />
                <CSSTransition
                  in={errors.identification_number}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <p className="error-msg">
                    {errors.identification_number &&
                      errors.identification_number.message}
                  </p>
                </CSSTransition>
              </label>
              <label>
                Full Name
                <input
                  type="text"
                  className="form-control"
                  {...register("full_name", {
                    required: "This field is required",
                    maxLength: {
                      value: 21,
                      message: "Must be less than 20 character",
                    },
                  })}
                />
                <CSSTransition
                  in={errors.full_name}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <p className="error-msg">
                    {errors.full_name && errors.full_name.message}
                  </p>
                </CSSTransition>
              </label>
              <label>
                Address
                <input
                  type="text"
                  className="form-control"
                  {...register("address", {
                    required: "This field is required",
                    maxLength: {
                      value: 21,
                      message: "Must be less than 20 character",
                    },
                  })}
                />
                <CSSTransition
                  in={errors.address}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <p className="error-msg">
                    {errors.address && errors.address.message}
                  </p>
                </CSSTransition>
              </label>
              <label>
                Landline
                <div className="d-flex position-relative">
                  {/* <span
                    className="position-absolute"
                    style={{
                      height: "30px",
                      height: "30px",
                      padding: "7px 10px",
                      top: "3px",
                      objectFit: "contain",
                    }}
                  >
                    <Flag
                      code={state.code.iso}
                      style={{
                        height: "25px",
                        width: "25px",
                        objectFit: "contain",
                      }}
                    />
                  </span>
                  <select
                    type="number"
                    placeholder="Type your phone number"
                    onChange={(e) =>
                      dispatch({
                        type: "codeChange",
                        value: e.target.value,
                      })
                    }
                    value={state.code.value}
                    style={{
                      width: "50px",
                      opacity: "0",
                      borderRight: "1px solid #b0b0b0",
                    }}
                  >
                    {COUNTRIES.map((item, i) => {
                      return (
                        <option value={item.prefix} key={i}>
                          {item.name}({item.prefix})
                        </option>
                      );
                    })}
                  </select> */}
                  <input
                    type="number"
                    className="form-control"
                    {...register("home_phone", {
                      required: "This field is required",
                      maxLength: {
                        value: 21,
                        message: "Must be less than 20 character",
                      },
                    })}
                  />
                </div>
                <CSSTransition
                  in={errors.home_phone}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <p className="error-msg">
                    {errors.home_phone && errors.home_phone.message}
                  </p>
                </CSSTransition>
              </label>
              <label>
                Website
                <input
                  type="text"
                  className="form-control"
                  name="website"
                  {...register("website", {
                    required: "This field is required",
                    maxLength: {
                      value: 21,
                      message: "Must be less than 20 character",
                    },
                  })}
                />
                <CSSTransition
                  in={errors.website}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <p className="error-msg">
                    {errors.website && errors.website.message}
                  </p>
                </CSSTransition>
              </label>
              <label>
                Say Something About Yourself
                <input
                  type="text"
                  className="form-control"
                  {...register("intro", {
                    required: "This field is required",
                    maxLength: {
                      value: 21,
                      message: "Must be less than 20 character",
                    },
                  })}
                />
                <CSSTransition
                  in={errors.intro}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <p className="error-msg">
                    {errors.intro && errors.intro.message}
                  </p>
                </CSSTransition>
              </label>
            </div>
            <div className="card-footer">
              <div className="button-container d-flex justify-content-end">
                <button className="btn btn-primary zoom-in" disabled="">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
