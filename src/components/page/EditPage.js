import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { CSSTransition } from "react-transition-group";
// REDUCERS
import {
  useGetPageByIdMutation,
  useUpdatePageMutation,
} from "../../features/api/pageApiSlice";
// COMPONENTS
import Loader from "../layout/Loader";

function EditPage() {
  const cookies = new Cookies();
  const { id } = useParams();
  const user_id = cookies.get("nfcUid");
  const [yes, setYes] = useState("");
  const [no, setNo] = useState("");
  const [getPageById, { data: page, isLoading, isSuccess }] =
    useGetPageByIdMutation();
  const [
    updatePage,
    {
      data: updatePageData,
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      isError,
      error,
    },
  ] = useUpdatePageMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getPageById({ id: id });
  }, []);

  const onSubmit = (data) => {
    let page = { ...data, user_id: parseInt(user_id) };
    updatePage({ page });
  };
  console.log(errors);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="dashboard-content-container">
      <form onSubmit={handleSubmit(onSubmit)} method="POST">
        {isSuccess && (
          <div className="d-flex flex-column">
            {/* {appState.userRoles &&
            appState.userRoles.data.roles[0].name === "super_admin" && (
              <select
                name=""
                id=""
                className="form-control"
                onChange={(e) =>
                  dispatch({ type: "userChange", value: e.target.value })
                }
                value={state.user.value}
              >
                {appState.userList &&
                  appState.userList.data.map((item, i) => {
                    return <option value={item.email}>{item.name}</option>;
                  })}
              </select>
            )} */}
            <label>
              Page Name
              <input
                type="text"
                className="form-control"
                {...register("name", {
                  required: "This field is required",
                  maxLength: {
                    value: 21,
                    message: "Must be less than 20 character",
                  },
                })}
                defaultValue={page?.data?.page?.name}
              />
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
            <label>
              Page Type
              <select
                className="form-control"
                // readOnly={true}
                // disabled
                {...register("type", { required: "This field is required" })}
                defaultValue={page?.data?.page?.type}
              >
                <option value="">Select page Type</option>
                <option value="bio-link">BioLink</option>
                <option value="links">Links</option>
                <option value="profile">Profile</option>
                <option value="subpage">Sub Page</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="iframe">Iframe</option>
                <option value="file">File</option>
                <option value="books">Books</option>
              </select>
              {errors.type && (
                <CSSTransition
                  in={errors.type}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <p className="error-msg">
                    {errors.type && errors.type.message}
                  </p>
                </CSSTransition>
              )}
            </label>

            <label>
              Active
              <fieldset className="d-flex justify-content-around gap-3 pt-2">
                <div className="d-flex">
                  <input
                    type="radio"
                    name="group"
                    className="form-control"
                    id="yes"
                    value="yes"
                    {...register("active", {
                      required: "This field is required",
                    })}
                  />

                  <label htmlFor="yes">Yes</label>
                </div>
                <div className="d-flex">
                  <input
                    type="radio"
                    name="group"
                    className="form-control"
                    id="no"
                    value="no"
                    {...register("active", {
                      required: "This field is required",
                    })}
                  />
                  <label htmlFor="no">No</label>
                </div>
              </fieldset>
              {errors.active && (
                <CSSTransition
                  in={errors.active}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <p className="error-msg">
                    {errors.active && errors.active.message}
                  </p>
                </CSSTransition>
              )}
            </label>
          </div>
        )}

        <div className="card-footer px-0">
          {/* {state.success && <p className="text-success">{state.success}</p>} */}
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary zoom-in"
              disabled={updateIsLoading}
            >
              {updateIsLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPage;
