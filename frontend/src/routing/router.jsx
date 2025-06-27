import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom"

// This is where you render your components that will need navigations
import Layout from "./layout"
import Login from "../pages/authViews/login"
import Register from "../pages/authViews/register";
import { Homepage } from "../pages/appViews/homepage";
import {Profile} from "../pages/appViews/profile";
import {FindJobs} from "../pages/appViews/findjobs";
import {TestPortal} from "../pages/appViews/testportal";
import { PaymentInterface } from "../pages/appViews/payment";
import {Dashboard} from "../pages/appViews/dashboard";
import ManageProfile from '../pages/appViews/dashboard pages/manageprofile';
import Apply from '../pages/appViews/dashboard pages/apply';
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



export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout />} >
             <Route index path="/homepage" element={<Homepage/>}></Route>
             <Route path="/" element={<Login />}></Route>
             <Route path="/register" element={<Register />}></Route>
             <Route  path="/profile" element={<Profile/>}></Route>
             <Route  path="/findjobs" element={<FindJobs/>}></Route>
             <Route  path="/testportal" element={<TestPortal/>}></Route>
             <Route path="/payment" element={<PaymentInterface/>}></Route>
             <Route path="/mcq/:id" element={<QuizApp/>}></Route>


             <Route path="/dashboard" element={<Dashboard/>}>
                  <Route path="manageprofile" element={<ManageProfile/>}/>
                  <Route path="apply" element={<Apply/>}></Route> 
                  <Route path="uploadtasks" element={<UploadTasks/>}></Route>
                  <Route path="home" element={<Home/>}></Route> 
                  <Route path="viewtasks" element={<ViewTasks/>}></Route> 
                  <Route path="manageapplications" element={<ManageApplications/>}></Route> 
                  <Route path="manageaccounts" element={<ManageAccount/>}></Route> 
                  <Route path="makepayment" element={<MakePayment/>}></Route> 
                  <Route path="manageusers" element={<ManageUser/>}></Route> 
                  <Route path="createjob" element={<CreateJob/>}></Route> 
                  <Route path="job/:id" element={<JobDetails />}>
                  {/* <Route path="testportal" element={<TestPortal/>}></Route> */}
                  </Route>

             </Route>

        </Route>
    )
);