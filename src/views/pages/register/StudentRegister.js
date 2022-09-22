import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import * as actions from "../../../redux/auth/action/actionCreate";
import { Navigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
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
import { isEmptyOrSpaces } from "src/views/utils";

const StudentRegister = ({
  signUp,
  isAuthenticated,
  isTeacher,
  isVerified,
  isStudent,
}) => {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const username = event.target.username.value;
    const password = event.target.password.value;
    const email = event.target.email.value;
    const cpassword = event.target.cpassword.value;
    const cgpa = event.target.cgpa.value;
    const roll = event.target.roll.value;
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    console.log(event.target);
    if (isEmptyOrSpaces(username)) {
      toast.error("Username is required !");
    } else if (isEmptyOrSpaces(firstName)) {
      toast.error("First name is required !");
    } else if (isEmptyOrSpaces(lastName)) {
      toast.error("Last name is required !");
    } else if (isEmptyOrSpaces(password)) {
      toast.error("Password is required !");
    } else if (isEmptyOrSpaces(cpassword)) {
      toast.error("Confirm Password is required !");
    } else if (isEmptyOrSpaces(email)) {
      toast.error("Email is required !");
    } else if (isEmptyOrSpaces(cgpa)) {
      toast.error("Cgpa is required !");
    } else if (isEmptyOrSpaces(roll)) {
      toast.error("Roll is required !");
    } else {
      setValidated(true);
      signUp(
        username,
        firstName,
        lastName,
        email,
        roll,
        cgpa,
        password,
        cpassword
      );
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
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm noValidate validated={validated} onSubmit={handleSubmit}>
                  <h1>Register for student</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      name="username"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="First Name" name="firstName" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Last Name" name="lastName" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      name="email"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      name="cpassword"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput type="text" placeholder="Cgpa" name="cgpa" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Roll Number"
                      name="roll"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
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
    signUp: (
      username,
      firstname,
      lastname,
      email,
      roll,
      cgpa,
      password,
      confirm_password
    ) =>
      dispatch(
        actions.studentAuthSignUp(
          username,
          firstname,
          lastname,
          email,
          roll,
          cgpa,
          password,
          confirm_password
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentRegister);
