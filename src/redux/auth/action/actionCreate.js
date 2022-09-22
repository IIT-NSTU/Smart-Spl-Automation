import * as actionType from "./actionTypes";
import { toast } from "react-toastify";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionType.AUTH_START,
  };
};

export const authSuccess = (
  token,
  isTeacher,
  username,
  email,
  isStudent,
  isVerified
) => {
  return {
    type: actionType.AUTH_SUCCESS,
    token: token,
    isTeacher: isTeacher,
    isStudent: isStudent,
    isVerified: isVerified,
    username: username,
    email: email,
  };
};

export const authFailure = (error) => {
  return {
    type: actionType.AUTH_FAILURE,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");

  localStorage.removeItem("isTeacher");
  localStorage.removeItem("isStudent");
  localStorage.removeItem("isVerified");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  return {
    type: actionType.AUTH_LOGOUT,
  };
};

export const checkAuthTimeOut = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("http://127.0.0.1:8000/api/users/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;
        const isTeacher = response.data.is_teacher;
        const isStudent = response.data.is_student;
        const isVerified = response.data.is_verified;
        const username = response.data.username;
        const email = response.data.email;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("isTeacher", isTeacher);
        localStorage.setItem("isStudent", isStudent);
        localStorage.setItem("isVerified", isVerified);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(
          authSuccess(token, isTeacher, username, email, isStudent, isVerified)
        );
        dispatch(checkAuthTimeOut(3600));
      })
      .catch((error) => {
        dispatch(authFailure(error.response ? error.response.data : error));
        toast.error(error.response.data.non_field_errors[0]);
      });
  };
};

export const studentAuthSignUp = (
  username,
  firstname,
  lastname,
  email,
  roll,
  cgpa,
  password,
  confirm_password
) => {
  return (dispatch) => {
    dispatch(authStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("http://127.0.0.1:8000/api/users/student/sign-up/", {
        username: username,
        email: email,
        password: password,
        confirm_password: confirm_password,
        first_name: firstname,
        last_name: lastname,
        roll: roll,
        cgpa: cgpa,
      })
      .then((response) => {
        console.log(response.data);
        const token = response.data.token;
        const isTeacher = response.data.is_teacher;
        const isStudent = response.data.is_student;
        const isVerified = response.data.is_verified;
        const username = response.data.username;
        const email = response.data.email;
        const expirationDate = new Date(new Date() + 3600 * 1000);

        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("isTeacher", isTeacher);
        localStorage.setItem("isStudent", isStudent);
        localStorage.setItem("isVerified", isVerified);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);

        dispatch(
          authSuccess(token, isTeacher, username, email, isStudent, isVerified)
        );

        dispatch(checkAuthTimeOut(3600));
      })
      .catch((error) => {
        dispatch(authFailure(error.response.data));
        console.log(error.response);
      });
  };
};

export const teacherAuthSignUp = (
  username,
  firstname,
  lastname,
  email,
  designation,
  password,
  confirm_password
) => {
  return (dispatch) => {
    dispatch(authStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("http://127.0.0.1:8000/api/users/teacher/sign-up/", {
        username: username,
        email: email,
        password: password,
        confirm_password: confirm_password,
        first_name: firstname,
        last_name: lastname,
        designation: designation,
      })
      .then((response) => {
        console.log(response.data);
        const token = response.data.token;
        const isTeacher = response.data.is_teacher;
        const isStudent = response.data.is_student;
        const isVerified = response.data.is_verified;
        const username = response.data.username;
        const email = response.data.email;
        const expirationDate = new Date(new Date() + 3600 * 1000);

        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("isTeacher", isTeacher);
        localStorage.setItem("isStudent", isStudent);
        localStorage.setItem("isVerified", isVerified);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);

        dispatch(
          authSuccess(token, isTeacher, username, email, isStudent, isVerified)
        );

        dispatch(checkAuthTimeOut(3600));
      })
      .catch((error) => {
        dispatch(authFailure(error.response.data));
        console.log(error.response);
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const isTeacher =
      localStorage.getItem("isTeacher") == "false" ? false : true;
    const isStudent =
      localStorage.getItem("isStudent") == "false" ? false : true;
    const isVerified =
      localStorage.getItem("isVerified") == "false" ? false : true;
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));

      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(
          authSuccess(token, isTeacher, username, email, isStudent, isVerified)
        );

        dispatch(
          checkAuthTimeOut((expirationDate - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
