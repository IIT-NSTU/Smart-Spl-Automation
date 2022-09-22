import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./createteam.css";
import { useParams } from "react-router-dom";
import {
  CButton,
  CTable,
  CTableRow,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";
import { object } from "prop-types";
function createteam() {
  const { joinCode } = useParams();
  const [studentTeacherList, setStudentTeacherList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/spl-manager/student-mentor-list-create-team/${joinCode}`
      )
      .then((res) => {
        setStudentTeacherList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("ss", studentTeacherList);
  return (
    <>
      {Object.keys(studentTeacherList).length > 0 && (
        <>
          <div className="header">Mentor List</div>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {studentTeacherList.mentors.map((mentor, id) => (
                <CTableRow>
                  <CTableHeaderCell scope="row">{id}</CTableHeaderCell>
                  <CTableDataCell>
                    {mentor.user.firstname} {mentor.user.lastname}
                  </CTableDataCell>
                  <CTableDataCell>{mentor.designation}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          <div className="header" style={{ marginTop: "30px" }}>
            Student List
          </div>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Roll</CTableHeaderCell>
                <CTableHeaderCell scope="col">CGPA</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {studentTeacherList.students.map((student, id) => (
                <CTableRow>
                  <CTableHeaderCell scope="row">{id}</CTableHeaderCell>
                  <CTableDataCell>
                    {student.user.firstname} {student.user.lastname}
                  </CTableDataCell>
                  <CTableDataCell>{student.roll}</CTableDataCell>
                  <CTableDataCell>{student.cgpa}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <a
            href={"http://127.0.0.1:8000/api/spl-manager/form-team/" + joinCode}
            className="link"
          >
            <CButton color="dark" style={{ marginTop: "30px" }} type="submit">
              Create team by cgpa
            </CButton>
          </a>
        </>
      )}
    </>
  );
}

export default createteam;
