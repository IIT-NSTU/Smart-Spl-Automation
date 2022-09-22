import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { isEmptyOrSpaces } from "../../utils";
import { toast } from "react-toastify";
import axios from "axios";
import * as actions from "../../../redux/auth/action/actionCreate";
import { connect } from "react-redux";
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CRow,
  CForm,
} from "@coreui/react";

const VerifyEmail = ({
  logout,
  isAuthenticated,
  isTeacher,
  isVerified,
  isStudent,
}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const code = event.target.code.value;
    if (isEmptyOrSpaces(code)) {
      toast.error("Code can't be empty!");
    } else {
      axios.defaults.headers = {
        "Content-Type": "application/json",
      };
      axios
        .post("http://127.0.0.1:8000/api/users/verify-account/", {
          email: state.email,
          otp: code,
        })
        .then((response) => {
          toast.success(response.data.message);
          localStorage.setItem("isVerified", "true");
          dispatch(actions.authCheckState());
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };
  console.log("isAuthenticated", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else if (isAuthenticated && isTeacher && isVerified) {
    return <Navigate to="/dashboard/teacher" />;
  } else if (isAuthenticated && isStudent && isVerified) {
    return <Navigate to="/dashboard/student" />;
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          onSubmit={handleSubmit}
        >
          {" "}
          <CRow className="justify-content-center">
            <CCol md={6}>
              <span className="clearfix">
                <h4 className="pt-3">Please verify your email !</h4>
                <p className="text-medium-emphasis float-start">
                  we sent an email to {state.email}
                </p>
              </span>

              <CInputGroup className="input-prepend">
                <CFormInput
                  type="text"
                  name="code"
                  placeholder="Enter 8 digit code"
                />
                <CButton type="submit" color="info">
                  Confirm
                </CButton>
              </CInputGroup>
              <CInputGroup className="input-prepend">
                <CButton
                  color="info"
                  style={{ width: "100%", marginTop: "10px" }}
                  onClick={() => logout()}
                >
                  Logout
                </CButton>
              </CInputGroup>
            </CCol>
          </CRow>
        </CForm>
      </CContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    isTeacher: state.auth.isTeacher,

    isStudent: state.auth.isStudent,
    isVerified: state.auth.isVerified,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
