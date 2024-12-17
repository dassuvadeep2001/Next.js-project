'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useParams } from 'next/navigation';

type User = {
  id: string;
  name: string;
  dob: string;
  email: string;
  phone: string;
  image: string;
};
const fetchUser = async (id: string | null) => {
  const { data } = await axios.get<User>(`http://localhost:1000/users/${id}`);
  return data;
};
const updateUser = async (user:any) => {
  const { data } = await axios.put<User>(`http://localhost:1000/users/${user.id}`,user);
  return data;
};

export default function UserPage() {
  let {id} = useParams();
  console.log(id);
  
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [profilePicBase64, setProfilePicBase64] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["UserDetails", id],
    queryFn: () => fetchUser(id),
  });

  
  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="text-center text-red-500">Failed to load user.</div>;
    
  const pagenavigate=() => {
    window.location.href = `/${data?.id}/todolist`;
  }
  return (
    <div className="p-10 min-h-screen bg-white text-white flex flex-col items-center">
      <p className='mt-3 mb-5 text-blue-500 font-bold text-lg md:text-2xl text-center'>'The secret Of Your Future Is Hidden In Your Daily Routine.'</p>
      <div className="p-6 mt-5 rounded-lg shadow-xl w-full max-w-xxl text-center bg-gradient-to-br from-indigo-500 to-green-500">
      <h2 className=" text-lg md:text-2xl font-bold text-white">Welcome Back, {data?.name || "User"}</h2>
      <div className="relative mt-4 w-48 h-48 mx-auto">
  {/* User Avatar */}
  <img
    src={data?.image}
    alt="User Avatar"
    className="w-full h-full rounded-full border-4 border-gray-200 object-cover"
  />
</div>
        <button
          className="mt-6 px-2 md:px-6 py-2 bg-white hover:bg-gray-100 text-indigo-500 rounded-md"
           onClick={pagenavigate}>
          <VisibilityIcon/> View Task
        </button>
        </div>
        <h2 className='text-lg md:text-2xl font-bold text-green-500 mt-5'>Contact Information</h2>

        <div className="flex flex-col gap-4 md:flex-row items-center justify-between p-4 bg-transparent mt-4 w-full md:width-xxl">
  <div className="flex-1 text-center bg-gradient-to-br from-indigo-500 to-green-500  rounded-md p-4 mx-2 w-full">
    <p className="text-lg font-bold text-gray-200">Email</p>
    <strong className="block text-white">{data?.email || "N/A"}</strong>
  </div>
  <div className="flex-1 text-center bg-gradient-to-br from-indigo-500 to-green-500  rounded-md p-4 mx-2 w-full">
    <p className="text-lg font-bold text-gray-200">Date of Birth</p>
    <strong className="block text-white">{data?.dob || "N/A"}</strong>
  </div>
  <div className="flex-1 text-center bg-gradient-to-br from-indigo-500 to-green-500 rounded-md p-4 mx-2 w-full">
    <p className="text-lg font-bold text-gray-200">Phone</p>
    <strong className="block text-white">{data?.phone || "N/A"}</strong>
  </div>
</div>
</div>
  );
}