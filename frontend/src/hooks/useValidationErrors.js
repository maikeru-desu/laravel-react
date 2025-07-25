/**
 * Provides functions to check for field errors and get error messages
 */
const useValidationErrors = (validationErrors) => {
  /**
   * Check if a field has any validation errors
   * @param {string} field - The field name to check
   * @returns {boolean} - Whether the field has errors
   */
  const hasFieldError = (field) => {
    if (validationErrors[field]) return true;
    
    if (field === 'roles') {
      return Object.keys(validationErrors).some(key => key.startsWith('roles.'));
    }
    
    return false;
  };
  
  /**
   * Get all error messages for a field
   * @param {string} field - The field name to get errors for
   * @returns {Array} - Array of error messages
   */
  const getFieldErrors = (field) => {
    const errors = [];
    
    if (validationErrors[field]) {
      errors.push(...validationErrors[field]);
    }
    
    if (field === 'roles') {
      Object.keys(validationErrors)
        .filter(key => key.startsWith('roles.'))
        .forEach(key => {
          errors.push(...validationErrors[key]);
        });
    }
    
    return errors;
  };

  return { hasFieldError, getFieldErrors };
};

export default useValidationErrors;
