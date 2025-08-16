// import React, { useState, useEffect } from 'react';
// import {
//   FaUser,
//   FaEnvelope,
//   FaCalendarAlt,
//   FaBell,
//   FaUserCircle,
//   FaTasks,
// } from 'react-icons/fa';
// import { AiOutlineLineChart } from 'react-icons/ai';
// import { RiFileEditLine } from 'react-icons/ri';
// import Swal from 'sweetalert2';
// import { Line, Doughnut } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';
// import 'animate.css'; // Importing animate.css for additional animation effects

// const Home = ({ darkMode }) => {
//   const [users, setUsers] = useState(1250);
//   const [messages, setMessages] = useState(320);
//   const [reports, setReports] = useState(15);


//   const chartData = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//     datasets: [
//       {
//         label: 'Users Growth',
//         data: [1100, 1150, 1200, 1225, 1240, users],
//         backgroundColor: 'rgba(239,146,115,0.2)',
//         borderColor: 'rgba(239,146,115,1)',
//         borderWidth: 2,
//       },
//     ],
//   };

//   const doughnutData = {
//     labels: ['Growth', 'Remaining'],
//     datasets: [
//       {
//         data: [users - 1000, 1500 - users],
//         backgroundColor: ['rgba(239,146,115,1)', 'rgba(185,185,185,1)'],
//         hoverBackgroundColor: ['#ef926f', '#b9b9b9'],
//       },
//     ],
//   };

//   const taskProgressData = {
//     labels: ['Completed', 'Pending'],
//     datasets: [
//       {
//         data: [75, 25],
//         backgroundColor: ['#ef926f', '#b9b9b9'],
//         hoverBackgroundColor: ['#ef926f', '#b9b9b9'],
//       },
//     ],
//   };

//   return (
//     <div
//       className={`flex flex-col h-full ${
//         darkMode ? ' text-white' : 'bg-gray-100 text-black'
//       } relative`}
//     >
//       {/* Background Animation */}
//       <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
//         <div className="bg-gradient-to-r from-[#ef926f] to-[#b9b9b9] opacity-25 animate-pulse h-full w-full"></div>
//       </div>

//       {/* Header */}
//       <header className="bg-white/60 backdrop-blur-md shadow-md p-6 flex justify-between items-center relative z-10">
//         <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//         <div className="flex items-center space-x-4">
//           <FaBell className="text-xl text-gray-700 cursor-pointer hover:text-[#ef926f] transition duration-300 animate__animated animate__pulse" />
//           <div className="relative group">
//             <FaUserCircle className="text-3xl text-gray-700 cursor-pointer hover:text-[#ef926f] transition duration-300" />
//             {/* Animated Dropdown Menu */}
//             <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md hidden group-hover:block animate__animated animate__fadeIn">
//               <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
//                 Profile
//               </button>
//               <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
//                 Settings
//               </button>
//               <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 p-8 overflow-y-scroll relative z-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Card 1 */}
//           <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative z-10">
//             <h3 className="text-xl font-semibold text-gray-900">Total Users</h3>
//             <p className="text-3xl font-bold text-[#ef926f]">{users}</p>
//             <div className="mt-4 flex items-center text-gray-500">
//               <FaUser className="text-xl mr-2" />
//               <span>Active Users</span>
//             </div>
//             <div className="mt-4">
//               <Doughnut data={doughnutData} />
//             </div>
//           </div>

//           {/* Card 2 */}
//           <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative z-10">
//             <h3 className="text-xl font-semibold text-gray-900">Messages</h3>
//             <p className="text-3xl font-bold text-[#ef926f]">{messages}</p>
//             <div className="mt-4 flex items-center text-gray-500">
//               <FaEnvelope className="text-xl mr-2" />
//               <span>Unread Messages</span>
//             </div>
//           </div>

//           {/* Card 3 */}
//           <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative z-10">
//             <h3 className="text-xl font-semibold text-gray-900">Pending Reports</h3>
//             <p className="text-3xl font-bold text-[#ef926f]">{reports}</p>
//             <div className="mt-4 flex items-center text-gray-500">
//               <AiOutlineLineChart className="text-xl mr-2" />
//               <span>Reports to Review</span>
//             </div>
//             <div className="relative pt-1 mt-4">
//               <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
//                 <div
//                   style={{ width: `${(reports / 20) * 100}%` }}
//                   className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#ef926f]"
//                 ></div>
//               </div>
//               <span className="text-xs text-gray-500">
//                 Progress: {((reports / 20) * 100).toFixed(0)}%
//               </span>
//             </div>
//           </div>

//           {/* Card 4: Task Progress with Circular Progress Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative z-10">
//             <h3 className="text-xl font-semibold text-gray-900">Task Completion</h3>
//             <div className="mt-4">
//               <Doughnut data={taskProgressData} />
//             </div>
//           </div>
//         </div>

//         {/* Line Chart for Users Growth */}
//         <div className="bg-white p-6 rounded-lg shadow-md mt-8 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
//           <h3 className="text-xl font-semibold text-gray-900 mb-4">
//             User Growth Over Time
//           </h3>
//           <Line data={chartData} />
//         </div>

//         {/* Futuristic Dashboard Overview Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md mt-8 hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative z-10">
//           <h3 className="text-xl font-semibold text-gray-900 mb-4">
//             Dashboard Overview
//           </h3>
//           <p className="text-lg">
//             Recent activity: You reviewed{' '}
//             <span className="font-bold">{reports}</span> reports this week.
//           </p>
//           <p className="text-lg">
//             Achievements: <span className="font-bold">{users - 1000}</span> new
//             users this month!
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from 'react';
import {
  FaUserGraduate,
  FaBriefcase,
  FaCertificate,
  FaClock,
  FaUserTie,
  FaClipboardList,
  FaUserShield,
  FaTools,
  FaCog,
  FaDatabase,
  FaCheckCircle,
  FaFileAlt
} from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';

const Dashboard = ({ darkMode, userRole = 'jobseeker' }) => {
  // Sample data - replace with your actual data fetching logic
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Simulate data loading
    const loadData = () => {
      const data = {
        jobseeker: {
          availableJobs: 12,
          applications: 5,
          certifications: '3/8',
          skills: [
            { language: 'Spanish', level: 'Advanced', progress: 85 },
            { language: 'French', level: 'Intermediate', progress: 65 },
            { language: 'English', level: 'Native', progress: 100 }
          ],
          recommendedJobs: [
            { title: 'Medical Spanish Translator', rate: '$45/hr', match: '92%' },
            { title: 'French Content Moderator', rate: '$38/hr', match: '88%' }
          ]
        },
        recruiter: {
          activePostings: 8,
          applications: 24,
          shortlisted: 6,
          hired: 3,
          applicants: [
            { name: 'Maria Gonzalez', language: 'Spanish/English', rating: '4.8★', status: 'New' },
            { name: 'Jean Dubois', language: 'French/German', rating: 'Certified', status: 'Reviewed' }
          ]
        },
        admin: {
          systemStatus: 'Operational',
          activeUsers: 1248,
          platformActivity: {
            jobsPosted: 156,
            coursesTaken: 1280
          },
          alerts: [
            { title: 'Database Backup Needed', severity: 'medium', date: '2 days overdue' },
            { title: 'New Version Available', severity: 'low', date: 'v2.3.1 ready' }
          ]
        }
      };
      setDashboardData(data[userRole]);
    };

    loadData();
  }, [userRole]);

  if (!dashboardData) return <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>Loading...</div>;

  // Shared Metric Card Component
  const MetricCard = ({ title, value, icon, trend, borderColor }) => (
    <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md border-l-4 ${borderColor || 'border-[#EF9273]'}`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mr-4`}>
          {React.cloneElement(icon, { className: 'text-[#C35029]' })}
        </div>
        <div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</div>
          <div className="text-2xl font-bold">{value}</div>
        </div>
      </div>
      {trend && (
        <div className="mt-4 pt-4 border-t border-dashed border-gray-500/20">
          <div className={`text-sm ${trend.includes('↑') ? 'text-green-500' : 'text-red-500'}`}>{trend}</div>
        </div>
      )}
    </div>
  );

  // Jobseeker Dashboard
  const JobseekerDashboard = () => (
    <div className={`p-6 ${darkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-md mr-4`}>
          <FaUserGraduate className="text-2xl text-[#C35029]" />
        </div>
        <div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Your Language Freelance Hub
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Track your opportunities and growth
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard 
          title="Available Jobs" 
          value={dashboardData.availableJobs} 
          icon={<FaBriefcase />} 
          trend="↑ 2 new"
        />
        <MetricCard 
          title="Your Applications" 
          value={dashboardData.applications} 
          icon={<FaClipboardList />}
        />
        <MetricCard 
          title="Certifications" 
          value={dashboardData.certifications} 
          icon={<FaCertificate />}
          borderColor="border-green-400"
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <h2 className="text-lg font-semibold mb-4">Your Language Skills</h2>
          <div className="space-y-4">
            {dashboardData.skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span>{skill.language}</span>
                  <span className="text-sm text-gray-500">{skill.level}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#EF9273] h-2 rounded-full" 
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <h2 className="text-lg font-semibold mb-4">Recommended For You</h2>
          <div className="space-y-3">
            {dashboardData.recommendedJobs.map((job, index) => (
              <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} border border-[#EF9273]/30`}>
                <h3 className="font-medium">{job.title}</h3>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-[#C35029]">{job.rate}</span>
                  <span className="text-sm bg-[#EF9273] text-white px-2 rounded-full">
                    {job.match} match
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Recruiter Dashboard
  const RecruiterDashboard = () => (
    <div className={`p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Talent Acquisition Dashboard
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your language talent pipeline
          </p>
        </div>
        <button className={`flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
          <FaBriefcase className="mr-2" />
          Post New Job
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Active Postings" 
          value={dashboardData.activePostings} 
          icon={<FaBriefcase />} 
          trend="↑ 2 new"
        />
        <MetricCard 
          title="Applications" 
          value={dashboardData.applications} 
          icon={<FaUserGraduate />} 
          trend="↑ 5 new"
        />
        <MetricCard 
          title="Shortlisted" 
          value={dashboardData.shortlisted} 
          icon={<FaClipboardList />}
        />
        <MetricCard 
          title="Hired This Month" 
          value={dashboardData.hired} 
          icon={<FaUserTie />}
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Distribution */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <h2 className="text-lg font-semibold mb-4">Applications by Language</h2>
          <div className="h-64">
            <Doughnut 
              data={{
                labels: ['Spanish', 'French', 'German', 'Chinese', 'Others'],
                datasets: [{
                  data: [12, 8, 5, 3, 6],
                  backgroundColor: ['#EF9273', '#C35029', '#F4A261', '#E9C46A', '#2A9D8F']
                }]
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: darkMode ? '#fff' : '#333'
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Recent Applicants */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <h2 className="text-lg font-semibold mb-4">Recent Applicants</h2>
          <div className="space-y-4">
            {dashboardData.applicants.map((applicant, index) => (
              <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border-l-4 ${applicant.status === 'New' ? 'border-[#EF9273]' : 'border-blue-400'}`}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{applicant.name}</h3>
                    <p className="text-sm text-gray-500">{applicant.language}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${applicant.status === 'New' ? 'bg-[#EF9273]/20 text-[#C35029]' : 'bg-blue-100 text-blue-800'}`}>
                    {applicant.status}
                  </span>
                </div>
                <div className="mt-2 text-sm">
                  <span className={`px-2 py-1 rounded ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    {applicant.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Admin Dashboard
  const AdminDashboard = () => (
    <div className={`p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            System Administration
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Platform health and configuration
          </p>
        </div>
        <div className="flex space-x-3">
          <button className={`flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
            <FaTools className="mr-2" />
            Maintenance
          </button>
          <button className={`flex items-center px-4 py-2 rounded-lg bg-[#C35029] text-white shadow-sm`}>
            <FaUserShield className="mr-2" />
            Admin Console
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md border-t-4 border-green-500`}>
          <h3 className="font-medium mb-2">System Status</h3>
          <p className="text-3xl font-bold text-green-500">{dashboardData.systemStatus}</p>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <FaCheckCircle className="mr-2 text-green-500" />
            All systems normal
          </div>
        </div>
        
        <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md border-t-4 border-blue-400`}>
          <h3 className="font-medium mb-2">Active Users</h3>
          <p className="text-3xl font-bold text-blue-500">{dashboardData.activeUsers.toLocaleString()}</p>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Freelancers</span>
              <span>892</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Recruiters</span>
              <span>356</span>
            </div>
          </div>
        </div>

        <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md border-t-4 border-[#EF9273]`}>
          <h3 className="font-medium mb-2">Platform Activity</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Jobs Posted</span>
                <span>{dashboardData.platformActivity.jobsPosted}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-[#EF9273] h-1.5 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Courses Taken</span>
                <span>{dashboardData.platformActivity.coursesTaken}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-400 h-1.5 rounded-full" style={{width: '64%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <h2 className="text-lg font-semibold mb-4">System Alerts</h2>
          <div className="space-y-4">
            {dashboardData.alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'border-red-500' : 
                alert.severity === 'medium' ? 'border-yellow-500' : 'border-green-500'
              } ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex justify-between">
                  <h3 className="font-medium">{alert.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{alert.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className={`p-4 rounded-lg flex flex-col items-center ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}>
              <FaUserShield className="text-2xl text-[#C35029] mb-2" />
              <span>User Management</span>
            </button>
            <button className={`p-4 rounded-lg flex flex-col items-center ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}>
              <FaFileAlt className="text-2xl text-[#C35029] mb-2" />
              <span>Reports</span>
            </button>
            <button className={`p-4 rounded-lg flex flex-col items-center ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}>
              <FaCog className="text-2xl text-[#C35029] mb-2" />
              <span>Settings</span>
            </button>
            <button className={`p-4 rounded-lg flex flex-col items-center ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}>
              <FaDatabase className="text-2xl text-[#C35029] mb-2" />
              <span>Backups</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render the appropriate dashboard based on role
  switch(userRole) {
    case 'jobseeker':
      return <JobseekerDashboard />;
    case 'recruiter':
      return <RecruiterDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <JobseekerDashboard />;
  }
};

export default Dashboard;