
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Function to format phone number
export const formatPhoneNumber = (phone: string): string => {
  const phoneNumber = parsePhoneNumberFromString(phone, 'CM'); // 'CM' for Cameroon
  return phoneNumber ? phoneNumber.formatInternational() : phone;
};

// Function to validate phone number
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneNumber = parsePhoneNumberFromString(phone, 'CM');
  return phoneNumber ? phoneNumber.isValid() : false;
};

// Function to validate form fields
export const validateForm = (formData: {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
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
    errors.phone = 'Invalid phone number';
  }

  // Validate Password
  if (!formData.password.trim()) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 5 || formData.password.length > 15) {
    errors.password = 'Password must be between 5 and 15 characters';
  }

  // Validate Confirm Password
  if (!formData.confirmPassword.trim()) {
    errors.confirmPassword = 'Confirm Password is required';
  } else if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};