import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// REDUCERS
import { useGetPagesQuery } from "../../features/api/pageApiSlice";
// ASSETS
import { DeleteIcon, EditIcon } from "../../handler/Icon";
// COMPONENTS
import Loader from "../layout/Loader";

const Page = () => {
  const { data: pages, isLoading, isError, error } = useGetPagesQuery();

  if (isError) {
    toast.error(error.data.message);
  }
  return (
    <>
      <div className="button-container d-flex mb-2">
        <Link to="/dashboard/page/create" className="btn btn-primary">
          Create page
        </Link>
      </div>
      <div className="row">
        <div className="col-md-12" style={{ overflow: "auto" }}>
          {isLoading ? (
            <Loader />
          ) : (
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">sn</th>
                  <th scope="col">name</th>
                  <th scope="col">type</th>
                  <th scope="col">active</th>
                  <th scope="col">created at</th>
                  <th scope="col">updated at</th>
                  <th scope="col" className="text-center">
                    actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {pages.data.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>{item.active}</td>
                      <td>{item.created_at}</td>
                      <td>{item.updated_at}</td>
                      <td className="d-flex justify-content-center">
                        <Link to={`/dashboard/page/manage/${item.id}`}>
                          <div className="icon-container">
                            <EditIcon props="mx-2 zoom-in" />
                          </div>
                        </Link>
                        <Link to="#">
                          <div className="icon-container">
                            <DeleteIcon props="mx-2 zoom-in" />
                          </div>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
