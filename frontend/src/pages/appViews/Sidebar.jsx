// import React from 'react';
// import { FaUser, FaClipboardList,  FaHome ,FaSignOutAlt, FaFileUpload, FaMoneyBill,  FaCheckDouble, FaUsersCog, FaTasks, FaUserFriends} from 'react-icons/fa';
// import { FiMenu } from 'react-icons/fi';
// import { NavLink } from 'react-router-dom';
// import  Logo from "../../assets/images/headphone-5-svgrepo-com.svg";
// import Avatar from "../../assets/images/avatar.png"
// import { useEffect, useState } from 'react';

// const Sidebar = ({ darkMode, isCollapsed, toggleSidebar }) => {
//   const [loggedUser, setLoggedUser] = useState(null);
//   useEffect(()=>{
//     const storedUser = sessionStorage.getItem('user');
//     if(storedUser)
//       setLoggedUser(JSON.parse(storedUser))
//   },[])

//   return (
//     <div
//       className={`flex flex-col ${darkMode ? 'bg-gray-800 text-white' : 'text-black'}`}
//       style={{ width: isCollapsed ? '85px' : '250px', height: '100vh', overflowY: 'auto' }}
//     >
//       {/* Logo, App Name, and Collapse Button */}
//       <div className="flex items-center justify-between p-4">
//         {!isCollapsed && (
//           <>
//             <img src={Logo} alt="Logo" className="h-10 left-2" />
//             <span className="text-2xl font-bold right-6">GlobalSpeak</span>
//           </>
//         )}
//         <button onClick={toggleSidebar} className="text-lg p-2">
//           <FiMenu />
//         </button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex flex-col bg-[#C35029] h-full text-white text-xl" style={{fontWeight: 'lighter'}}>
//         <span className={`${isCollapsed ? 'hidden' : 'p-6 font-semibold text-[#BEBEBE]'}`}>Translator/Transcriber</span>

//         {
//           loggedUser?.role === 'admin' &&
//           <NavLink to="/dashboard/manageusers" className={({ isActive }) => `flex items-center p-6 py-4 m-2 hover:bg-[#EF9273] ${isActive ? 'text-white bg-[#EF9273] rounded' : ''}`}>
//             <FaUserFriends />
//             <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Users</span>
//           </NavLink>
//         }

//         <NavLink to="/dashboard/home" className={({ isActive }) => `flex items-center p-4 mx-[8%] py-4 my-2py-4 my-2 hover:bg-[#EF9273] ${isActive ? 'text-white bg-[#EF9273] rounded' : ''}`}>
//           <FaHome />
//           <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Dashboard</span>
//         </NavLink>
//         <NavLink to="/dashboard/apply" className={({ isActive }) => `flex items-center p-4 mx-[8%] py-4 my-2 hover:bg-[#EF9273] ${isActive ? 'text-white bg-[#EF9273] rounded' : ''}`}>
//           <FaClipboardList />
//           <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Jobs</span>
//         </NavLink>
//         <NavLink to="/dashboard/viewtasks" className={({ isActive }) => `flex items-center p-4 mx-[8%] py-4 my-2 hover:bg-[#EF9273] ${isActive ? 'text-white bg-[#EF9273] rounded' : ''}`}>
//           <FaTasks />
//           <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Tasks</span>
//         </NavLink>
//         {/* <NavLink to="/dashboard/uploadtasks" className={({ isActive }) => `flex items-center p-4 mx-[8%] py-4 my-2 hover:bg-[#EF9273] ${isActive ? 'text-white bg-[#EF9273] rounded' : ''}`}>
//           <FaFileUpload />
//           <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Upload Task</span>
//         </NavLink> */}

//         {
//           loggedUser?.role ==='jobseeker' &&
//           <NavLink to="/dashboard/manageprofile" className={({ isActive }) => `flex items-center p-4 mx-[8%] py-4 my-2 hover:bg-[#EF9273] ${isActive ? 'text-white bg-[#EF9273] rounded' : ''}`}>
//             <FaUsersCog />
//             <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Profile</span>
//           </NavLink>
//         }



//          <span className={`${isCollapsed ? 'hidden' : 'p-6 font-semibold text-gray-300'}`}>Admin/Recruiter</span>
//         {
//           loggedUser?.role!=='jobseeker' &&
//           <NavLink to="/dashboard/makepayment" className={({ isActive }) => `flex items-center p-4 mx-[8%] py-4 my-2 hover:bg-[#EF9273] ${isActive ? 'text-white bg-[#EF9273] rounded' : ''}`}>
//           <FaMoneyBill />
//           <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Payment</span>
//         </NavLink>
//         }
        
//         <NavLink to="/dashboard/manageapplications" className={({ isActive }) => `flex items-center p-4 mx-[8%] py-4 my-2 hover:bg-[#EF9273] ${isActive ? 'text-white bg-[#EF9273] rounded' : ''}`}>
//           <FaCheckDouble />
//           <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Applications</span>
//         </NavLink>
        
//         <NavLink onClick={()=> {
//           sessionStorage.clear();
//           window.location.href='/'
//         }} className={({ isActive }) => `flex items-center p-4 mx-[8%] py-4 my-2 mt-4 hover:bg-[#EF9273] hover:text-white hover:bg-[#EF9273] hover:rounded`}>
//           <FaSignOutAlt/>
//           <span className={`${isCollapsed ? 'hidden' : 'ml-2'}`}>Log Out</span>
//         </NavLink>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;















import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, FaBookOpen, FaBriefcase, FaTasks, 
  FaUserFriends, FaUserCog, FaMoneyBillAlt,
  FaClipboardCheck, FaGraduationCap, FaGlobeAmericas,
  FaSignOutAlt
} from 'react-icons/fa';
import { RiDashboardLine } from 'react-icons/ri';
import Logo from "../../assets/images/headphone-5-svgrepo-com.svg";

const Sidebar = ({ darkMode, isCollapsed }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) setLoggedUser(JSON.parse(storedUser));
  }, []);

  // Navigation item component
  const NavItem = ({ to, icon: Icon, label, adminOnly = false, recruiterOnly = false }) => {
    if (adminOnly && loggedUser?.role !== 'admin') return null;
    if (recruiterOnly && !['admin', 'recruiter'].includes(loggedUser?.role)) return null;
    
    return (
      <NavLink
        to={to}
        className={({ isActive }) => 
          `flex items-center p-3 my-1 rounded-lg transition-all duration-200
          ${isActive ? 
            'bg-[#EF9273] text-white shadow-md' : 
            `hover:bg-[#EF9273]/20 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`
          }
          ${isCollapsed ? 'justify-center' : 'pl-4'}`
        }
      >
        {({ isActive }) => (
          <>
            <Icon className={`text-lg ${isActive ? 'text-white' : 'text-[#C35029]'}`} />
            {!isCollapsed && <span className="ml-3 font-medium">{label}</span>}
          </>
        )}
      </NavLink>
    );
  };

  return (
    <div className={`h-full flex flex-col ${darkMode ? 'bg-gray-800' : 'bg-[#FEF9F8]'} 
      border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}
    >
      {/* Logo Section */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center p-4' : 'justify-start p-6'} 
        border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        {isCollapsed ? (
          <img src={Logo} alt="Logo" className="h-8 w-8" />
        ) : (
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-8 mr-2" />
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              GlobalSpeak
            </span>
          </div>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* Main Section - Available to all roles */}
        <div className={`${isCollapsed ? 'px-1' : 'px-2'} mb-6`}>
          <NavItem to="/dashboard/home" icon={RiDashboardLine} label="Dashboard" />
          <NavItem to="/creator" icon={FaBookOpen} label="Learning Hub" />
          <NavItem to="/dashboard/apply" icon={FaBriefcase} label="Job Board" />
          <NavItem to="/dashboard/viewtasks" icon={FaTasks} label="My Tasks" />
        </div>

        {/* Profile Section - Available to all roles */}
        <div className={`${isCollapsed ? 'px-1' : 'px-2'} mb-6`}>
          <h3 className={`text-xs uppercase tracking-wider mb-2 
            ${darkMode ? 'text-gray-400' : 'text-gray-500'} ${isCollapsed ? 'hidden' : 'block'}`}>
            My Profile
          </h3>
          <NavItem to="/dashboard/manageprofile" icon={FaUserCog} label="Profile Settings" />
        </div>

        {/* Recruiter Section - Available to recruiters and admins */}
        {['admin', 'recruiter'].includes(loggedUser?.role) && (
          <div className={`${isCollapsed ? 'px-1' : 'px-2'} mb-6`}>
            <h3 className={`text-xs uppercase tracking-wider mb-2 
              ${darkMode ? 'text-gray-400' : 'text-gray-500'} ${isCollapsed ? 'hidden' : 'block'}`}>
              Recruiter Tools
            </h3>
            <NavItem to="/dashboard/manageapplications" icon={FaClipboardCheck} label="Applications" recruiterOnly />
            <NavItem to="/dashboard/makepayment" icon={FaMoneyBillAlt} label="Payments" recruiterOnly />
          </div>
        )}

        {/* Admin Section - Only for admins */}
        {loggedUser?.role === 'admin' && (
          <div className={`${isCollapsed ? 'px-1' : 'px-2'} mb-6`}>
            <h3 className={`text-xs uppercase tracking-wider mb-2 
              ${darkMode ? 'text-gray-400' : 'text-gray-500'} ${isCollapsed ? 'hidden' : 'block'}`}>
              Administration
            </h3>
            <NavItem to="/dashboard/manageusers" icon={FaUserFriends} label="User Management" adminOnly />
            <NavItem to="/dashboard/systemsettings" icon={FaUserCog} label="System Settings" adminOnly />
          </div>
        )}

        {/* Language Section */}
        <div className={`${isCollapsed ? 'px-1' : 'px-2'} mb-6`}>
          <h3 className={`text-xs uppercase tracking-wider mb-2 
            ${darkMode ? 'text-gray-400' : 'text-gray-500'} ${isCollapsed ? 'hidden' : 'block'}`}>
            Languages
          </h3>
          <div className={`flex ${isCollapsed ? 'justify-center' : ''}`}>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#C35029] text-white">
              EN
            </span>
            {!isCollapsed && (
              <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                +2
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className={`p-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <button
          onClick={() => {
            sessionStorage.clear();
            window.location.href = '/';
          }}
          className={`flex items-center w-full p-3 rounded-lg transition-colors
            ${darkMode ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-600'}
            ${isCollapsed ? 'justify-center' : 'pl-4'}`}
        >
          <FaSignOutAlt className="text-lg" />
          {!isCollapsed && <span className="ml-3 font-medium">Sign Out</span>}
        </button>
        
        {!isCollapsed && (
          <div className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
            GlobalSpeak v2.0
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;