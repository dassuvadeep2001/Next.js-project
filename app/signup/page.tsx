'use client';

import { useForm, SubmitHandler, set } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import FormInput from '../../component/forminput';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import baseURL, { endpoints } from '@/api';
import toast, { Toaster } from "react-hot-toast";

type FormValues = {
  name: string;
  dob: string;
  email: string;
  phone: string;
  password: string;
  image: string;
};

const Register = () => {
  let api=baseURL+endpoints.user;
  console.log(api);

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<FormValues>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  let router=useRouter();

  // Mutation for API Call
  const mutation = useMutation({
    mutationFn: (data: FormValues) => axios.post(api, data),
    onSuccess: () => {
      toast('Registration Done Successfully!',
        {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
      setTimeout(() => {
        router.push('/signin');
      },1000)
      reset();
    },
    onError: (error: any) => {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue('image', base64String); // Set Base64 string to form field
        setPreviewImage(base64String);  // Show preview
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-auto bg-gradient-to-br from-indigo-500 to-green-500 py-14 px-5">
      <Toaster />
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
      <AppRegistrationIcon sx={{ fontSize: 25, color: 'green', mx: 'auto', display: 'flex', justifyContent: 'center', mb: 1 }} />
        <h2 className="mb-6 text-2xl font-bold text-center text-green-600">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-4">
          <FormInput
            label="Name"
            type="text"
            id="name"
            placeholder="Enter your Name"
            register={register('name', { required: 'Name is required' })}
            error={errors.name?.message}
          />
          <FormInput
            label="Date of Birth"
            type="date"
            id="dob"
            placeholder="Enter your DOB"
            register={register('dob', { required: 'DOB is required' })}
            error={errors.dob?.message}
          />
          </div>
          <FormInput
            label="Email"
            type="email"
            id="email"
            placeholder="Enter your email"
            register={register('email', { required: 'Email is required' })}
            error={errors.email?.message}
          />
          <div className="flex space-x-4">
            <FormInput
             label="Phone"
             type="text"
             id="phone"
             placeholder="Enter your Phone No."
             register={register('phone', { required: 'Phone No. is required' })}
             error={errors.phone?.message}
           />
           <FormInput
             label="Password"
             type="password"
             id="password"
             placeholder="Enter your password"
             register={register('password', { required: 'Password is required' })}
             error={errors.password?.message}
           />
         </div>
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-800">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full text-sm text-gray-900 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 w-20 h-20 rounded-full object-cover"
              />
            )}
            {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Register
          </button>
        </form>
        {mutation.error && (
          <p className="mt-4 text-sm text-red-500 text-center">
            {mutation.error?.message || 'An error occurred!'}
          </p>
        )}
         <p className="mt-10 text-sm text-center text-gray-800">
          By continuing, you are indicating that you accept our <a href="/terms" className='text-green-600'>Terms of Service</a> and <a href="/privacy" className='text-green-600'>Privacy Policy</a>.
        </p>
        <h2 className="mt-4 text-md text-center text-gray-600">
          Powered by TickList.com
        </h2>  
      </div>
    </div>
  );
};

export default Register;

