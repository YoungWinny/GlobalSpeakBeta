// import React from 'react';
// import { FaSearch, FaBell, FaUserCircle, FaGraduationCap, FaBriefcase, FaComments, FaGlobe } from 'react-icons/fa';
// import { RiMoonFill, RiSunFill } from 'react-icons/ri';
// import { HiMenuAlt2 } from 'react-icons/hi';
// import { NavLink } from 'react-router-dom';

// const Navbar = ({ darkMode, toggleDarkMode, toggleSidebar }) => {
//   return (
//     <div className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
          
//           {/* Left Section - Logo & Main Navigation */}
//           <div className="flex items-center space-x-6">
//             {/* Menu Button - Icon only */}
//             <button 
//               onClick={toggleSidebar}
//               className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
//               aria-label="Toggle sidebar"
//             >
//               <HiMenuAlt2 className="h-5 w-5" />
//             </button>

//             {/* Logo */}
//             <div className="hidden md:flex items-center space-x-1">
//               <FaGlobe className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
//               <span className="ml-1 text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
//                 LexiVerse
//               </span>
//             </div>

//             {/* Main Navigation Links */}
//             <div className="hidden md:flex items-center space-x-4 ml-6">
//               <NavLink 
//                 to="/dashboard/learn"
//                 className={({ isActive }) => `flex items-center px-3 py-2 rounded-md font-medium ${
//                   isActive 
//                     ? darkMode 
//                       ? 'bg-gray-700 text-white' 
//                       : 'bg-blue-50 text-blue-600'
//                     : darkMode 
//                       ? 'text-gray-300' 
//                       : 'text-gray-700'
//                 }`}
//               >
//                 <FaGraduationCap className="mr-2" />
//                 Learn
//               </NavLink>
              
//               <NavLink 
//                 to="/dashboard/jobs"
//                 className={({ isActive }) => `flex items-center px-3 py-2 rounded-md font-medium ${
//                   isActive 
//                     ? darkMode 
//                       ? 'bg-gray-700 text-white' 
//                       : 'bg-blue-50 text-blue-600'
//                     : darkMode 
//                       ? 'text-gray-300' 
//                       : 'text-gray-700'
//                 }`}
//               >
//                 <FaBriefcase className="mr-2" />
//                 Jobs
//               </NavLink>
              
//               <NavLink 
//                 to="/dashboard/community"
//                 className={({ isActive }) => `flex items-center px-3 py-2 rounded-md font-medium ${
//                   isActive 
//                     ? darkMode 
//                       ? 'bg-gray-700 text-white' 
//                       : 'bg-blue-50 text-blue-600'
//                     : darkMode 
//                       ? 'text-gray-300' 
//                       : 'text-gray-700'
//                 }`}
//               >
//                 <FaComments className="mr-2" />
//                 Community
//               </NavLink>
//             </div>
//           </div>

//           {/* Center Section - Search (Wider on larger screens) */}
//           <div className="flex-1 max-w-xl mx-4 hidden lg:block">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaSearch className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search courses, jobs, or members..."
//                 className={`block w-full pl-10 pr-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
//               />
//             </div>
//           </div>

//           {/* Right Section - User Controls */}
//           <div className="flex items-center space-x-4">
//             {/* Theme Toggle - Exact icon click area */}
//             <button
//               onClick={toggleDarkMode}
//               className={`relative ${darkMode ? 'text-yellow-300' : 'text-gray-600'}`}
//               aria-label="Toggle theme"
//             >
//               {darkMode ? (
//                 <RiSunFill className="h-5 w-5" />
//               ) : (
//                 <RiMoonFill className="h-5 w-5" />
//               )}
//             </button>

//             {/* Notification Bell - Exact icon click area */}
//             <button 
//               className={`relative ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
//               aria-label="Notifications"
//             >
//               <FaBell className="h-5 w-5" />
//               <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 hover-none"></span>
//             </button>

//             {/* Profile Icon - Exact icon click area */}
//             <div className="relative">
//               <button 
//                 className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
//                 aria-label="User profile"
//               >
//                 <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center">
//                   <FaUserCircle className="h-6 w-6 text-white" />
//                 </div>
//               </button>
              
//               {/* Language Indicator Badge - Now positioned better */}
//               <span className="absolute -bottom-1 -right-1 bg-[#C35029] text-white text-xs px-1 py-0.5 rounded-full border border-white">
//                 EN
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Search (Hidden on desktop) */}
//         <div className="pb-3 px-2 lg:hidden">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FaSearch className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//             </div>
//             <input
//               type="text"
//               placeholder="Search..."
//               className={`block w-full pl-10 pr-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;





import React from 'react';
import { FaSearch, FaUserCircle, FaGraduationCap, FaBriefcase, FaComments, FaGlobe } from 'react-icons/fa';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { HiMenuAlt2 } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

const Navbar = ({ darkMode, toggleDarkMode, toggleSidebar }) => {
  return (
    <div className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Section - Collapse button and Logo */}
          <div className="flex items-center space-x-4">
            {/* Menu Button - Moved closer to the edge */}
            <button 
              onClick={toggleSidebar}
              className={`p-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'} hover:bg-transparent`}
              aria-label="Toggle sidebar"
            >
              <HiMenuAlt2 className="h-5 w-5" />
            </button>

            {/* Logo */}
            <div className="hidden md:flex items-center space-x-1">
              <FaGlobe className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className="ml-1 text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                LexiVerse
              </span>
            </div>

            {/* Main Navigation Links - Expanded with proper spacing */}
            <div className="hidden md:flex items-center space-x-2 ml-4">
              <NavLink 
                to="/dashboard/learn"
                className={({ isActive }) => `flex items-center px-3 py-2 rounded-md font-medium ${
                  isActive 
                    ? darkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-blue-50 text-blue-600'
                    : darkMode 
                      ? 'text-gray-300 hover:bg-transparent' 
                      : 'text-gray-700 hover:bg-transparent'
                }`}
              >
                <FaGraduationCap className="mr-2" />
                Learn
              </NavLink>
              
              <NavLink 
                to="/dashboard/jobs"
                className={({ isActive }) => `flex items-center px-3 py-2 rounded-md font-medium ${
                  isActive 
                    ? darkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-blue-50 text-blue-600'
                    : darkMode 
                      ? 'text-gray-300 hover:bg-transparent' 
                      : 'text-gray-700 hover:bg-transparent'
                }`}
              >
                <FaBriefcase className="mr-2" />
                Jobs
              </NavLink>
              
              <NavLink 
                to="/dashboard/community"
                className={({ isActive }) => `flex items-center px-3 py-2 rounded-md font-medium ${
                  isActive 
                    ? darkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-blue-50 text-blue-600'
                    : darkMode 
                      ? 'text-gray-300 hover:bg-transparent' 
                      : 'text-gray-700 hover:bg-transparent'
                }`}
              >
                <FaComments className="mr-2" />
                Community
              </NavLink>
            </div>
          </div>

          {/* Center Section - Search (Wider on larger screens) */}
          <div className="flex-1 max-w-xl mx-4 hidden lg:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <input
                type="text"
                placeholder="Search courses, jobs, or members..."
                className={`block w-full pl-10 pr-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
          </div>

          {/* Right Section - User Controls */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle - Exact icon click area with no hover background */}
            <button
              onClick={toggleDarkMode}
              className={`p-1 ${darkMode ? 'text-yellow-300' : 'text-gray-600'} hover:bg-transparent`}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <RiSunFill className="h-5 w-5" />
              ) : (
                <RiMoonFill className="h-5 w-5" />
              )}
            </button>

            {/* Profile Icon - Exact icon click area with no hover background */}
            <div className="relative">
              <button 
                className={`p-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'} hover:bg-transparent`}
                aria-label="User profile"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center">
                  <FaUserCircle className="h-6 w-6 text-white" />
                </div>
              </button>
              
              {/* Language Indicator Badge - Now positioned better */}
              <span className="absolute -bottom-1 -right-1 bg-[#C35029] text-white text-xs px-1 py-0.5 rounded-full border border-white">
                EN
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Search (Hidden on desktop) */}
        <div className="pb-3 px-2 lg:hidden">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className={`block w-full pl-10 pr-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;