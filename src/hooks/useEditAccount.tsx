// hooks/useEditAccount.js

import { useState } from 'react';

type FormData = {
  [key: string]: string;
};

const useEditAccount = () => {
  const [formData, setFormData] = useState<FormData>({
    // Initial form data or data fetched from the API
    // For example: name, email, etc.
  });

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      // Make API call to update user data
      // Example using fetch API:
      const response = await fetch('/api/users/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User data updated successfully');
        // Handle success, e.g., show a success message or redirect
      } else {
        console.error('Failed to update user data');
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return {
    formData,
    handleFieldChange,
    handleFormSubmit,
  };
};

export default useEditAccount;
