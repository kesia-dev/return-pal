// sendMailService.js

export const sendMail = async (formData:any) => {
    try {
      const response = await fetch('http://localhost:4200/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        // Handle non-successful responses here
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending mail:', error.message);
      throw error;
    }
  };
  