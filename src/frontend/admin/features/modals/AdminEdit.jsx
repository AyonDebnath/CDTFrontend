import { Modal } from "reactstrap";
import { FadeLoader } from "react-spinners";
import { useContext, useEffect } from "react";

import { useHttpClient } from "../../../shared/hooks/http-hook";

import useForm from "../../../shared/hooks/form-hook";

import PropTypes from "prop-types";
import ErrorModal from "../../../shared/elements/ErrorModal";
import Input from "../../../home/elements/form-elements/input";
import Selector from "../../../home/elements/form-elements/Selector";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../../../public/frontend/validators";
import { useNavigate, useParams } from "react-router-dom";
import { AdminEditContext } from "../../context/admin-edit-context";
import { AdminAuthContext } from "../../../shared/context/admin-auth-context";

export default function AdminEditModal({ curAdmin }) {
  const adminEdit = useContext(AdminEditContext);
  const navigate = useNavigate();
  const adminId = useParams().aid;
  const adminAuth = useContext(AdminAuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      number: {
        value: "",
        isValid: false,
      },
      role: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    true
  );

  useEffect(() => {
    curAdmin &&
      setFormData(
        {
          name: {
            value: curAdmin.name,
            isValid: true,
          },
          email: {
            value: curAdmin.email,
            isValid: true,
          },
          number: {
            value: curAdmin.number,
            isValid: true,
          },
          role: {
            value: curAdmin.about,
            isValid: true,
          },
          password: {
            value: curAdmin.password,
            isValid: true,
          },
        },
        true
      );
  }, [setFormData, curAdmin]);

  const toggle = () => {
    adminEdit.showToggler(false);
  };
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  function errorHandler() {
    clearError();
    window.location.reload();
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("email", formState.inputs.email.value);
      formData.append("number", formState.inputs.number.value);
      formData.append("role", formState.inputs.role.value);
      formData.append("password", curAdmin.password);
      formData.append("image", curAdmin.image);
      formData.append("imageURL", curAdmin.imageURL);
      await sendRequest(
        `http://localhost:5000/api/admin/info/${curAdmin.id}`,
        "PATCH",
        formData,
        { Authorization: "Bearer " + adminAuth.adminToken }
      );
      adminEdit.showToggler(false);
      navigate(`/admin/admin-manage/${adminId}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <FadeLoader
          cssOverride={{
            height: "100%",
            position: "absolute",
            top: "40%",
            left: "50%",
            zIndex: "2000",
          }}
          color="#f43e18"
        />
      )}
      {!isLoading && curAdmin && (
        <Modal isOpen={adminEdit.show} toggle={toggle} size="lg">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0">
              <div className="modal-header bg-info-subtle p-3">
                <h5 className="modal-title" id="exampleModalLabel"></h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggle}
                  id="close-modal"
                ></button>
              </div>
              <form
                className="tablelist-form"
                autoComplete="off"
                onSubmit={submitHandler}
              >
                <div className="modal-body">
                  <input type="hidden" id="id-field" />
                  <div className="row g-3">
                    <div className="col-lg-12">
                      <div className="text-center">
                        <div className="position-relative d-inline-block">
                          {/* <div className="position-absolute bottom-0 end-0">
                            <label
                              htmlFor="company-logo-input"
                              className="mb-0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title="Select Image"
                            >
                              <div className="avatar-xs cursor-pointer">
                                <div className="avatar-title bg-light border rounded-circle text-muted">
                                  <i className="ri-image-fill"></i>
                                </div>
                              </div>
                            </label>
                            <input
                              className="form-control d-none"
                              value=""
                              id="company-logo-input"
                              type="file"
                              accept="image/png, image/gif, image/jpeg"
                            />
                          </div> */}
                          <div className="avatar-lg p-1">
                            <div className="avatar-title bg-light rounded-circle">
                              <img
                                src={`${curAdmin.imageURL}`}
                                id="companylogo-img"
                                className="avatar-md rounded-circle object-fit-cover"
                              />
                            </div>
                          </div>
                        </div>
                        <h5 className="fs-13 mt-3">Admin Image</h5>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div>
                        <label
                          htmlFor="companyname-field"
                          className="form-label"
                        >
                          Name
                        </label>
                        <Input
                          elem="input"
                          id="name"
                          type="text"
                          placeholder="Enter Your Name"
                          errorText="Enter a Valid Name"
                          className="form-control"
                          onInput={inputHandler}
                          validator={[VALIDATOR_REQUIRE()]}
                          val={curAdmin.name}
                          valid={formState.inputs.name.isValid}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div>
                        <label
                          htmlFor="companyname-field"
                          className="form-label"
                        >
                          Email
                        </label>
                        <Input
                          elem="input"
                          id="email"
                          type="text"
                          placeholder="Enter Your Email Address"
                          errorText="Enter a Valid Email Address"
                          className="form-control"
                          onInput={inputHandler}
                          validator={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                          val={curAdmin.email}
                          valid={formState.inputs.email.isValid}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div>
                        <label
                          htmlFor="companyname-field"
                          className="form-label"
                        >
                          Phone Number
                        </label>
                        <Input
                          elem="input"
                          id="number"
                          type="text"
                          placeholder="Enter Your Phone Number"
                          errorText="Enter a Valid Phone Number"
                          className="form-control"
                          onInput={inputHandler}
                          validator={[VALIDATOR_REQUIRE()]}
                          val={curAdmin.number}
                          valid={formState.inputs.number.isValid}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div>
                        <label
                          htmlFor="companyname-field"
                          className="form-label"
                        >
                          Role
                        </label>
                        <Selector
                          id="role"
                          validator={[VALIDATOR_REQUIRE()]}
                          placeholder="Select Admin Role"
                          val={curAdmin.role}
                          valid={formState.inputs.role.isValid}
                          selectArray={["SUPER", "INSTRUCTOR"]}
                          onInput={inputHandler}
                          ClassName="mb-20"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div>
                        <label
                          htmlFor="companyname-field"
                          className="form-label"
                        >
                          Password
                        </label>
                        <Input
                          elem="input"
                          id="name"
                          type="text"
                          placeholder="Enter New Password"
                          errorText="Enter a New Password"
                          className="form-control"
                          onInput={inputHandler}
                          validator={[VALIDATOR_REQUIRE()]}
                          val={curAdmin.password}
                          valid={formState.inputs.password.isValid}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="hstack gap-2 justify-content-end">
                    <button
                      className="btn rounded-pill btn-danger waves-effect waves-light"
                      onClick={toggle}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success"
                      id="edit-btn"
                      disabled={!!formState.isValid}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

AdminEditModal.propTypes = {
  curAdmin: PropTypes.object,
};
