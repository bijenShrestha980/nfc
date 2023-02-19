import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { CSSTransition } from "react-transition-group";
// REDUCERS
import { useCreatePageMutation } from "../../features/api/pageApiSlice";

const CreatePage = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const user_id = cookies.get("nfcUid");
  const [
    createPage,
    { isLoading, isSuccess, isError, error, data: pageResponse },
  ] = useCreatePageMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const pageType = [
    { value: "", label: "Select page type" },
    { value: "bio-link", label: "Bio Link" },
    { value: "profile", label: "Profile" },
    { value: "links", label: "Link" },
    { value: "image", label: "Image" },
    { value: "video", label: "Video" },
    { value: "iframe", label: "Iframe" },
  ];

  const onSubmit = (data) => {
    let page = { ...data, user_id: user_id };
    createPage({ page });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      toast.success(pageResponse.message);
      navigate(`manage/${pageResponse.data.id}`);
    }
  }, [isError, isSuccess]);

  return (
    <>
      <div className="dashboard-content-container">
        {/* <div className="btn-back" onClick={(e) => history.goBack()}>
          &larr; back
        </div> */}
        <div className="card card-primary">
          <div className="card-header">
            <h2>Create a new Page</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <label>
                Name
                <input
                  type="text"
                  className="form-control"
                  {...register("name", {
                    required: true,
                    maxLength: {
                      value: 21,
                      message: "Must be less than 20 character",
                    },
                  })}
                />
              </label>
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
              <label>
                Type
                <select
                  className="form-control"
                  {...register("type", { required: true })}
                >
                  {pageType.map((item, i) => {
                    return (
                      <option value={item.value} key={i}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
              </label>

              <label>
                Active
                <fieldset
                  id="group"
                  className="d-flex justify-content-around gap-3 pt-2"
                >
                  <div className="d-flex">
                    <input
                      type="radio"
                      name="group"
                      className="form-control"
                      id="yes"
                      value="yes"
                      {...register("active", { required: true })}
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
                      {...register("active", { required: true })}
                    />
                    <label htmlFor="no">No</label>
                  </div>
                </fieldset>
              </label>
              <div className="card-footer">
                <button
                  className="btn btn-primary zoom-in"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading" : "Create"}
                </button>
              </div>
            </div>
          </form>
          {/* {state.error && (
            <p className="text-danger text-center">{state.error}</p>
          )}
          {state.success && (
            <p className="text-sucess text-center">{state.success}</p>
          )} */}
        </div>
      </div>
    </>
  );
};

export default CreatePage;
