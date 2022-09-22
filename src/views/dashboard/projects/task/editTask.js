import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./task.css";
import { isEmptyOrSpaces } from "src/views/utils";
import { toast } from "react-toastify";
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

function EditTask() {
  const [validated, setValidated] = useState(false);
  const [task, setTask] = useState([]);
  const [dropDownPriority, setDropDownPriority] = useState("");
  const [dropDownStatus, setDropDownStatus] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleDropDownStatus = (e) => {
    setDropDownStatus(e.label);
  };

  const handleDropDownPriority = (e) => {
    setDropDownPriority(e.label);
  };
  console.log(dropDownPriority, dropDownStatus);
  const nameChange = (e) => {
    setName(e.target.value);
  };
  const descChange = (e) => {
    setDesc(e.target.value);
  };

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
  const { taskID } = useParams();
  const getUserData = React.useCallback(async () => {
    axios
      .get(`http://127.0.0.1:8000/api/spl-manager/tasks/${taskID}`)
      .then((res) => {
        setTask(res.data);
        console.log("in", res.data);
        setName(res.data.name);
        setDesc(res.data.description);
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
        .post(`http://127.0.0.1:8000/api/spl-manager/update-task/${taskID}`, {
          name: name,
          description: description,
          priority: dropDownPriority,
          task_status: dropDownStatus,
        })
        .then((response) => {
          toast.success("task create successful");
          console.log(response.data);
          //   setVisibleLg(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="header2">Edit Tasks</div>

      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <CModalBody>
          <CFormLabel htmlFor="exampleFormControlTextarea1">Title: </CFormLabel>
          <CFormInput
            value={name}
            onChange={(e) => nameChange(e)}
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
            onChange={(e) => descChange(e)}
            value={desc}
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
          <Select onChange={(e) => handleDropDownStatus(e)} options={status} />
        </CModalBody>

        <CButton color="dark" type="submit">
          Save changes
        </CButton>
      </CForm>
    </>
  );
}

export default EditTask;
