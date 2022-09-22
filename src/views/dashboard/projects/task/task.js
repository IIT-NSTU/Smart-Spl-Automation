import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./task.css";
import { connect } from "react-redux";
import { isEmptyOrSpaces } from "src/views/utils";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormTextarea,
} from "@coreui/react";

function Task({ isAuthenticated, isTeacher, isVerified }) {
  const [visibleLg, setVisibleLg] = useState(false);
  const [validated, setValidated] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [studentList, setStudentList] = useState([]);

  const [dropDownAssign, setdropDownAssign] = useState([]);
  const [dropDownPriority, setDropDownPriority] = useState("");
  const [dropDownStatus, setDropDownStatus] = useState("");

  console.log(isAuthenticated, isTeacher, isVerified);

  const handleDropDownAssign = (e) => {
    let arr = [];
    e.map((val, i) => {
      arr.push(val.value);
    });
    setdropDownAssign(arr);
  };

  const handleDropDownStatus = (e) => {
    setDropDownStatus(e.label);
  };

  const handleDropDownPriority = (e) => {
    setDropDownPriority(e.label);
  };

  let assigned = [];
  assigned = studentList.students;

  const priority = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const status = [
    { value: "no progress", label: "No Progress" },
    { value: "in progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];
  const { projectID } = useParams();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/spl-manager/task-list/${projectID}`)
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [validated]);

  const getUserData = React.useCallback(async () => {
    axios
      .get(
        `http://127.0.0.1:8000/api/spl-manager/get-team-by-project/${projectID}`
      )
      .then((res) => {
        setStudentList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    getUserData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const name = event.target.name.value;
    const description = event.target.description.value;
    if (isEmptyOrSpaces(name)) {
      alert("name cant be empty");
    } else if (isEmptyOrSpaces(description)) {
      alert("description cant be empty");
    } else if (dropDownAssign.length == 0) {
      alert("Select student to assign task");
    } else if (dropDownPriority.length == 0) {
      alert("select task priority");
    } else if (dropDownStatus.length == 0) {
      alert("select task status");
    } else {
      setValidated(true);

      axios.defaults.headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(
          `http://127.0.0.1:8000/api/spl-manager/create-task/${projectID}`,
          {
            name: name,
            description: description,
            assign: dropDownAssign,
            priority: dropDownPriority,
            task_status: dropDownStatus,
          }
        )
        .then((response) => {
          toast.success("task create successful");
          setVisibleLg(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="header2">Tasks</div>
      {isTeacher && (
        <CButton
          className="task-button"
          color="info"
          variant="outline"
          onClick={() => setVisibleLg(!visibleLg)}
        >
          Add Task
        </CButton>
      )}

      <CModal
        alignment="center"
        size="lg"
        visible={visibleLg}
        onClose={() => setVisibleLg(false)}
      >
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CModalHeader>
            <CModalTitle>Add Task</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormLabel htmlFor="exampleFormControlTextarea1">
              Title:{" "}
            </CFormLabel>
            <CFormInput
              type="text"
              placeholder="Enter Task Title"
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
              placeholder="Enter task description"
              name="description"
            />
            <CFormLabel
              className="description"
              htmlFor="exampleFormControlTextarea1"
            >
              Assigned to:{" "}
            </CFormLabel>
            <Select
              onChange={(e) => handleDropDownAssign(e)}
              options={assigned}
              isMulti
            />
            <CFormLabel
              className="description"
              htmlFor="exampleFormControlTextarea1"
            >
              Priority:{" "}
            </CFormLabel>
            <Select
              onChange={(e) => handleDropDownPriority(e)}
              options={priority}
            />
            <CFormLabel
              className="description"
              htmlFor="exampleFormControlTextarea1"
            >
              Status:{" "}
            </CFormLabel>
            <Select
              onChange={(e) => handleDropDownStatus(e)}
              options={status}
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleLg(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit">
              Save changes
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {Object.keys(tasks).length > 0 && (
        <>
          {tasks.tasks.map((task) => (
            <CAccordion flush key={task.id}>
              <CAccordionItem itemKey={1} className="accordion">
                <CAccordionHeader>{task.name}</CAccordionHeader>
                <CAccordionBody>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">
                    {task.description}
                  </CFormLabel>{" "}
                  <br />
                  <CFormLabel htmlFor="exampleFormControlTextarea1">
                    Assigned To:
                    {task.assign.map(
                      (val, i) =>
                        " " + val.first_name + " " + val.last_name + ", "
                    )}
                  </CFormLabel>{" "}
                  <br />
                  <CFormLabel htmlFor="exampleFormControlTextarea1">
                    Priority: {task.priority}
                  </CFormLabel>
                  <br />
                  <CFormLabel htmlFor="exampleFormControlTextarea1">
                    Status: {task.status}
                  </CFormLabel>
                  <br />
                  <br />
                  {isTeacher && (
                    <Link to={"/edit-task/" + task.id}>
                      <CButton className="projects-button" color="dark">
                        Update task
                      </CButton>
                    </Link>
                  )}
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          ))}
        </>
      )}
    </>
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

export default connect(mapStateToProps, null)(Task);
