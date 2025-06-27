import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ManageAccount= () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'Job Seeker' });

  const handleAddUser = () => {
    // Simulate API call to add user
    setUsers([...users, { id: Date.now(), ...newUser, status: 'Active' }]);
    setNewUser({ username: '', email: '', password: '', role: 'Job Seeker' });
    Swal.fire('Success!', 'User added successfully.', 'success');
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This user will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter(user => user.id !== id));
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      }
    });
  };

  const handleStatusChange = (id, newStatus) => {
    setUsers(users.map(user => (user.id === id ? { ...user, status: newStatus } : user)));
    Swal.fire('Success!', `User status updated to ${newStatus}.`, 'success');
  };

  const filteredUsers = users.filter(user => 
    user.username.includes(searchTerm) || user.email.includes(searchTerm)
  );

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-pink-500 mb-4">User Management</h1>

      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search by username or email..."
          className="border rounded-lg p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-pink-500 text-white px-4 py-2 rounded-lg ml-2">Search</button>
      </div>

      <button
        className="bg-pink-500 text-white px-4 py-2 rounded-lg mb-4"
        onClick={() => handleAddUser()} // Open modal instead
      >
        Add User
      </button>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border-b p-4 text-left">User ID</th>
            <th className="border-b p-4 text-left">Username</th>
            <th className="border-b p-4 text-left">Email</th>
            <th className="border-b p-4 text-left">Role</th>
            <th className="border-b p-4 text-left">Status</th>
            <th className="border-b p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td className="border-b p-4">{user.id}</td>
              <td className="border-b p-4">{user.username}</td>
              <td className="border-b p-4">{user.email}</td>
              <td className="border-b p-4">{user.role}</td>
              <td className="border-b p-4">{user.status}</td>
              <td className="border-b p-4">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2"
                  onClick={() => handleStatusChange(user.id, 'Active')}
                >
                  Activate
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2"
                  onClick={() => handleStatusChange(user.id, 'Suspended')}
                >
                  Suspend
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAccount
