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
import {
  CRow,
  CCard,
  CButton,
  CCardBody,
  CCol,
  CCardImage,
  CCardTitle,
  CCardText,
  CCardFooter,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CMultiSelect,
  CForm,
  CNavLink,
} from "@coreui/react";

function projects() {
  const { joinCode } = useParams();
  const [visible, setVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [studentTeacherList, setStudentTeacherList] = useState([]);

  const [validated, setValidated] = useState(false);
  const [dropDownMentor, setDropDownMentor] = useState("");
  const [dropDownStudent, setDropDownStudent] = useState([]);

  const getData = React.useCallback(async () => {
    axios
      .get(`http://127.0.0.1:8000/api/spl-manager/project/${joinCode}`)
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [visible]);
  useEffect(() => {
    getData();
  }, [visible]);

  const getUserData = React.useCallback(async () => {
    axios
      .get(
        `http://127.0.0.1:8000/api/spl-manager/student-mentor-list/${joinCode}`
      )
      .then((res) => {
        setStudentTeacherList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    getUserData();
  }, []);

  let optionsMentors = [];
  let optionsStudents = [];
  optionsMentors = studentTeacherList.mentors;
  optionsStudents = studentTeacherList.students;
  const handleDropDown = (e) => {
    console.log(e.value);
    setDropDownMentor(e.value);
  };
  const handleDropDown1 = (e) => {
    let arr = [];
    e.map((val, i) => {
      arr.push(val.value);
    });
    setDropDownStudent(arr);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const name = event.target.name.value;
    const description = event.target.description.value;
    const teamName = event.target.teamName.value;
    console.log(name, description, teamName, dropDownMentor, dropDownStudent);
    if (isEmptyOrSpaces(name)) {
      alert("name cant be empty");
    } else if (isEmptyOrSpaces(description)) {
      alert("description cant be empty");
    } else if (isEmptyOrSpaces(teamName)) {
      alert("teamName cant be empty");
    } else if (dropDownMentor == "") {
      alert("select a mentor");
    } else if (dropDownStudent.length == 0) {
      alert("select a students");
    } else {
      setValidated(true);

      axios.defaults.headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(
          `http://127.0.0.1:8000/api/spl-manager/create-project/${joinCode}`,
          {
            name: name,
            description: description,
            team_name: teamName,
            mentor: dropDownMentor,
            students: dropDownStudent,
          }
        )
        .then((response) => {
          toast.success("Project create successful");
          setVisible(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="header2">
        Projects
        <div className="butt">
          <CButton
            className="projects-button"
            color="dark"
            variant="outline"
            onClick={() => setVisible(!visible)}
          >
            Create Project
          </CButton>
          <Link to={"/createteam/" + joinCode}>
            <CButton
              className="projects-button"
              color="dark"
              variant="outline"
              onClick={() => setVisible(!visible)}
            >
              Create Team
            </CButton>
          </Link>
        </div>
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
              <CModalTitle>Create Project</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormLabel htmlFor="exampleFormControlTextarea1">
                Name:{" "}
              </CFormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Project Name"
                name="name"
              />
              <CFormLabel
                className="description"
                htmlFor="exampleFormControlTextarea1"
              >
                Description:{" "}
              </CFormLabel>
              <CFormTextarea
                id="exampleFormControlTextarea1"
                rows="3"
                name="description"
              ></CFormTextarea>
              <CFormLabel
                className="description"
                htmlFor="exampleFormControlTextarea1"
              >
                Team Name:{" "}
              </CFormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Team Name"
                name="teamName"
              />
              <CFormLabel
                className="description"
                htmlFor="exampleFormControlTextarea1"
              >
                Assigned to (Mentor):{" "}
              </CFormLabel>
              <Select
                onChange={(e) => handleDropDown(e)}
                options={optionsMentors}
              />
              <CFormLabel
                className="description"
                htmlFor="exampleFormControlTextarea1"
              >
                Assigned to Assigned to (Students):{" "}
              </CFormLabel>
              <Select
                onChange={(e) => handleDropDown1(e)}
                options={optionsStudents}
                isMulti
              />
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

      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
        {projects.map((project) => (
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

export default projects;
