import React from 'react';
import UserForm from '../components/UserForm';

const CreateUserPage = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Create New User</h1>
      <UserForm />
    </div>
  );
}

export default CreateUserPage;
