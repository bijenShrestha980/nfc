import React from "react";
import { User } from "../handler/Icon";

const PersonalInfo = () => {
  return (
    <>
      <div className="personalInfo-outer-container">
        <div className="personalInfo-inner-container">
          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="profile-image d-flex">
                  <div className="left">
                    <div className="image-container">
                      <img
                        src={displayPicture ? displayPicture : <User />}
                        alt=""
                        onClick={triggerPopup}
                      />
                      {state.image.hasErrors === true && (
                        <p className="error-msg">{state.image.message}</p>
                      )}
                    </div>
                    <input
                      type="file"
                      name=""
                      id=""
                      className="form-control"
                      onChange={setPicture}
                      accept="image/png, image/jpeg"
                      ref={inputRef}
                    />
                    {/* <div className="change-overlay" onClick={triggerPopup}>
                  change
                </div> */}
                  </div>
                  <div className="right">
                    <h4>Profile Image</h4>
                    {/* <span>image name heresss</span> */}
                    <div className="button-container">
                      <span className="btn btn-primary" onClick={triggerPopup}>
                        Change Profile Image
                      </span>
                    </div>
                  </div>

                  {state.showCropper && (
                    <ImageCropper
                      image={state.image.value}
                      cancel={() => {
                        dispatch({ type: "cancelCrop" });
                      }}
                      newImage={(image) => newImage(image)}
                    />
                  )}
                </div>
                <label>
                  Identification Number
                  <input
                    type="number"
                    className="form-control"
                    name="identification_number"
                    onChange={(e) =>
                      dispatch({ type: "changeIdNum", value: e.target.value })
                    }
                    value={state.identification_number.value}
                    required
                  />
                </label>
                <label>
                  Full Name
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    onChange={(e) =>
                      dispatch({ type: "nameChange", value: e.target.value })
                    }
                    value={state.full_name.value}
                    required
                    // value={formData.fullName}
                    // onChange={onChange}
                  />
                </label>
                <label>
                  Address
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    onChange={(e) =>
                      dispatch({ type: "changeAddress", value: e.target.value })
                    }
                    value={state.address.value}
                    required
                  />
                </label>
                <label>
                  Landline
                  <input
                    type="number"
                    className="form-control"
                    name="home-phone"
                    onChange={(e) =>
                      dispatch({
                        type: "changeHomePhone",
                        value: e.target.value,
                      })
                    }
                    value={state.home_phone.value}
                    required
                  />
                  {state.home_phone.hasErrors === true && (
                    <p className="error-msg">{state.home_phone.message}</p>
                  )}
                </label>
                <label>
                  Website
                  <input
                    type="text"
                    className="form-control"
                    name="website"
                    onChange={(e) =>
                      dispatch({ type: "changeWebsite", value: e.target.value })
                    }
                    value={state.website.value}
                    required
                  />
                  {state.website.hasErrors === true && (
                    <p className="error-msg">{state.website.message}</p>
                  )}
                </label>
                <label>
                  Say Something About Yourself
                  <input
                    type="text"
                    className="form-control"
                    name="intro"
                    onChange={(e) =>
                      dispatch({ type: "introChange", value: e.target.value })
                    }
                    value={state.intro.value}
                    required
                  />
                </label>
              </div>
              <div className="card-footer">
                <div className="button-container d-flex justify-content-start">
                  <button className="btn btn-primary" disabled="">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
