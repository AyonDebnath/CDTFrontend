import ErrorModal from "../../shared/elements/ErrorModal";
import Input from "../../home/elements/form-elements/input";

import useForm from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useContext, useState, useEffect } from "react";
import { AdminAuthContext } from "../../shared/context/admin-auth-context";

import { FadeLoader } from "react-spinners";
import {
  VALIDATOR_LESSON,
  VALIDATOR_REQUIRE,
} from "../../../../public/frontend/validators";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCourse() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [featureElem, setFeatureElem] = useState();
  const [courseData, setCourseData] = useState();
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      number: {
        value: "",
        isValid: false,
      },
      features: {
        value: "",
        isValid: false,
      },
      duration: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const adminId = useParams().aid;
  const adminAuth = useContext(AdminAuthContext);
  const navigate = useNavigate();
  const courseId = useParams().cid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_SERVER_NAME}api/admin/course/info/${courseId}`
        );
        setCourseData(responseData.course);
        responseData.course && setFeatures(responseData.course);

        responseData.course &&
          setFormData(
            {
              name: {
                value: responseData.course.name,
                isValid: true,
              },
              price: {
                value: responseData.course.price,
                isValid: true,
              },
              number: {
                value: responseData.course.number,
                isValid: true,
              },
              features: {
                value: responseData.course.featureArray?.length,
                isValid: true,
              },
              duration: {
                value: responseData.course.duration,
              },
            },
            true
          );
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    const setFeatures = (courseDets) => {
      if (courseDets && courseDets.featureArray.length > 0) {
        let featureElement = [];
        for (let i = 0; i < courseDets?.featureArray.length; i++) {
          featureElement.push(
            <div className="form-floating" key={i}>
              <input
                id={`feature${i}`}
                type="text"
                defaultValue={courseDets.featureArray[i]}
                placeholder="Please Enter The Feature"
                className="form-control"
                required
              />
              <label htmlFor={`feature${i}`}>Feature {i + 1}</label>
            </div>
          );
        }
        setFeatureElem(featureElement);
      }
    };
  }, [sendRequest, setFormData, courseId]);

  async function submitHandler(event) {
    event.preventDefault();
    let featureValArray = [];
    for (let i = 0; i < featureElem?.length; i++) {
      featureValArray.push(event.target[i + 3].value);
    }
    let arr = JSON.stringify(featureValArray);
    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("price", formState.inputs.price.value);
      formData.append("number", formState.inputs.number.value);
      formData.append("duration", formState.inputs.duration.value);
      formData.append("featureArray", arr);
      await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/admin/course-create`,
        "POST",
        formData,
        { Authorization: "Bearer " + adminAuth.adminToken }
      );
      navigate(`/admin/${adminId}`);
    } catch (err) {
      console.log(err.message);
    }
  }
  function errorHandler() {
    clearError();
    window.location.reload();
  }

  const createFeatures = () => {
    console.log(formState.inputs.features.value);
    if (formState.inputs.features.value) {
      let featureElement = [];
      for (let i = 0; i < formState.inputs.features.value; i++) {
        featureElement.push(
          <div className="form-floating" key={i}>
            <input
              id={`feature${i}`}
              type="text"
              value={courseData.featureArray[i]}
              placeholder="Please Enter The Feature"
              className="form-control"
              required
            />
            <label htmlFor={`feature${i}`}>Feature {i + 1}</label>
          </div>
        );
      }
      setFeatureElem(featureElement);
    }
  };

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
      {!isLoading && courseData && (
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6 col-12">
            <div className="card">
              <div className="card-header">
                <h4>Create A Course</h4>
              </div>
              <div className="card-body">
                {/* <!-- Input with Placeholder --> */}
                <form onSubmit={submitHandler}>
                  <div className="row g-3">
                    <div className="form-floating">
                      <Input
                        id="name"
                        elem="input"
                        type="text"
                        placeholder="Please Enter Course Name"
                        className="form-control"
                        errorText="Please Enter a Valid Course Name"
                        validator={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        val={formState.inputs.name.value}
                        valid={formState.inputs.name.isValid}
                      />
                      <label htmlFor="street">Course Name</label>
                    </div>
                    <div className="form-floating">
                      <Input
                        id="price"
                        elem="input"
                        type="number"
                        placeholder="Please Enter Price of the Course"
                        className="form-control"
                        errorText="Please Enter a Valid Price"
                        onInput={inputHandler}
                        validator={[VALIDATOR_REQUIRE()]}
                        numVal={parseInt(formState.inputs.price.value)}
                        valid={formState.inputs.price.isValid}
                      />
                      <label htmlFor="city">Price</label>
                    </div>
                    <div className="form-floating">
                      <Input
                        elem="input"
                        id="number"
                        type="number"
                        className="form-control"
                        placeholder="Please Enter Number of Lessons"
                        errorText="Please Enter a Valid Number of Lessons"
                        validator={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        numVal={parseInt(formState.inputs.number.value)}
                        valid={formState.inputs.number.isValid}
                      />
                      <label htmlFor="zipCode">Number of Lessons</label>
                    </div>
                    <div className="form-floating">
                      <Input
                        elem="input"
                        id="duration"
                        type="number"
                        className="form-control"
                        placeholder="Please Enter Duration of Lessons"
                        errorText="Please Enter a Valid Duration for Lessons"
                        validator={[VALIDATOR_REQUIRE(), VALIDATOR_LESSON()]}
                        onInput={inputHandler}
                        numVal={parseInt(formState.inputs.duration.value)}
                        valid={formState.inputs.duration.isValid}
                      />
                      <label htmlFor="zipCode">Duration of Lessons</label>
                    </div>
                    {featureElem}
                    <div className="form-floating">
                      <Input
                        elem="input"
                        id="features"
                        type="number"
                        className="form-control"
                        placeholder="Please Enter a Valid Number of Features"
                        validator={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        numVal={formState.inputs.features.value}
                        valid={formState.inputs.features.isValid}
                      />
                      <label htmlFor="features">Number of Features</label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center gap-4">
                    <div>
                      <span
                        onClick={createFeatures}
                        className="btn btn-success bg-gradient waves-effect waves-light"
                      >
                        Create Features
                      </span>
                    </div>
                    <div>
                      <span
                        onClick={() => {
                          setFeatureElem();
                        }}
                        className="btn btn-danger bg-gradient waves-effect waves-light"
                      >
                        Reset Features
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!formState.isValid}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      )}
    </>
  );
}
