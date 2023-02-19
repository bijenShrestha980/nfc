import React from "react";
import EditPage from "../../page/EditPage";

const ManageBiolink = () => {
  return (
    <>
      <div
        className="dashboard-inner-container manage-biolink"
        style={{
          width: "100%",
          float: "initial",
          padding: "0",
          margin: "auto",
        }}
      >
        <div className="container position-relative">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-7">
              <div className="card-container">
                <div className="card card-primary card-manage-biolink pb-5">
                  <div
                    className="card-header d-flex justify-content-between align-items-center"
                    style={{ padding: "15px 30px 8px" }}
                  >
                    <h2>Manage </h2>
                    <div className="d-flex align-items-center">
                      <h5
                        style={{
                          margin: "0 10px",
                          fontSize: "15px",
                          fontWeight: "700",
                        }}
                      >
                        Edit Page
                      </h5>
                      {/* <Switch
                        onChange={handleChange}
                        checked={checked}
                        className="react-switch"
                      /> */}
                    </div>
                  </div>
                  <div className="content-container card-body">
                    {/* {checked ? <EditPage /> : <></>}

                    <BioLinkDetails /> */}
                    <EditPage />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-7 col-md-7 col-lg-4 offset-lg-1 offset-sm-2 mx-auto02">
              {/* <PhoneView /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageBiolink;
