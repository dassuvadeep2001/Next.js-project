'use client';

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useParams } from 'next/navigation';

const fetchUser = async (id) => {
  const { data } = await axios.get(`http://localhost:1000/users/${id}`);
  return data;
};

const updateUser = async (user) => {
  const { data } = await axios.put(`http://localhost:1000/users/${user.id}`, user);
  return data;
};

export default function UserPage() {
  let { id } = useParams();
  console.log(id);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['UserDetails', id],
    queryFn: () => fetchUser(id),
    onSuccess: (data) => setEditFormData(data), // Initialize editFormData with fetched data
  });

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['UserDetails', id]);
      setDrawerOpen(false);
    },
  });

  const handleInputChange = (e) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editFormData) {
      mutation.mutate(editFormData);
    }
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="text-center text-red-500">Failed to load user.</div>;

  const pagenavigate = () => {
    window.location.href = `/${data?.id}/todolist`;
  };

  return (
    <div className="p-10 min-h-screen bg-white text-white flex flex-col items-center">
      <p className="mt-3 mb-5 text-blue-500 font-bold text-lg md:text-2xl text-center">
        'The secret Of Your Future Is Hidden In Your Daily Routine.'
      </p>
      <div className="p-6 mt-5 rounded-lg shadow-xl w-full max-w-xxl text-center bg-gradient-to-br from-indigo-500 to-green-500">
        <h2 className="text-lg md:text-2xl font-bold text-white">
          Welcome Back, {data?.name || 'User'}
        </h2>
        <div className="relative mt-4 w-48 h-48 mx-auto">
          {/* User Avatar */}
          <img
            src={data?.image}
            alt="User Avatar"
            className="w-full h-full rounded-full border-4 border-gray-200 object-cover"
          />
          {/* Edit Icon */}
          <div
            className="absolute top-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer"
            onClick={() => {
              setEditFormData(data); // Set editFormData when opening the drawer
              setDrawerOpen(true);
            }}
          >
            <EditRoundedIcon className="text-indigo-500" />
          </div>
        </div>
        <button
          className="mt-6 px-2 md:px-6 py-2 bg-white hover:bg-gray-100 text-indigo-500 rounded-md"
          onClick={pagenavigate}
        >
          <VisibilityIcon /> View Task
        </button>
      </div>
      <h2 className="text-lg md:text-2xl font-bold text-green-500 mt-5">Contact Information</h2>

      <div className="flex flex-col gap-4 md:flex-row items-center justify-between p-4 bg-transparent mt-4 w-full md:width-xxl">
        <div className="flex-1 text-center bg-gradient-to-br from-indigo-500 to-green-500 rounded-md p-4 mx-2 w-full">
          <p className="text-lg font-bold text-gray-200">Email</p>
          <strong className="block text-white">{data?.email || 'N/A'}</strong>
        </div>
        <div className="flex-1 text-center bg-gradient-to-br from-indigo-500 to-green-500 rounded-md p-4 mx-2 w-full">
          <p className="text-lg font-bold text-gray-200">Date of Birth</p>
          <strong className="block text-white">{data?.dob || 'N/A'}</strong>
        </div>
        <div className="flex-1 text-center bg-gradient-to-br from-indigo-500 to-green-500 rounded-md p-4 mx-2 w-full">
          <p className="text-lg font-bold text-gray-200">Phone</p>
          <strong className="block text-white">{data?.phone || 'N/A'}</strong>
        </div>
      </div>

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl shadow-indigo-700 p-6 z-50">
          <h2 className="text-lg font-bold text-indigo-500 mb-4 text-center">Edit Profile</h2>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
            {/* User Image */}
            <div className="flex justify-center">
              <img
                src={editFormData?.image || ''}
                alt="User Avatar"
                className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
              />
            </div>
            <label className="text-gray-700 font-bold">Profile Picture</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64String = reader.result;
                    setEditFormData((prev) => ({ ...prev, image: base64String }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="p-2 border rounded text-gray-700"
            />
            <label className="text-gray-700 font-bold">Name</label>
            <input
              type="text"
              name="name"
              value={editFormData?.name || ''}
              onChange={handleInputChange}
              placeholder="Name"
              className="p-2 border rounded text-gray-700"
            />
            <label className="text-gray-700 font-bold">Email</label>
            <input
              type="email"
              name="email"
              value={editFormData?.email || ''}
              onChange={handleInputChange}
              placeholder="Email"
              className="p-2 border rounded text-gray-700"
            />
            <label className="text-gray-700 font-bold">Date of Birth</label>
            <input
              type="text"
              name="dob"
              value={editFormData?.dob || ''}
              onChange={handleInputChange}
              placeholder="Date of Birth"
              className="p-2 border rounded text-gray-700"
            />
            <label className="text-gray-700 font-bold">Phone</label>
            <input
              type="text"
              name="phone"
              value={editFormData?.phone || ''}
              onChange={handleInputChange}
              placeholder="Phone"
              className="p-2 border rounded text-gray-700"
            />
            <label className="text-gray-700 font-bold">Password</label>
            <input
              type="text"
              name="password"
              value={editFormData?.password || ''}
              onChange={handleInputChange}
              placeholder="Password"
              className="p-2 border rounded text-gray-700"
            />
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
            >
              Save Changes
            </button>
          </form>
          <button
            className="mt-4 text-red-500 underline"
            onClick={() => setDrawerOpen(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}