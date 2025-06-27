import React, { useState, useEffect } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaBell,
  FaUserCircle,
  FaTasks,
} from 'react-icons/fa';
import { AiOutlineLineChart } from 'react-icons/ai';
import { RiFileEditLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { Line, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'animate.css'; // Importing animate.css for additional animation effects

const Home = ({ darkMode }) => {
  const [users, setUsers] = useState(1250);
  const [messages, setMessages] = useState(320);
  const [reports, setReports] = useState(15);

  // useEffect(() => {
  //   if (reports > 10) {
  //     Swal.fire({
  //       title: 'Warning!',
  //       text: 'You have more than 10 pending reports to review!',
  //       icon: 'warning',
  //       confirmButtonText: 'Okay',
  //       background: darkMode ? '#333' : '#fff',
  //       color: darkMode ? '#fff' : '#333',
  //     });
  //   }
  // }, [reports, darkMode]);

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Users Growth',
        data: [1100, 1150, 1200, 1225, 1240, users],
        backgroundColor: 'rgba(239,146,115,0.2)',
        borderColor: 'rgba(239,146,115,1)',
        borderWidth: 2,
      },
    ],
  };

  const doughnutData = {
    labels: ['Growth', 'Remaining'],
    datasets: [
      {
        data: [users - 1000, 1500 - users],
        backgroundColor: ['rgba(239,146,115,1)', 'rgba(185,185,185,1)'],
        hoverBackgroundColor: ['#ef926f', '#b9b9b9'],
      },
    ],
  };

  const taskProgressData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ['#ef926f', '#b9b9b9'],
        hoverBackgroundColor: ['#ef926f', '#b9b9b9'],
      },
    ],
  };

  return (
    <div
      className={`flex flex-col h-full ${
        darkMode ? ' text-white' : 'bg-gray-100 text-black'
      } relative`}
    >
      {/* Background Animation */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="bg-gradient-to-r from-[#ef926f] to-[#b9b9b9] opacity-25 animate-pulse h-full w-full"></div>
      </div>

      {/* Header */}
      <header className="bg-white/60 backdrop-blur-md shadow-md p-6 flex justify-between items-center relative z-10">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <FaBell className="text-xl text-gray-700 cursor-pointer hover:text-[#ef926f] transition duration-300 animate__animated animate__pulse" />
          <div className="relative group">
            <FaUserCircle className="text-3xl text-gray-700 cursor-pointer hover:text-[#ef926f] transition duration-300" />
            {/* Animated Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md hidden group-hover:block animate__animated animate__fadeIn">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
                Settings
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-scroll relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative z-10">
            <h3 className="text-xl font-semibold text-gray-900">Total Users</h3>
            <p className="text-3xl font-bold text-[#ef926f]">{users}</p>
            <div className="mt-4 flex items-center text-gray-500">
              <FaUser className="text-xl mr-2" />
              <span>Active Users</span>
            </div>
            <div className="mt-4">
              <Doughnut data={doughnutData} />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative z-10">
            <h3 className="text-xl font-semibold text-gray-900">Messages</h3>
            <p className="text-3xl font-bold text-[#ef926f]">{messages}</p>
            <div className="mt-4 flex items-center text-gray-500">
              <FaEnvelope className="text-xl mr-2" />
              <span>Unread Messages</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative z-10">
            <h3 className="text-xl font-semibold text-gray-900">Pending Reports</h3>
            <p className="text-3xl font-bold text-[#ef926f]">{reports}</p>
            <div className="mt-4 flex items-center text-gray-500">
              <AiOutlineLineChart className="text-xl mr-2" />
              <span>Reports to Review</span>
            </div>
            <div className="relative pt-1 mt-4">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${(reports / 20) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#ef926f]"
                ></div>
              </div>
              <span className="text-xs text-gray-500">
                Progress: {((reports / 20) * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Card 4: Task Progress with Circular Progress Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative z-10">
            <h3 className="text-xl font-semibold text-gray-900">Task Completion</h3>
            <div className="mt-4">
              <Doughnut data={taskProgressData} />
            </div>
          </div>
        </div>

        {/* Line Chart for Users Growth */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            User Growth Over Time
          </h3>
          <Line data={chartData} />
        </div>

        {/* Futuristic Dashboard Overview Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8 hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative z-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Dashboard Overview
          </h3>
          <p className="text-lg">
            Recent activity: You reviewed{' '}
            <span className="font-bold">{reports}</span> reports this week.
          </p>
          <p className="text-lg">
            Achievements: <span className="font-bold">{users - 1000}</span> new
            users this month!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;




