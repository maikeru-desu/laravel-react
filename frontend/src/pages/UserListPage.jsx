import React from 'react';
import UserList from '../components/UserList';
import { Link } from 'react-router-dom';

const UserListPage = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Users</h1>
        <Link 
          to="/create" 
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Create New User
        </Link>
      </div>
      <UserList />
    </div>
  );
}

export default UserListPage;
