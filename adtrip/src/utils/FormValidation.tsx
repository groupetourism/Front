
// Function to format phone number
export const validatePhoneNumber = (phone: string): boolean => {
  return /^\d{9}$/.test(phone);
};

// Function to validate form fields
export const validateForm = (formData: {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  // Validate First Name
  if (!formData.firstname.trim()) {
    errors.firstname = 'First Name is required';
  }

  // Validate Last Name
  if (!formData.lastname.trim()) {
    errors.lastname = 'Last Name is required';
  }

  // Validate Email
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Invalid email address';
  }

  // Validate Phone Number
  if (!formData.phone.trim()) {
    errors.phone = 'Phone Number is required';
  } else if (!validatePhoneNumber(formData.phone)) {
    errors.phone = 'Phone number must be 9 digits';
  }

  // Validate Password
  if (!formData.password.trim()) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 5 || formData.password.length > 15) {
    errors.password = 'Password must be between 5 and 15 characters';
  }

  // Validate Confirm Password
  if (!formData.password_confirmation.trim()) {
    errors.password_confirmation = 'Confirm Password is required';
  } else if (formData.password_confirmation !== formData.password) {
    errors.password_confirmation = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Function to validate login form fields
export const validateLoginForm = (
  formData: {
    email: string;
    phone: string; // Add phone field
    password: string;
  }
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  // Validate Email
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Invalid email address';
  }

  // Validate Phone Number
  if (!formData.phone.trim()) {
    errors.phone = 'Phone Number is required';
  } else if (!validatePhoneNumber(formData.phone)) {
    errors.phone = 'Phone number must be 9 digits';
  }

  // Validate Password
  if (!formData.password.trim()) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 5 || formData.password.length > 15) {
    errors.password = 'Password must be between 5 and 15 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};