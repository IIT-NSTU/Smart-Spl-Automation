import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";
// routes config

import { TPrivateRoute, SPrivateRoute } from "../views/private/PrivateRoute";

const TeacherDashboard = React.lazy(() =>
  import("../views/dashboard/Teacher/TeacherDashboard")
);
const CreateTeam = React.lazy(() => import("../views/createteam/createteam"));
const StudentDashboard = React.lazy(() =>
  import("../views/dashboard/Student/StudentDashboard")
);
const ReportGenerator = React.lazy(() =>
  import("../views/reportgenerator/reportgenerator")
);

const Announcements = React.lazy(() =>
  import("../views/announcements/announcements")
);
const Task = React.lazy(() => import("../views/dashboard/projects/task/task"));
const EditTask = React.lazy(() =>
  import("../views/dashboard/projects/task/editTask")
);

const TeacherProjects = React.lazy(() =>
  import("../views/dashboard/Teacher/Projects")
);
const JoinSpl = React.lazy(() => import("../views/dashboard/JoinSpl"));
const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route
            path="/dashboard/teacher"
            exact
            element={
              <TPrivateRoute>
                <TeacherDashboard />
              </TPrivateRoute>
            }
          />{" "}
          <Route
            path="/teacher/spls/:joinCode"
            exact
            element={
              <TPrivateRoute>
                <TeacherProjects />
              </TPrivateRoute>
            }
          />
          <Route
            path="/createteam/:joinCode"
            exact
            element={
              <TPrivateRoute>
                <CreateTeam />
              </TPrivateRoute>
            }
          />{" "}
          <Route
            path="/edit-task/:taskID"
            exact
            element={
              <TPrivateRoute>
                <EditTask />
              </TPrivateRoute>
            }
          />
          <Route
            path="/dashboard/student"
            exact
            element={
              <SPrivateRoute>
                <StudentDashboard />
              </SPrivateRoute>
            }
          />
          <Route exact path="/join/spl" name="" element={<JoinSpl />} />
          <Route
            exact
            path="/spls/projects/:projectID"
            name=""
            element={<Task />}
          />
          <Route path="/announcements" exact element={<Announcements />} />
          <Route path="/reportgenerator" exact element={<ReportGenerator />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
