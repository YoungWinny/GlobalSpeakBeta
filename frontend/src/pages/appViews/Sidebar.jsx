import React from 'react';
import { FaUser, FaClipboardList,  FaHome ,FaSignOutAlt, FaFileUpload, FaMoneyBill,  FaCheckDouble, FaUsersCog, FaTasks, FaUserFriends} from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import  Logo from "../../assets/images/headphone-5-svgrepo-com.svg";
import Avatar from "../../assets/images/avatar.png"
import { useEffect, useState } from 'react';

const Sidebar = ({ darkMode, isCollapsed, toggleSidebar }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  useEffect(()=>{
    const storedUser = sessionStorage.getItem('user');
    if(storedUser)
      setLoggedUser(JSON.parse(storedUser))
  },[])

  return (
    <div
      className={`flex flex-col ${darkMode ? 'bg-gray-800 text-white' : 'text-black'}`}
      style={{ width: isCollapsed ? '85px' : '250px', height: '100vh', overflowY: 'auto' }}
    >
      {/* Logo, App Name, and Collapse Button */}
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <>
            <img src={Logo} alt="Logo" className="h-10 left-2" />
            <span className="text-2xl font-bold right-6">GlobalSpeak</span>
          </>
        )}
        <button onClick={toggleSidebar} className="text-lg p-2">
          <FiMenu />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col bg-[#C35029] h-full text-white text-xl" style={{fontWeight: 'lighter'}}>
        <span className={`${isCollapsed ? 'hidden' : 'p-6 font-semibold text-[#BEBEBE]'}`}>Translator/Transcriber</span>

        {
          loggedUser?.role === 'admin' &&
          <NavLink to="/dashboard/manageusers" className={({ isActive }) => `flex items-center p-6 py-4 m-2 hover:bg-[#EF9273] ${isActive ? 'text-white bg-[#EF9273] rounded' : ''}`}>
            <FaUserFriends />
            <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Users</span>
          </NavLink>
        }

        <NavLink to="/dashboard/home" className={({ isActive }) => `flex items-center p-4 mx-[8%] py-4 my-2py-4 my-2 hover:bg-[#EF9273] ${isActive ? 'text-white bg-[#EF9273] rounded' : ''}`}>
          <FaHome />
          <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Dashboard</span>
        </NavLink>
        <NavLink to="/dashboard/apply" className={({ isActive }) => `flex items-center p-4 mx-[8%] py-4 my-2 hover:bg-[#EF9273] ${isActive ? 'text-white bg-[#EF9273] rounded' : ''}`}>
          <FaClipboardList />
          <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Jobs</span>
        </NavLink>
        <NavLink to="/dashboard/viewtasks" className={({ isActive }) => `flex items-center p-4 mx-[8%] py-4 my-2 hover:bg-[#EF9273] ${isActive ? 'text-white bg-[#EF9273] rounded' : ''}`}>
          <FaTasks />
          <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Tasks</span>
        </NavLink>
        {/* <NavLink to="/dashboard/uploadtasks" className={({ isActive }) => `flex items-center p-4 mx-[8%] py-4 my-2 hover:bg-[#EF9273] ${isActive ? 'text-white bg-[#EF9273] rounded' : ''}`}>
          <FaFileUpload />
          <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Upload Task</span>
        </NavLink> */}

        {
          loggedUser?.role ==='jobseeker' &&
          <NavLink to="/dashboard/manageprofile" className={({ isActive }) => `flex items-center p-4 mx-[8%] py-4 my-2 hover:bg-[#EF9273] ${isActive ? 'text-white bg-[#EF9273] rounded' : ''}`}>
            <FaUsersCog />
            <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Profile</span>
          </NavLink>
        }



         <span className={`${isCollapsed ? 'hidden' : 'p-6 font-semibold text-gray-300'}`}>Admin/Recruiter</span>
        {
          loggedUser?.role!=='jobseeker' &&
          <NavLink to="/dashboard/makepayment" className={({ isActive }) => `flex items-center p-4 mx-[8%] py-4 my-2 hover:bg-[#EF9273] ${isActive ? 'text-white bg-[#EF9273] rounded' : ''}`}>
          <FaMoneyBill />
          <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Payment</span>
        </NavLink>
        }
        
        <NavLink to="/dashboard/manageapplications" className={({ isActive }) => `flex items-center p-4 mx-[8%] py-4 my-2 hover:bg-[#EF9273] ${isActive ? 'text-white bg-[#EF9273] rounded' : ''}`}>
          <FaCheckDouble />
          <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Applications</span>
        </NavLink>
        
        <NavLink onClick={()=> {
          sessionStorage.clear();
          window.location.href='/'
        }} className={({ isActive }) => `flex items-center p-4 mx-[8%] py-4 my-2 mt-4 hover:bg-[#EF9273] hover:text-white hover:bg-[#EF9273] hover:rounded`}>
          <FaSignOutAlt/>
          <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Log Out</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;