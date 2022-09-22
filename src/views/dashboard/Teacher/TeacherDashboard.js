import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../Teacher/dashboard.css";
import reactIMG from "../../../assets/images/theme.png";
import {
  CRow,
  CCard,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormTextarea,
  CFormLabel,
  CCardBody,
  CCol,
  CCardImage,
  CCardTitle,
  CCardText,
  CCardFooter,
  CForm,
  CNavLink,
} from "@coreui/react";

function Dashboard() {
  const [visible, setVisible] = useState(false);
  const [spls, setSpls] = useState([]);
  const [validated, setValidated] = useState(false);
  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const splName = event.target.splName.value;
    const splDes = event.target.spldes.value;
    if (isEmptyOrSpaces(splName)) {
      alert("name cant be empty");
    } else if (isEmptyOrSpaces(splDes)) {
      alert("description cant be empty");
    } else {
      setValidated(true);

      axios.defaults.headers = {
        "Content-Type": "application/json",
      };
      axios
        .post("http://127.0.0.1:8000/api/spl-manager/spl/", {
          title: splName,
          description: splDes,
        })
        .then((response) => {
          console.log(response.data);
          setVisible(false);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/spl-manager/spl/")
      .then((res) => {
        setSpls(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [validated]);
  return (
    <>
      <div className="header2">
        SPL
        <CButton
          className="dashboard-button"
          color="info"
          variant="outline"
          onClick={() => setVisible(!visible)}
        >
          Create Room
        </CButton>
        <CModal
          alignment="center"
          visible={visible}
          onClose={() => setVisible(false)}
        >
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CModalHeader>
              <CModalTitle>Create Room</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormLabel htmlFor="exampleFormControlTextarea1">
                Name:{" "}
              </CFormLabel>
              <CFormInput
                type="text"
                name="splName"
                placeholder="Insert Room Name"
                aria-label="default input example"
              />
              <CFormLabel
                className="description"
                htmlFor="exampleFormControlTextarea1"
              >
                Description:{" "}
              </CFormLabel>
              <CFormTextarea
                name="spldes"
                id="exampleFormControlTextarea1"
                rows="3"
              ></CFormTextarea>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton color="primary" type="submit">
                Save changes
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>
      </div>

      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
        {spls.map((spl) => (
          <CCol xs>
            <CCard>
              <CCardImage orientation="top" src={reactIMG} />
              <CCardBody>
                <CCardTitle>{spl.title}</CCardTitle>
                <CCardText>{spl.description}</CCardText>
                <CNavLink
                  to={"/teacher/spls/" + spl.join_code}
                  className="stretched-link"
                  component={NavLink}
                ></CNavLink>
              </CCardBody>
              <CCardFooter>
                <small className="text-medium-emphasis">
                  join code: {spl.join_code}
                </small>
              </CCardFooter>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </>
  );
}

export default Dashboard;
