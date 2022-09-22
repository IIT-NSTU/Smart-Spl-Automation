import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import { connect } from "react-redux";
import * as actions from "./redux/auth/action/actionCreate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const StudentRegister = React.lazy(() =>
  import("./views/pages/register/StudentRegister")
);
const TeacherRegister = React.lazy(() =>
  import("./views/pages/register/TeacherRegister")
);
const VerifyEmail = React.lazy(() =>
  import("./views/pages/VerifyEmail/VerifyEmail")
);

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.isLoading ? (
          <div className="pt-3 text-center">
            <div className="sk-spinner sk-spinner-pulse"></div>
          </div>
        ) : (
          <BrowserRouter>
            <Suspense fallback={loading}>
              <Routes>
                <Route
                  exact
                  path="/register/student"
                  name="Register Page"
                  element={<StudentRegister />}
                />
                <Route
                  exact
                  path="/register/teacher"
                  name="Register Page"
                  element={<TeacherRegister />}
                />

                <Route
                  exact
                  path="/verify-email"
                  name=""
                  element={<VerifyEmail />}
                />

                <Route exact path="/" name="Login Page" element={<Login />} />
                <Route path="*" name="Home" element={<DefaultLayout />} />
              </Routes>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </Suspense>
          </BrowserRouter>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    isTeacher: state.auth.isTeacher,
    username: state.auth.username,
    email: state.auth.email,
    isLoading: state.auth.loding,
    isStudent: state.auth.isStudent,
    isVerified: state.auth.isVerified,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
