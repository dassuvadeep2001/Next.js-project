"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const [userId, setUserId] = useState(null);
  const [userImage, setUserImage] = useState(null);

  const router = useRouter(); 

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUserId = localStorage.getItem("userId");
    const storedUserImage = localStorage.getItem("userImage");
    
    setUserId(storedUserId);
    setUserImage(storedUserImage);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const profile = () => {
    router.push(`/${userId}`);
  }

  return (
    <nav className="bg-white text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" ><img src="https://i.ibb.co/zQ4pvCP/1.png" alt="pngwing-com" className="w-auto h-10 md:h-12"></img></Link>
          </div>
        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {userId ? (
            // Show user image if logged in
            <div className="flex items-center space-x-4">
              {userImage ? (
                <img
                onClick={profile}
                  src={userImage}
                  alt="User Avatar"
                  className="md:w-12 md:h-12 h-10 w-10 rounded-full object-cover border-2 border-green-500 cursor-pointer"
                />
              ) : (
                <span className="text-sm text-gray-300">No Image</span>
              )}
              <button onClick={handleLogout}
                className="text-sm px-3 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition h-10"
              >
                Logout <LogoutIcon />
              </button>
            </div>
          ) : (
            // Show login and register links if not logged in
            <>
              <Link
                href="/signin"
                className="px-3 py-2 font-bold text-lg text-green-600 hover:text-indigo-600 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-3 py-2 font-bold text-lg text-indigo-600 hover:text-green-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
