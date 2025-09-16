import {
  createBrowserRouter,
} from "react-router-dom";
import { BaseLayout, CreatorLayout, LearningLayout } from "./layout";

// Auth Views
import Login from "../pages/authViews/login";
import Register from "../pages/authViews/register";

// App Views
import { Homepage } from "../pages/appViews/homepage";
import { Profile } from "../pages/appViews/profile";
import { FindJobs } from "../pages/appViews/findjobs";
import { PaymentInterface } from "../pages/appViews/payment";
import { Dashboard } from "../pages/appViews/dashboard";

// Dashboard Subpages
import ManageProfile from '../pages/appViews/dashboard pages/manageprofile';
import UploadTasks from '../pages/appViews/dashboard pages/uploadtasks';
import Home from '../pages/appViews/dashboard pages/home';
import ViewTasks from '../pages/appViews/dashboard pages/viewtasks';
import ManageAccount from '../pages/appViews/dashboard pages/manageaccounts';
import MakePayment from '../pages/appViews/dashboard pages/makepayment';
import ManageUser from '../pages/appViews/dashboard pages/manageusers';
import CreateJob from '../pages/appViews/dashboard pages/createjob';
import ManageApplications from '../pages/appViews/dashboard pages/manageapplications';
import JobDetails from '../pages/appViews/dashboard pages/jobdetails';
import QuizApp from "../pages/appViews/dashboard pages/mcq";
import Apply from '../pages/appViews/dashboard pages/apply';

// Learning Views
import CreatorDashboard from "../pages/learningViews/creatorDashboard";
import LearningInterface from "../pages/learningViews/LearningInterface";

// Creator Components
import CourseOutlineGenerator from "../components/creator/CourseOutlineGenerator";
import LessonEditor from "../components/creator/LessonEditor";
import ExerciseBuilder from "../components/creator/ExerciseBuilder";
import AssessmentComposer from "../components/creator/AssessmentComposer";
import { AssessmentView } from "../components/learn";

export const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      // Public Routes
      { path: "/", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/homepage", element: <Homepage /> },

      // Dashboard Routes
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { index: true, element: <Home /> },
          { path: "manageprofile", element: <ManageProfile /> },
          { path: "uploadtasks", element: <UploadTasks /> },
          { path: "apply", element: <Apply /> },
          { path: "home", element: <Home /> },
          { path: "viewtasks", element: <ViewTasks /> },
          { path: "manageapplications", element: <ManageApplications /> },
          { path: "manageaccounts", element: <ManageAccount /> },
          { path: "makepayment", element: <MakePayment /> },
          { path: "manageusers", element: <ManageUser /> },
          { path: "createjob", element: <CreateJob /> },
          { path: "job/:id", element: <JobDetails /> },
          { path: "mcq/:id", element: <QuizApp /> },
        ],
      },

      // Creator Space
      {
        path: "/creator",
        element: <CreatorLayout />,
        children: [
          { index: true, element: <CreatorDashboard /> },
          { path: "outline", element: <CourseOutlineGenerator /> },
          { path: "lessons", element: <LessonEditor /> },
          { path: "exercises", element: <ExerciseBuilder /> },
          { path: "assessments", element: <AssessmentComposer /> },
          
        ],
      },

      // Learning Space
      {
        path: "/learn",
        element: <LearningLayout />,
        children: [
          { path: ":courseId", element: <LearningInterface /> },
          { path: "C", element: <AssessmentView /> },
        ],
      },

      // Other Public Routes
      { path: "/profile", element: <Profile /> },
      { path: "/findjobs", element: <FindJobs /> },
      { path: "/payment", element: <PaymentInterface /> },
      // { path: "/mcq/:id", element: <QuizApp /> },
    ],
  },
], {
  future: {
    v7_startTransition: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
  },
});