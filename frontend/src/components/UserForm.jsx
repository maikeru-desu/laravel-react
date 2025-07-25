import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useValidationErrors from '../hooks/useValidationErrors';
import { 
  createUser, 
  clearErrors,
  resetSuccessCreating,
  selectCreateUserLoading, 
  selectValidationErrors,
  selectSuccessCreating
} from '../store/slices/userSlice';

const UserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    roles: []
  });
  const dispatch = useDispatch();
  const isSubmitting = useSelector(selectCreateUserLoading);
  const validationErrors = useSelector(selectValidationErrors);
  const successCreating = useSelector(selectSuccessCreating);
  const { hasFieldError, getFieldErrors } = useValidationErrors(validationErrors);

  const availableRoles = [
    { id: 1, name: 'Author' },
    { id: 2, name: 'Editor' },
    { id: 3, name: 'Subscriber' },
    { id: 4, name: 'Administrator' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    const roleName = value;
    
    if (checked) {
      setFormData({
        ...formData,
        roles: [...formData.roles, roleName]
      });
    } else {
      setFormData({
        ...formData,
        roles: formData.roles.filter(id => id !== roleName)
      });
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);
  
  useEffect(() => {
    if (successCreating) {
      navigate('/');
      dispatch(resetSuccessCreating());
    }
  }, [successCreating, navigate, dispatch]);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(formData));
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create User</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="full_name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${hasFieldError('full_name') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter full name"
            required
          />
          {hasFieldError('full_name') && (
            <div className="text-red-500 text-xs mt-1">
              {getFieldErrors('full_name').map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${hasFieldError('email') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter email address"
            required
          />
          {hasFieldError('email') && (
            <div className="text-red-500 text-xs mt-1">
              {getFieldErrors('email').map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Roles</label>
          {hasFieldError('roles') && (
            <div className="text-red-500 text-xs mb-2">
              {getFieldErrors('roles').map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <div className="space-y-2">
            {availableRoles.map(role => (
              <div key={role.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`role-${role.id}`}
                  name="roles"
                  value={role.name}
                  onChange={handleRoleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`role-${role.id}`} className="ml-2 text-sm text-gray-700">
                  {role.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
