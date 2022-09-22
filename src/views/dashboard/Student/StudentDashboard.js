import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { Link } from "react-router-dom";
import reactIMG from "./../../../assets/images/theme.png";
import "../../dashboard/projects.css";
import { isEmptyOrSpaces } from "src/views/utils";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  CRow,
  CCard,
  CCardBody,
  CCol,
  CCardImage,
  CCardTitle,
  CCardText,
  CCardFooter,
  CNavLink,
} from "@coreui/react";

function projects({ username }) {
  console.log(username);
  const [projects, setProjects] = useState([]);

  const getData = React.useCallback(async () => {
    axios
      .get(
        `http://127.0.0.1:8000/api/spl-manager/project-by-username/${username}`
      )
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    getData();
  }, []);
  console.log(projects);

  return (
    <>
      <div className="header2">Projects</div>

      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
        {Object.keys(projects).length > 0 &&
          projects.project.map((project) => (
            <CCol xs key={project.id}>
              <CCard>
                <CCardImage orientation="top" src={reactIMG} />
                <CCardBody>
                  <CCardTitle>{project.title}</CCardTitle>
                  <CCardText>{project.description}</CCardText>
                  <CNavLink
                    to={"/spls/projects/" + project.id}
                    className="stretched-link"
                    component={NavLink}
                  ></CNavLink>
                </CCardBody>
                <CCardFooter>
                  <small className="text-medium-emphasis">
                    Assigned team: {project.team}
                  </small>
                </CCardFooter>
              </CCard>
            </CCol>
          ))}
      </CRow>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    isTeacher: state.auth.isTeacher,
    username: state.auth.username,
    isStudent: state.auth.isStudent,
    isVerified: state.auth.isVerified,
  };
};

export default connect(mapStateToProps, null)(projects);
