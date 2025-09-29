// import { useState, useEffect } from 'react';
// import { FiEdit, FiTrash2, FiPlus, FiSearch, FiX, FiEye, FiEyeOff, FiArchive, FiPackage } from 'react-icons/fi';
// import Swal from 'sweetalert2';
// import { axiosInstance } from '../../utils/axiosInstance';

// export default function CourseList({ onSelectCourse, onCreateCourse, isCreating }) {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [newCourse, setNewCourse] = useState({
//     title: '',
//     description: '',
//     language: 'English',
//     level: 'Beginner',
//     specialization: 'translation'
//   });

//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const userData = JSON.parse(sessionStorage.getItem('user') || '{}');
//     setUser(userData);
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const response = await axiosInstance.get(`/api/courses?status=${statusFilter}`);
//       setCourses(response.data.courses || response.data);
//     } catch (error) {
//       console.error('Failed to fetch courses:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to load courses',
//         text: error.response?.data?.message || error.message
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, [statusFilter]);

//   const handleCreateNewCourse = async (e) => {
//     e.preventDefault();
    
//     if (!newCourse.title.trim() || !newCourse.description.trim()) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing fields',
//         text: 'Please fill in all required fields'
//       });
//       return;
//     }

//     if (!user || !user._id) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Authentication required',
//         text: 'Please log in again'
//       });
//       return;
//     }

//     const courseDataWithUserId = {
//       ...newCourse,
//       userId: user._id
//     };

//     await onCreateCourse(courseDataWithUserId);
//     setShowCreateForm(false);
//     setNewCourse({
//       title: '',
//       description: '',
//       language: 'English',
//       level: 'Beginner',
//       specialization: 'translation'
//     });
//   };

//   const handleDeleteCourse = async (courseId) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "This action cannot be undone!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     });

//     if (result.isConfirmed) {
//       try {
//         await axiosInstance.delete(`/api/courses/${courseId}`);
//         Swal.fire('Deleted!', 'Course has been deleted.', 'success');
//         fetchCourses();
//       } catch (error) {
//         console.error('Failed to delete course:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Failed to delete course',
//           text: error.response?.data?.message || error.message
//         });
//       }
//     }
//   };

//   const handlePublishCourse = async (courseId) => {
//     try {
//       await axiosInstance.patch(`/api/courses/${courseId}/publish`);
//       Swal.fire('Published!', 'Course is now published.', 'success');
//       fetchCourses();
//     } catch (error) {
//       console.error('Failed to publish course:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to publish course',
//         text: error.response?.data?.message || error.message
//       });
//     }
//   };

//   const handleUnpublishCourse = async (courseId) => {
//     try {
//       await axiosInstance.patch(`/api/courses/${courseId}/unpublish`);
//       Swal.fire('Unpublished!', 'Course is now a draft.', 'success');
//       fetchCourses();
//     } catch (error) {
//       console.error('Failed to unpublish course:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to unpublish course',
//         text: error.response?.data?.message || error.message
//       });
//     }
//   };

//   const handleArchiveCourse = async (courseId) => {
//     try {
//       await axiosInstance.patch(`/api/courses/${courseId}/archive`);
//       Swal.fire('Archived!', 'Course has been archived.', 'success');
//       fetchCourses();
//     } catch (error) {
//       console.error('Failed to archive course:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to archive course',
//         text: error.response?.data?.message || error.message
//       });
//     }
//   };

//   const handleRestoreCourse = async (courseId) => {
//     try {
//       await axiosInstance.patch(`/api/courses/${courseId}/restore`);
//       Swal.fire('Restored!', 'Course has been restored from archive.', 'success');
//       fetchCourses();
//     } catch (error) {
//       console.error('Failed to restore course:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to restore course',
//         text: error.response?.data?.message || error.message
//       });
//     }
//   };

//   const getStatusActions = (course) => {
//     switch (course.status) {
//       case 'draft':
//         return [
//           {
//             icon: <FiEye className="mr-1" />,
//             label: 'Publish',
//             action: () => handlePublishCourse(course._id),
//             color: 'green'
//           },
//           {
//             icon: <FiArchive className="mr-1" />,
//             label: 'Archive',
//             action: () => handleArchiveCourse(course._id),
//             color: 'gray'
//           }
//         ];
//       case 'published':
//         return [
//           {
//             icon: <FiEyeOff className="mr-1" />,
//             label: 'Unpublish',
//             action: () => handleUnpublishCourse(course._id),
//             color: 'yellow'
//           },
//           {
//             icon: <FiArchive className="mr-1" />,
//             label: 'Archive',
//             action: () => handleArchiveCourse(course._id),
//             color: 'gray'
//           }
//         ];
//       case 'archived':
//         return [
//           {
//             icon: <FiPackage className="mr-1" />,
//             label: 'Restore',
//             action: () => handleRestoreCourse(course._id),
//             color: 'blue'
//           }
//         ];
//       default:
//         return [];
//     }
//   };

//   const filteredCourses = courses.filter(course => {
//     const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C35029]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-xs overflow-hidden border border-gray-200">
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-[#C35029]">My Courses</h2>
//           <button
//             onClick={() => setShowCreateForm(true)}
//             className="px-4 py-2 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg flex items-center"
//           >
//             <FiPlus className="mr-2" /> New Course
//           </button>
//         </div>

//         {showCreateForm && (
//           <div className="bg-[#f8e1d8] p-4 rounded-lg mb-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="font-semibold text-[#C35029]">Create New Course</h3>
//               <button
//                 onClick={() => setShowCreateForm(false)}
//                 className="text-[#C35029] hover:text-[#a04020]"
//               >
//                 <FiX size={20} />
//               </button>
//             </div>
            
//             <form onSubmit={handleCreateNewCourse} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
//                 <input
//                   type="text"
//                   value={newCourse.title}
//                   onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
//                   placeholder="e.g., Spanish for Beginners"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
//                 <textarea
//                   value={newCourse.description}
//                   onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
//                   rows={3}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
//                   placeholder="Describe what students will learn..."
//                   required
//                 />
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
//                   <select
//                     value={newCourse.language}
//                     onChange={(e) => setNewCourse({...newCourse, language: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
//                   >
//                     <option value="English">English</option>
//                     <option value="Spanish">Spanish</option>
//                     <option value="French">French</option>
//                     <option value="German">German</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
//                   <select
//                     value={newCourse.level}
//                     onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
//                   >
//                     <option value="Beginner">Beginner</option>
//                     <option value="Intermediate">Intermediate</option>
//                     <option value="Advanced">Advanced</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
//                   <select
//                     value={newCourse.specialization}
//                     onChange={(e) => setNewCourse({...newCourse, specialization: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
//                   >
//                     <option value="translation">Translation</option>
//                     <option value="transcription">Transcription</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div className="flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowCreateForm(false)}
//                   className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isCreating}
//                   className="px-4 py-2 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg disabled:opacity-50"
//                 >
//                   {isCreating ? 'Creating...' : 'Create Course'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div className="relative">
//             <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search courses..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
//             />
//           </div>
          
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
//           >
//             <option value="all">All Status</option>
//             <option value="draft">Draft</option>
//             <option value="published">Published</option>
//             <option value="archived">Archived</option>
//           </select>
//         </div>
//       </div>

//       <div className="p-6">
//         {filteredCourses.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">📚</div>
//             <h3 className="text-xl font-medium text-gray-900 mb-2">
//               {courses.length === 0 ? 'No courses yet' : 'No courses found'}
//             </h3>
//             <p className="text-gray-600 mb-6">
//               {courses.length === 0 
//                 ? 'Get started by creating your first course!' 
//                 : 'Try adjusting your search terms or filters.'
//               }
//             </p>
//             <button
//               onClick={() => setShowCreateForm(true)}
//               className="px-6 py-3 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg font-medium"
//             >
//               Create Your First Course
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredCourses.map((course) => {
//               const statusActions = getStatusActions(course);
              
//               return (
//                 <div key={course._id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
//                   <div className="h-32 bg-gradient-to-r from-[#C35029] to-[#ef9273] flex items-center justify-center">
//                     <span className="text-white text-2xl font-bold">
//                       {course.language.substring(0, 2).toUpperCase()}
//                     </span>
//                   </div>
                  
//                   <div className="p-4">
//                     <div className="flex items-start justify-between mb-2">
//                       <h3 className="font-bold text-gray-900 text-lg line-clamp-2">{course.title}</h3>
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         course.status === 'published' ? 'bg-green-100 text-green-800' :
//                         course.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
//                         'bg-gray-100 text-gray-800'
//                       }`}>
//                         {course.status}
//                       </span>
//                     </div>
                    
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
                    
//                     <div className="flex items-center justify-between mb-4">
//                       <span className="bg-[#f8e1d8] text-[#C35029] px-2 py-1 rounded-full text-xs font-medium">
//                         {course.level}
//                       </span>
//                       <span className="text-gray-500 text-sm">{course.language}</span>
//                     </div>
                    
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => onSelectCourse(course)}
//                         className="flex-1 px-3 py-2 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg text-sm flex items-center justify-center"
//                       >
//                         <FiEdit className="mr-1" /> Edit
//                       </button>
                      
//                       {statusActions.map((action, index) => (
//                         <button
//                           key={index}
//                           onClick={action.action}
//                           className={`px-3 py-2 ${
//                             action.color === 'green' ? 'bg-green-100 hover:bg-green-200 text-green-600' :
//                             action.color === 'yellow' ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-600' :
//                             action.color === 'blue' ? 'bg-blue-100 hover:bg-blue-200 text-blue-600' :
//                             'bg-gray-100 hover:bg-gray-200 text-gray-600'
//                           } rounded-lg text-sm flex items-center justify-center`}
//                           title={action.label}
//                         >
//                           {action.icon}
//                         </button>
//                       ))}
                      
//                       <button
//                         onClick={() => handleDeleteCourse(course._id)}
//                         className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm flex items-center justify-center"
//                         title="Delete course"
//                       >
//                         <FiTrash2 />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }










import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiX, FiEye, FiEyeOff, FiArchive, FiPackage, FiFilter } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { axiosInstance } from '../../utils/axiosInstance';

export default function CourseList({ onSelectCourse, onCreateCourse, isCreating }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    language: 'English',
    level: 'Beginner',
    specialization: 'translation'
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('user') || '{}');
    setUser(userData);
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      // For "all" status, don't send any status filter to get all courses
      const url = statusFilter === 'all' 
        ? '/api/courses' 
        : `/api/courses?status=${statusFilter}`;
      
      const response = await axiosInstance.get(url);
      setCourses(response.data.courses || response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to load courses',
        text: error.response?.data?.message || error.message
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [statusFilter]);

  const handleCreateNewCourse = async (e) => {
    e.preventDefault();
    
    if (!newCourse.title.trim() || !newCourse.description.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing fields',
        text: 'Please fill in all required fields'
      });
      return;
    }

    if (!user || !user._id) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication required',
        text: 'Please log in again'
      });
      return;
    }

    const courseDataWithUserId = {
      ...newCourse,
      userId: user._id
    };

    await onCreateCourse(courseDataWithUserId);
    setShowCreateForm(false);
    setNewCourse({
      title: '',
      description: '',
      language: 'English',
      level: 'Beginner',
      specialization: 'translation'
    });
  };

  const handleDeleteCourse = async (courseId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/api/courses/${courseId}`);
        Swal.fire('Deleted!', 'Course has been deleted.', 'success');
        fetchCourses();
      } catch (error) {
        console.error('Failed to delete course:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to delete course',
          text: error.response?.data?.message || error.message
        });
      }
    }
  };

  const handlePublishCourse = async (courseId) => {
    try {
      await axiosInstance.patch(`/api/courses/${courseId}/publish`);
      Swal.fire('Published!', 'Course is now published.', 'success');
      fetchCourses();
    } catch (error) {
      console.error('Failed to publish course:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to publish course',
        text: error.response?.data?.message || error.message
      });
    }
  };

  const handleUnpublishCourse = async (courseId) => {
    try {
      await axiosInstance.patch(`/api/courses/${courseId}/unpublish`);
      Swal.fire('Unpublished!', 'Course is now a draft.', 'success');
      fetchCourses();
    } catch (error) {
      console.error('Failed to unpublish course:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to unpublish course',
        text: error.response?.data?.message || error.message
      });
    }
  };

  const handleArchiveCourse = async (courseId) => {
    try {
      await axiosInstance.patch(`/api/courses/${courseId}/archive`);
      Swal.fire('Archived!', 'Course has been archived.', 'success');
      fetchCourses();
    } catch (error) {
      console.error('Failed to archive course:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to archive course',
        text: error.response?.data?.message || error.message
      });
    }
  };

  const handleRestoreCourse = async (courseId) => {
    try {
      await axiosInstance.patch(`/api/courses/${courseId}/restore`);
      Swal.fire('Restored!', 'Course has been restored from archive.', 'success');
      fetchCourses();
    } catch (error) {
      console.error('Failed to restore course:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to restore course',
        text: error.response?.data?.message || error.message
      });
    }
  };

  const getStatusActions = (course) => {
    switch (course.status) {
      case 'draft':
        return [
          {
            icon: <FiEye className="mr-1" />,
            label: 'Publish',
            action: () => handlePublishCourse(course._id),
            color: 'green'
          },
          {
            icon: <FiArchive className="mr-1" />,
            label: 'Archive',
            action: () => handleArchiveCourse(course._id),
            color: 'gray'
          }
        ];
      case 'published':
        return [
          {
            icon: <FiEyeOff className="mr-1" />,
            label: 'Unpublish',
            action: () => handleUnpublishCourse(course._id),
            color: 'yellow'
          },
          {
            icon: <FiArchive className="mr-1" />,
            label: 'Archive',
            action: () => handleArchiveCourse(course._id),
            color: 'gray'
          }
        ];
      case 'archived':
        return [
          {
            icon: <FiPackage className="mr-1" />,
            label: 'Restore',
            action: () => handleRestoreCourse(course._id),
            color: 'blue'
          }
        ];
      default:
        return [];
    }
  };

  const getStatusCounts = () => {
    const counts = {
      all: courses.length,
      draft: courses.filter(course => course.status === 'draft').length,
      published: courses.filter(course => course.status === 'published').length,
      archived: courses.filter(course => course.status === 'archived').length
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C35029]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xs overflow-hidden border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#C35029]">My Courses</h2>
            <p className="text-gray-600 text-sm mt-1">
              Total: {statusCounts.all} courses • 
              Draft: {statusCounts.draft} • 
              Published: {statusCounts.published} • 
              Archived: {statusCounts.archived}
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg flex items-center"
          >
            <FiPlus className="mr-2" /> New Course
          </button>
        </div>

        {showCreateForm && (
          <div className="bg-[#f8e1d8] p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-[#C35029]">Create New Course</h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-[#C35029] hover:text-[#a04020]"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateNewCourse} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                  placeholder="e.g., Spanish for Beginners"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                  placeholder="Describe what students will learn..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select
                    value={newCourse.language}
                    onChange={(e) => setNewCourse({...newCourse, language: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                  <select
                    value={newCourse.specialization}
                    onChange={(e) => setNewCourse({...newCourse, specialization: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                  >
                    <option value="translation">Translation</option>
                    <option value="transcription">Transcription</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-4 py-2 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg disabled:opacity-50"
                >
                  {isCreating ? 'Creating...' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
            >
              <option value="all">All Status ({statusCounts.all})</option>
              <option value="draft">Draft ({statusCounts.draft})</option>
              <option value="published">Published ({statusCounts.published})</option>
              <option value="archived">Archived ({statusCounts.archived})</option>
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex space-x-1 mb-4 p-1 bg-gray-100 rounded-lg">
          {[
            { value: 'all', label: 'All', count: statusCounts.all },
            { value: 'draft', label: 'Draft', count: statusCounts.draft },
            { value: 'published', label: 'Published', count: statusCounts.published },
            { value: 'archived', label: 'Archived', count: statusCounts.archived }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                statusFilter === tab.value
                  ? 'bg-white text-[#C35029] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">
              {statusFilter === 'draft' ? '📝' : 
               statusFilter === 'published' ? '🌐' : 
               statusFilter === 'archived' ? '📦' : '📚'}
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {courses.length === 0 ? 'No courses yet' : `No ${statusFilter} courses found`}
            </h3>
            <p className="text-gray-600 mb-6">
              {courses.length === 0 
                ? 'Get started by creating your first course!' 
                : statusFilter === 'all'
                ? 'Try adjusting your search terms.'
                : `You don't have any ${statusFilter} courses. Try changing the filter.`
              }
            </p>
            {courses.length === 0 && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-6 py-3 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg font-medium"
              >
                Create Your First Course
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredCourses.length} of {statusCounts.all} courses
              {statusFilter !== 'all' && ` (filtered by ${statusFilter})`}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const statusActions = getStatusActions(course);
                
                return (
                  <div key={course._id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-32 bg-gradient-to-r from-[#C35029] to-[#ef9273] flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {course.language.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-900 text-lg line-clamp-2">{course.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.status === 'published' ? 'bg-green-100 text-green-800' :
                          course.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-[#f8e1d8] text-[#C35029] px-2 py-1 rounded-full text-xs font-medium">
                          {course.level}
                        </span>
                        <span className="text-gray-500 text-sm">{course.language}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onSelectCourse(course)}
                          className="flex-1 px-3 py-2 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg text-sm flex items-center justify-center"
                        >
                          <FiEdit className="mr-1" /> Edit
                        </button>
                        
                        {statusActions.map((action, index) => (
                          <button
                            key={index}
                            onClick={action.action}
                            className={`px-3 py-2 ${
                              action.color === 'green' ? 'bg-green-100 hover:bg-green-200 text-green-600' :
                              action.color === 'yellow' ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-600' :
                              action.color === 'blue' ? 'bg-blue-100 hover:bg-blue-200 text-blue-600' :
                              'bg-gray-100 hover:bg-gray-200 text-gray-600'
                            } rounded-lg text-sm flex items-center justify-center`}
                            title={action.label}
                          >
                            {action.icon}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => handleDeleteCourse(course._id)}
                          className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm flex items-center justify-center"
                          title="Delete course"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}