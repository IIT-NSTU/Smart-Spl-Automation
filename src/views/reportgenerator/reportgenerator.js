import React from "react";
import "./reportgenerator.css";
import {
  CForm,
  CFormLabel,
  CFormTextarea,
  CFormInput,
  CButton,
} from "@coreui/react";

function reportgenerator() {
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

  return (
    <div>
      <CForm
        action="http://127.0.0.1:8000/api/spl-manager/generate-report/"
        method="post"
      >
        <div className="header3">Project Proposal</div>
        <CFormInput
          type="text"
          id="exampleFormControlInput1"
          placeholder=" "
          label="Project Name"
          aria-describedby="exampleFormControlInputHelpInline"
          name="projectName"
        />

        <div>
          <CFormInput
            type="text"
            id="exampleFormControlInput1"
            label="Student name 1 "
            placeholder=" "
            aria-describedby="exampleFormControlInputHelpInline"
            name="sname1"
          />

          <CFormInput
            type="text"
            id="exampleFormControlInput1"
            label="Student roll 1 "
            aria-describedby="exampleFormControlInputHelpInline"
            name="sroll1"
          />
          <CFormInput
            type="text"
            id="exampleFormControlInput1"
            label="Student email 1"
            aria-describedby="exampleFormControlInputHelpInline"
            name="semail1"
          />
          <CFormInput
            type="text"
            id="exampleFormControlInput1"
            label="Student name 2 "
            placeholder=" "
            aria-describedby="exampleFormControlInputHelpInline"
            name="sname2"
          />

          <CFormInput
            type="text"
            id="exampleFormControlInput1"
            label="Student roll 2 "
            name="sroll2"
            aria-describedby="exampleFormControlInputHelpInline"
          />
          <CFormInput
            type="text"
            id="exampleFormControlInput1"
            label="Student email 2"
            name="semail2"
            aria-describedby="exampleFormControlInputHelpInline"
          />
          <CFormInput
            type="text"
            id="exampleFormControlInput1"
            label="Student name 3"
            placeholder=" "
            name="sname3"
            aria-describedby="exampleFormControlInputHelpInline"
          />

          <CFormInput
            type="text"
            id="exampleFormControlInput1"
            label="Student roll 3"
            name="sroll3"
            aria-describedby="exampleFormControlInputHelpInline"
          />
          <CFormInput
            type="text"
            name="semail3"
            id="exampleFormControlInput1"
            label="Student email 3"
            aria-describedby="exampleFormControlInputHelpInline"
          />
        </div>

        <div>
          <div className="header3">Supervisor: </div>
          <CFormInput
            type="text"
            id="exampleFormControlInput1"
            label="Supervisor Name"
            placeholder=""
            name="supName"
            aria-describedby="exampleFormControlInputHelpInline"
          />

          <CFormInput
            type="text"
            id="exampleFormControlInput1"
            label="Supervisor Designation"
            placeholder=""
            name="supDes"
            aria-describedby="exampleFormControlInputHelpInline"
          />

          <CFormInput
            id="exampleFormControlInput1"
            label="Supervisor Email"
            placeholder=""
            name="supEmail"
          />

          <div>
            <div className="header3">Contents: </div>

            <CFormLabel>Project Description</CFormLabel>
            <CFormTextarea name="projectDes" rows="5"></CFormTextarea>
            <CFormLabel>Introduction</CFormLabel>
            <CFormTextarea name="intro" rows="5"></CFormTextarea>

            <CFormLabel htmlFor="objectives"> Target Users</CFormLabel>
            <CFormTextarea
              id="objectives"
              name="targetUser"
              rows="5"
            ></CFormTextarea>

            <CFormLabel htmlFor="targetcustomers">Requirements</CFormLabel>
            <CFormTextarea
              id="targetcustomers"
              name="requirement"
              rows="5"
            ></CFormTextarea>

            <CFormLabel htmlFor="applicationfeaturesdescription">
              Models, Tools and Resources
            </CFormLabel>
            <CFormTextarea
              name="modelToolsRes"
              id="applicationfeaturesdescription"
              rows="5"
            ></CFormTextarea>

            <CFormLabel htmlFor="modelstoolsandresources">
              Project Members
            </CFormLabel>
            <CFormTextarea
              name="projectMember"
              id="modelstoolsandresources"
              rows="5"
            ></CFormTextarea>

            <CFormLabel htmlFor="workdistribution">User Guide</CFormLabel>
            <CFormTextarea
              name="userGuide"
              id="workdistribution"
              rows="5"
            ></CFormTextarea>

            <CFormLabel htmlFor="proposedtimeline">
              Source Code Documentation
            </CFormLabel>
            <CFormTextarea
              name="soureCode"
              id="proposedtimeline"
              rows="5"
            ></CFormTextarea>

            <CFormLabel htmlFor="deliverables">
              SRS and Development Mapping
            </CFormLabel>
            <CFormTextarea
              name="srs"
              id="deliverables"
              rows="5"
            ></CFormTextarea>

            <CFormLabel htmlFor="challenges">
              Challenges and Future Work
            </CFormLabel>
            <CFormTextarea
              name="challenges"
              id="challenges"
              rows="5"
            ></CFormTextarea>
          </div>
        </div>

        <div className="button2 labels">
          <h2></h2>
          <CButton type="submit" color="dark" variant="outline">
            Generate Report
          </CButton>
        </div>
      </CForm>
      <br />
      <br />
    </div>
  );
}

export default reportgenerator;
