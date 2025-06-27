// import React from 'react';
// import { FaSearch, FaBell, FaCog, FaUserCircle, FaMoon } from 'react-icons/fa';

// export const Navbar = ({ darkMode, toggleDarkMode }) => {
//   return (
//     <div className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
//       {/* Search Bar */}
//       <div className="flex items-center w-1/4">
//         <input
//           type="text"
//           placeholder="Search"
//           className={`border rounded-lg p-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
//           style={{ width: '100%' }} 
//         />
//         <button className={`p-2 rounded-full transition duration-200 hover:bg-gray-600 bg-transparent`}>
//           <FaSearch className={`${darkMode ? 'text-white' : 'text-gray-500'}`} />
//         </button>
//       </div>

//       {/* Right Icons */}
//       <div className="flex items-center space-x-1">
//         <button 
//           onClick={toggleDarkMode} 
//           className={`p-2 rounded-full transition duration-200 hover:bg-gray-600 bg-transparent`}
//         >
//           <FaMoon className={`${darkMode ? 'text-white' : 'text-gray-500'}`} />
//         </button>
//         <button 
//           className={`p-2 rounded-full transition duration-200 hover:bg-gray-600 bg-transparent`}
//         >
//           <FaBell className={`${darkMode ? 'text-white' : 'text-gray-500'}`} />
//         </button>
//         <button 
//           className={`p-2 rounded-full transition duration-200 hover:bg-gray-600 bg-transparent`}
//         >
//           <FaCog className={`${darkMode ? 'text-white' : 'text-gray-500'}`} />
//         </button>
//         <button 
//           className={`p-2 rounded-full transition duration-200 hover:bg-gray-600 bg-transparent`}
//         >
//           <FaUserCircle className={`${darkMode ? 'text-white' : 'text-gray-500'}`} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;






import React from 'react';
import { FaSearch, FaBell, FaCog, FaUserCircle, FaMoon } from 'react-icons/fa';

export const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
      {/* Search Bar */}
      <div className="relative flex items-center w-1/4">
        <input
          type="text"
          placeholder="Search"
          className={`border rounded-lg p-2 pl-10 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
          style={{ width: '100%' }} 
        />
        <FaSearch className={`absolute left-3 ${darkMode ? 'text-white' : 'text-gray-500'} pointer-events-none`} />
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-1">
        <button 
          onClick={toggleDarkMode} 
          className={`p-2 rounded-full transition duration-200 hover:bg-gray-600 bg-transparent`}
        >
          <FaMoon className={`${darkMode ? 'text-white' : 'text-gray-500'}`} />
        </button>
        <button 
          className={`p-2 rounded-full transition duration-200 hover:bg-gray-600 bg-transparent`}
        >
          <FaBell className={`${darkMode ? 'text-white' : 'text-gray-500'}`} />
        </button>
        <button 
          className={`p-2 rounded-full transition duration-200 hover:bg-gray-600 bg-transparent`}
        >
          <FaCog className={`${darkMode ? 'text-white' : 'text-gray-500'}`} />
        </button>
        <button 
          className={`p-2 rounded-full transition duration-200 hover:bg-gray-600 bg-transparent`}
        >
          <FaUserCircle className={`${darkMode ? 'text-white' : 'text-gray-500'}`} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;






