import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  error?: string;
  register: UseFormRegisterReturn;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, id, placeholder, error, register }) => {
  return (
    <div className="mb-6">
    <label
      htmlFor={id}
      className="block mb-2 text-md font-medium text-gray-800 dark:text-gray-200"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      {...register}
      className={`block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 border ${
        error ? 'border-red-500' : 'border-gray-300'
      } rounded-sm shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700`}
    />
    {error && (
      <p className="mt-2 text-sm text-red-500">
        {error}
      </p>
    )}
  </div>
  
  );
};

export default FormInput;
