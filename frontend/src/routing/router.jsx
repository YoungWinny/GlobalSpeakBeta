// import React from "react";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route
// } from "react-router-dom"

// // This is where you render your components that will need navigations
// import Layout from "./layout"
// import Login from "../pages/authViews/login"
// import Register from "../pages/authViews/register";
// import { Homepage } from "../pages/appViews/homepage";
// import {Profile} from "../pages/appViews/profile";
// import {FindJobs} from "../pages/appViews/findjobs";
// import {TestPortal} from "../pages/appViews/testportal";
// import { PaymentInterface } from "../pages/appViews/payment";
// import {Dashboard} from "../pages/appViews/dashboard";
// import ManageProfile from '../pages/appViews/dashboard pages/manageprofile';
// import Apply from '../pages/appViews/dashboard pages/apply';
// import UploadTasks from '../pages/appViews/dashboard pages/uploadtasks';
// import Home from '../pages/appViews/dashboard pages/home';
// import ViewTasks from '../pages/appViews/dashboard pages/viewtasks';
// import ManageAccount from '../pages/appViews/dashboard pages/manageaccounts';
// import MakePayment from '../pages/appViews/dashboard pages/makepayment';
// import ManageUser from '../pages/appViews/dashboard pages/manageusers';
// import CreateJob from '../pages/appViews/dashboard pages/createjob';
// import ManageApplications from '../pages/appViews/dashboard pages/manageapplications';
// import JobDetails from '../pages/appViews/dashboard pages/jobdetails';
// import QuizApp from "../pages/appViews/dashboard pages/mcq";
// import creatorDashboard from "../pages/learningViews/creatorDashboard";
// import CreatorDashboard from "../pages/learningViews/creatorDashboard";



// export const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route element={<Layout />}>
//              <Route index path="/homepage" element={<Homepage/>}></Route>
//              <Route path="/" element={<Login />}></Route>
//              <Route path="/register" element={<Register />}></Route>
//              <Route  path="/profile" element={<Profile/>}></Route>
//              <Route  path="/findjobs" element={<FindJobs/>}></Route>
//              <Route  path="/testportal" element={<TestPortal/>}></Route>
//              <Route path="/payment" element={<PaymentInterface/>}></Route>
//              <Route path="/mcq/:id" element={<QuizApp/>}></Route>
//              <Route path="/learn" element={<Learn/>}></Route>
             


//              <Route path="/dashboard" element={<Dashboard/>}>
//                   <Route path="manageprofile" element={<ManageProfile/>}/>
//                   <Route path="apply" element={<Apply/>}></Route> 
//                   <Route path="uploadtasks" element={<UploadTasks/>}></Route>
//                   <Route path="home" element={<Home/>}></Route> 
//                   <Route path="viewtasks" element={<ViewTasks/>}></Route> 
//                   <Route path="manageapplications" element={<ManageApplications/>}></Route> 
//                   <Route path="manageaccounts" element={<ManageAccount/>}></Route> 
//                   <Route path="makepayment" element={<MakePayment/>}></Route> 
//                   <Route path="manageusers" element={<ManageUser/>}></Route> 
//                   <Route path="createjob" element={<CreateJob/>}></Route> 
//                   <Route path="job/:id" element={<JobDetails />}>
//                   {/* <Route path="testportal" element={<TestPortal/>}></Route> */}
//                   </Route>

//              </Route>

//         </Route>

        
//     )
// );


























// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route
// } from "react-router-dom";
// import { BaseLayout, CreatorLayout, LearningLayout } from "./layout";

// // Auth Views
// import Login from "../pages/authViews/login";
// import Register from "../pages/authViews/register";

// // App Views
// import { Homepage } from "../pages/appViews/homepage";
// import { Profile } from "../pages/appViews/profile";
// import { FindJobs } from "../pages/appViews/findjobs";
// import { TestPortal } from "../pages/appViews/testportal";
// import { PaymentInterface } from "../pages/appViews/payment";
// import { Dashboard } from "../pages/appViews/dashboard";

// // Dashboard Subpages
// import ManageProfile from '../pages/appViews/dashboard pages/manageprofile';
// import UploadTasks from '../pages/appViews/dashboard pages/uploadtasks';
// import Home from '../pages/appViews/dashboard pages/home';
// import ViewTasks from '../pages/appViews/dashboard pages/viewtasks';
// import ManageAccount from '../pages/appViews/dashboard pages/manageaccounts';
// import MakePayment from '../pages/appViews/dashboard pages/makepayment';
// import ManageUser from '../pages/appViews/dashboard pages/manageusers';
// import CreateJob from '../pages/appViews/dashboard pages/createjob';
// import ManageApplications from '../pages/appViews/dashboard pages/manageapplications';
// import JobDetails from '../pages/appViews/dashboard pages/jobdetails';
// import QuizApp from "../pages/appViews/dashboard pages/mcq";
// import Apply from '../pages/appViews/dashboard pages/apply';

// // Learning Views
// import CreatorDashboard from "../pages/learningViews/creatorDashboard";
// import LearningInterface from "../pages/learningViews/LearningInterface";

// // Creator Components
// import CourseOutlineGenerator from "../components/creator/CourseOutlineGenerator";
// import LessonEditor from "../components/creator/LessonEditor";
// import ExerciseBuilder from "../components/creator/ExerciseBuilder";
// import AssessmentComposer from "../components/creator/AssessmentComposer";
// import { AssessmentView } from "../components/learn";

// export const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route element={<BaseLayout />}>
//       {/* Public Routes */}
//       <Route path="/" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/homepage" element={<Homepage />} />

//       {/* Dashboard Routes */}
//       <Route path="/dashboard" element={<Dashboard />}>
//         <Route index element={<Home />} />
//         <Route path="manageprofile" element={<ManageProfile />} />
//         <Route path="uploadtasks" element={<UploadTasks />} />
//         <Route path="apply" element={<Apply/>}></Route> 
//         <Route path="home" element={<Home/>}></Route> 
//         <Route path="viewtasks" element={<ViewTasks />} />
//         <Route path="manageapplications" element={<ManageApplications />} />
//         <Route path="manageaccounts" element={<ManageAccount />} />
//         <Route path="makepayment" element={<MakePayment />} />
//         <Route path="manageusers" element={<ManageUser />} />
//         <Route path="createjob" element={<CreateJob />} />
//         <Route path="job/:id" element={<JobDetails />} />
//       </Route>

//       {/* Creator Space */}
//       <Route path="/creator" element={<CreatorLayout />}>
//         <Route index element={<CreatorDashboard />} />
//         <Route path="outline" element={<CourseOutlineGenerator />} />
//         <Route path="lessons" element={<LessonEditor />} />
//         <Route path="exercises" element={<ExerciseBuilder />} />
//         <Route path="assessments" element={<AssessmentComposer />} />
//       </Route>

//       {/* Learning Space */}
//       <Route path="/learn" element={<LearningLayout />}>
//         <Route path=":courseId" element={<LearningInterface />} />
//         <Route path="assessments" element={<AssessmentView/>}/>
//       </Route>

//       {/* Other Public Routes */}
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/findjobs" element={<FindJobs />} />
//       <Route path="/testportal" element={<TestPortal />} />
//       <Route path="/payment" element={<PaymentInterface />} />
//       <Route path="/mcq/:id" element={<QuizApp />} />
//     </Route>
//   )
// );


























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
import { TestPortal } from "../pages/appViews/testportal";
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
          { path: "assessments", element: <AssessmentView /> },
        ],
      },

      // Other Public Routes
      { path: "/profile", element: <Profile /> },
      { path: "/findjobs", element: <FindJobs /> },
      { path: "/testportal", element: <TestPortal /> },
      { path: "/payment", element: <PaymentInterface /> },
      { path: "/mcq/:id", element: <QuizApp /> },
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