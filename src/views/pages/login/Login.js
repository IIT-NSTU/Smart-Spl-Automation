import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { isEmptyOrSpaces } from "src/views/utils";
import "./login.css";
import * as actions from "../../../redux/auth/action/actionCreate";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

function Login({ login, isAuthenticated, isTeacher, isVerified, isStudent }) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const username = event.target.username.value;
    const password = event.target.password.value;
    if (isEmptyOrSpaces(username)) {
      toast.error("Username is required !");
    } else if (isEmptyOrSpaces(password)) {
      toast.error("Password is required !");
    } else {
      setValidated(true);
      login(username, password);
    }
  };
  if (isAuthenticated && isTeacher && isVerified) {
    return <Navigate to="/dashboard/teacher" />;
  } else if (isAuthenticated && isStudent && isVerified) {
    return <Navigate to="/dashboard/student" />;
  } else if (isAuthenticated && !isVerified) {
    return <Navigate to="/verify-email" />;
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    className="row g-3 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        name="username"
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div className="sign-up-as">
                    <h1>Smart SPL Automation System</h1>
                    Sign up as{" "}
                    <Link to="/register/student" className="link">
                      student
                    </Link>{" "}
                    or{" "}
                    <Link to="/register/teacher" className="link">
                      teacher
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

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
    login: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
