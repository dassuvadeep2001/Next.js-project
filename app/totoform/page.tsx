'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import baseURL, { endpoints } from '@/api';
import toast from "react-hot-toast";

type FormValues = {
  email: string;
  title: string;
  date: string;
  time: string;
  status: boolean;
};

type TodoProps = {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string; // Pass email of the user as a prop
};

const Todo = ({ isOpen, onClose, userEmail }: TodoProps) => {

  const storedUserName = localStorage.getItem("userName");
    const storedUserImage = localStorage.getItem("userImage");

    let api=baseURL+endpoints.todo;
    console.log(api);
  const { register, handleSubmit, setValue, formState: { errors },reset } = useForm<FormValues>();

  const mutation = useMutation({
    mutationFn: (data: FormValues) => axios.post(api, data),
    onSuccess: () => {
      toast.custom((t: any) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src={storedUserImage ?? ''}
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">
                  {storedUserName}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Task Added Successfully!
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-800">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-500 hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ))
      reset()
      onClose(); // Close modal on success
      setTimeout(() => 
        window.location.reload(), 2000);
    },
    onError: (error: any) => {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
     // Add status: false to the data object
  const updatedData = { ...data, status: false };
  
  // Send the updated data to the mutation
  mutation.mutate(updatedData);
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-8">
      <div className="relative w-full max-w-md p-10 bg-white rounded-md shadow-lg">
        <h2 className="mb-6 text-xl font-bold text-center text-green-600">Schedule Your Task</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-md font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue={userEmail} // Automatically populate user's email
              {...register("email", { required: "Email is required" })}
              className={`mt-1 block w-full px-3 py-2 text-gray-900 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Title Field */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-md font-medium text-gray-800">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter task title"
              {...register("title", { required: "Title is required" })}
              className={`mt-1 block w-full px-3 py-2 text-gray-900 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
          </div>

          {/* Date Field */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-md font-medium text-gray-800">
              Date
            </label>
            <input
              type="date"
              id="date"
              {...register("date", { required: "Date is required" })}
              className={`mt-1 block w-full px-3 py-2 text-gray-900 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>}
          </div>

          {/* Time Field */}
          <div className="mb-4">
            <label htmlFor="time" className="block text-md font-medium text-gray-800">
              Time
            </label>
            <input
              type="time"
              id="time"
              {...register("time", { required: "Time is required" })}
              className={`mt-1 block w-full px-3 py-2 text-gray-900 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.time ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save Task
          </button>
        </form>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
      </div>
    </div>
  ) : null;
};

export default Todo;
