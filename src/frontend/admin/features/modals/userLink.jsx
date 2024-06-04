import PropTypes from "prop-types";
import Input from "../../../home/elements/form-elements/input";

import useForm from "../../../shared/hooks/form-hook";

import { Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
import { useContext, useState } from "react";

import { VALIDATOR_REQUIRE } from "../../../../../public/frontend/validators";
import { FaSearch } from "react-icons/fa";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useNavigate, useParams } from "react-router-dom";
import { AdminAuthContext } from "../../../shared/context/admin-auth-context";
import { UserLinkContext } from "../../context/user-link-context";

export default function LinkModal({ curId }) {
  const search = useContext(UserLinkContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const aID = useParams().aid;
  const adminAuth = useContext(AdminAuthContext);
  const [user, setUser] = useState();

  const [formState, inputHandler] = useForm(
    {
      search: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const toggle = () => {
    search.showToggler(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/admin/user-info/search/${
          formState.inputs.search.value
        }`
      );
      setUser(responseData.user);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLink = async () => {
    try {
      const responseData = await sendRequest(
        `${
          import.meta.env.VITE_SERVER_NAME
        }api/admin/user-appointment/link/${curId}`,
        "POST",
        JSON.stringify({
          userId: user.id,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + adminAuth.adminToken,
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal isOpen={search.show} toggle={toggle} size="xl">
      <ModalHeader toggle={toggle}>Link User to Appointment</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <Label className="d-block text-center">
            Enter the email or number to find the user to link
          </Label>
          <div className="d-flex justify-content-center mt-5">
            <div className="form-icon w-50">
              <Input
                id="search"
                type="text"
                elem="input"
                className="form-control"
                placeholder="user number/email"
                errorText="Please Enter a Valid Number/Email"
                validator={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <button
              disabled={!formState.isValid}
              type="submit"
              className="btn btn-success"
            >
              <FaSearch style={{ marginTop: "3px", marginRight: "7px" }} />
              <span>search</span>
            </button>
          </div>
        </form>
        {user ? (
          <div className="container">
            <div className="row">
              <div className="col-1"></div>
              <div className="col-10">
                <table className="table table-nowrap">
                  <thead>
                    <tr>
                      <th scope="col" style={{ textAlign: "center" }}>
                        User Name
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        User Email
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        User Number
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {user.fname} {user.lname}
                      </td>
                      <td style={{ textAlign: "center" }}>{user.email}</td>
                      <td style={{ textAlign: "center" }}>{user.number}</td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            handleLink(user.id);
                          }}
                        >
                          Link
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-1"></div>
            </div>
          </div>
        ) : (
          <p className="text-center mt-5">No user found</p>
        )}
      </ModalBody>
      <ModalFooter>
        <button
          className="btn rounded-pill btn-danger waves-effect waves-light"
          onClick={toggle}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
}

LinkModal.propTypes = {
  curId: PropTypes.string,
};
