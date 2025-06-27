import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../appViews/Sidebar';
import Navbar from '../appViews/Navbar';
import ManageProfile from './dashboard pages/manageprofile';
import Apply from './dashboard pages/apply';
import UploadTasks from './dashboard pages/uploadtasks';
import Home from './dashboard pages/home';
import ViewTasks from './dashboard pages/viewtasks';
import { useLocation } from 'react-router-dom';
import ManageAccount  from './dashboard pages/manageaccounts';
import MakePayment from './dashboard pages/makepayment';
import ManageUser from './dashboard pages/manageusers';
import CreateJob from './dashboard pages/createjob';
import ManageApplications from './dashboard pages/manageapplications';
import JobDetails from './dashboard pages/jobdetails';


export const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(()=> {
    const loggedUser = sessionStorage.getItem('user');
    if(loggedUser){
      setUser(JSON.parse(loggedUser))
    }else{
      window.location.href = '/'
    }

  },[])

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const toggleSidebar = () => {
    setIsCollapsed(prevState => !prevState);
  };

  const RenderComponent = () => {
    const location = useLocation()
    console.log(location);
    
     switch (location.pathname) {
      case "/dashboard/manageprofile":
          return <ManageProfile />
      case "/dashboard/apply":
        return <Apply />
      case "/dashboard/uploadtasks":
        return <UploadTasks />
      case "/dashboard/viewtasks":
        return <ViewTasks />
      case "/dashboard/manageusers":
        return <ManageUser/>
      case "/dashboard/makepayment":
        return <MakePayment />
      case "/dashboard/manageaccounts":
        return <ManageAccount /> 
      case "/dashboard/createjob":
        return <CreateJob/> 
      case "/dashboard/manageapplications":
        return <ManageApplications/>
      // case "/dashboard/job/":
      //   return <JobDetails/>    
      default:
        if (location.pathname.includes("/dashboard/job"))
          return <JobDetails />
        return <Home />
     }
  }

  return (
    <div className={`border-none border-2 border-red-600 flex h-full  ${darkMode ? 'bg-white' :'bg-gray-100'}`}>
      
     <div  className={`flex flex-col ${darkMode ? 'bg-gray-800 text-white' : 'bg-[FEF9F8] text-black'} `}
        style={{ width: isCollapsed ? '75px' : '270px', height: '100vh', overflowY: 'auto' }}>
         <Sidebar darkMode={darkMode} isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      </div> 
       
     
      <div className='parent flex flex-col item-center justify-center w-full h-full'>   
           <div className='Navbar w-full h-[8.55vh] border-none border-2 border-green-600'>
               <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            </div>   

            <div className={`Main w-full h-[90vh]   ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                {RenderComponent()} 
           </div> 
      </div>
   
    </div>
  );
};

export default Dashboard;