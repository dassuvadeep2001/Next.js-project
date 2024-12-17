'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import FormInput from '../../component/forminput';
import { useRouter } from 'next/navigation';
import LoginIcon from '@mui/icons-material/Login';
import baseURL, { endpoints } from '@/api';
import toast, { Toaster } from "react-hot-toast";

type LoginFormValues = {
  id: string;
  email: string;
  password: string;
};

const Login = () => {

  let api=baseURL+endpoints.user;
  console.log(api);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();

  const [loginError, setLoginError] = React.useState<string | null>(null);

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setLoginError(null);

    try {
      const response = await axios.get(api);
      const users = response.data;

      const user = users.find(
        (u: { email: string; password: string }) =>
          u.email === data.email && u.password === data.password
      );

      if (user) {
        toast.success("Login Successful!", {
          position: "top-center",
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });

        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userImage", user.image);
        localStorage.setItem("userEmail", user.email);
        setTimeout(() => {
          window.location.href = `/${user.id}`;
        }, 1000);
      } else {
        setLoginError("Invalid Email or Password")
      }
    } catch (error: any) {
      toast.error("An error occurred while logging in.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-green-500 px-5">
      <Toaster />
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
         <LoginIcon sx={{ fontSize: 25, color: 'green', mx: 'auto', display: 'flex', justifyContent: 'center', mb: 1 }} />
        <h2 className="mb-6 text-2xl font-bold text-center text-green-600">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Email"
            type="email"
            id="email"
            placeholder="Enter your email"
            register={register('email', { required: 'Email is required' })}
            error={errors.email?.message}
          />
          <FormInput
            label="Password"
            type="password"
            id="password"
            placeholder="Enter your password"
            register={register('password', { required: 'Password is required' })}
            error={errors.password?.message}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Login
          </button>
          <p className='text-sm mt-2 text-center text-gray-600'>Don't have an account? <a href="/signup" className='text-green-600'>Sign up</a></p>
        </form>
        {loginError && (
          <p className="mt-4 text-sm text-red-500 text-center">
            {loginError}
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

export default Login;
