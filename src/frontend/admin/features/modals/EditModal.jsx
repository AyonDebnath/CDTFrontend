import { Modal } from "reactstrap";
import { FadeLoader } from "react-spinners";
import { useContext, useEffect, useState } from "react";

import { UserEditContext } from "../../context/user-edit-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import useForm from "../../../shared/hooks/form-hook";

import PropTypes from "prop-types";
import ErrorModal from "../../../shared/elements/ErrorModal";
import Input from "../../../home/elements/form-elements/input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../../../public/frontend/validators";
import { useNavigate, useParams } from "react-router-dom";
import { AdminAuthContext } from "../../../shared/context/admin-auth-context";

export default function EditModal({ curUser }) {
  const userEdit = useContext(UserEditContext);
  const navigate = useNavigate();
  const adminId = useParams().aid;
  const adminAuth = useContext(AdminAuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      fname: {
        value: "",
        isValid: false,
      },
      lname: {
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
      address: {
        value: "",
        isValid: false,
      },
      about: {
        value: "",
        isValid: false,
      },
      zipcode: {
        value: "",
        isValid: false,
      },
      country: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
    },
    true
  );

  useEffect(() => {
    curUser &&
      setFormData(
        {
          fname: {
            value: curUser.fname,
            isValid: true,
          },
          lname: {
            value: curUser.lname,
            isValid: true,
          },
          email: {
            value: curUser.email,
            isValid: true,
          },
          number: {
            value: curUser.number,
            isValid: true,
          },
          address: {
            value: curUser.address,
            isValid: true,
          },
          about: {
            value: curUser.about,
            isValid: true,
          },
          zipcode: {
            value: curUser.zipcode,
            isValid: true,
          },
          country: {
            value: curUser.country,
            isValid: true,
          },
          city: {
            value: curUser.city,
            isValid: true,
          },
        },
        true
      );
  }, [setFormData, curUser]);

  const toggle = () => {
    userEdit.showToggler(false);
  };
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  function errorHandler() {
    clearError();
    window.location.reload();
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/admin/user/info/${curUser.id}`,
        "PATCH",
        JSON.stringify({
          fname: formState.inputs.fname.value,
          lname: formState.inputs.lname.value,
          email: formState.inputs.email.value,
          number: formState.inputs.number.value,
          city: formState.inputs.city.value,
          zipcode: formState.inputs.zipcode.value,
          country: formState.inputs.country.value,
          about: formState.inputs.about.value,
          gender: curUser.gender,
          address: formState.inputs.address.value,
          status: curUser.status,
          password: curUser.password,
          image: curUser.image,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + adminAuth.adminToken,
        }
      );
      userEdit.showToggler(false);
      navigate(`/admin/user-info/${adminId}`);
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
      {!isLoading && curUser && (
        <Modal isOpen={userEdit.show} toggle={toggle} size="lg">
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
                          <div className="avatar-lg p-1">
                            <div className="avatar-title bg-light rounded-circle">
                              <img
                                src={`${curUser.imageURL}`}
                                id="companylogo-img"
                                className="avatar-md rounded-circle object-fit-cover"
                              />
                            </div>
                          </div>
                        </div>
                        <h5 className="fs-13 mt-3">User Image</h5>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div>
                        <label
                          htmlFor="companyname-field"
                          className="form-label"
                        >
                          First Name
                        </label>
                        <Input
                          elem="input"
                          id="fname"
                          type="text"
                          placeholder="Enter Your First Name"
                          errorText="Enter a Valid First Name"
                          className="form-control"
                          onInput={inputHandler}
                          validator={[VALIDATOR_REQUIRE()]}
                          val={curUser.fname}
                          valid={formState.inputs.fname.isValid}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div>
                        <label
                          htmlFor="companyname-field"
                          className="form-label"
                        >
                          Last Name
                        </label>
                        <Input
                          elem="input"
                          id="lname"
                          type="text"
                          placeholder="Enter Your Last Name"
                          errorText="Enter a Valid Last Name"
                          className="form-control"
                          onInput={inputHandler}
                          validator={[VALIDATOR_REQUIRE()]}
                          val={curUser.lname}
                          valid={formState.inputs.lname.isValid}
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
                          val={curUser.email}
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
                          val={curUser.number}
                          valid={formState.inputs.number.isValid}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div>
                        <label
                          htmlFor="companyname-field"
                          className="form-label"
                        >
                          Country
                        </label>
                        <Input
                          elem="input"
                          id="cuntry"
                          type="text"
                          placeholder="Enter Your Resident Country"
                          errorText="Enter a Valid Resident Country"
                          className="form-control"
                          onInput={inputHandler}
                          validator={[VALIDATOR_REQUIRE()]}
                          val={curUser.country}
                          valid={true}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div>
                        <label
                          htmlFor="companyname-field"
                          className="form-label"
                        >
                          City
                        </label>
                        <Input
                          elem="input"
                          id="city"
                          type="text"
                          placeholder="Enter Your Resident City"
                          errorText="Enter a Valid Resident City"
                          className="form-control"
                          onInput={inputHandler}
                          validator={[VALIDATOR_REQUIRE()]}
                          val={curUser.city}
                          valid={true}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div>
                        <label
                          htmlFor="companyname-field"
                          className="form-label"
                        >
                          Zipcode
                        </label>
                        <Input
                          elem="input"
                          id="zipcode"
                          type="text"
                          placeholder="Enter Your ZipCode"
                          errorText="Enter a Valid ZipCode"
                          className="form-control"
                          onInput={inputHandler}
                          validator={[VALIDATOR_REQUIRE()]}
                          val={curUser.zipcode}
                          valid={true}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div>
                        <label
                          htmlFor="companyname-field"
                          className="form-label"
                        >
                          Address
                        </label>
                        <Input
                          elem="input"
                          id="Address"
                          type="text"
                          placeholder="Enter Your Address"
                          errorText="Enter a Valid Address"
                          className="form-control"
                          onInput={inputHandler}
                          validator={[VALIDATOR_REQUIRE()]}
                          val={curUser.address}
                          valid={formState.inputs.address.isValid}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div>
                        <label
                          htmlFor="companyname-field"
                          className="form-label"
                        >
                          About
                        </label>
                        <Input
                          id="about"
                          rows="3"
                          type="text"
                          className="form-control"
                          placeholder="Enter About Description"
                          errorText="Enter a Valid About Description"
                          onInput={inputHandler}
                          validator={[VALIDATOR_REQUIRE()]}
                          val={curUser.about}
                          valid={true}
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

EditModal.propTypes = {
  curUser: PropTypes.object,
};
