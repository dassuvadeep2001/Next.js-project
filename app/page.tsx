"use client";
import { useEffect, useState } from "react";

export default function Home() {

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage for userId
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  return (
<div className="min-h-screen">
  {/* banner */}
  <div
  className="relative h-60 md:h-80 bg-cover bg-center"
  style={{
    backgroundImage: `url('https://i.pinimg.com/1200x/e2/bf/d4/e2bfd433c9acb9c091edb5112d17823e.jpg')`
    }}
>
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-l from-indigo-500 to-green-500 opacity-90"></div>

  {/* Content */}
  <div className="relative z-10 text-center text-white flex flex-col justify-center items-center h-full">
    <h1 className="text-2xl md:text-4xl font-bold mb-5">Welcome to T i c k L i s t</h1>
    <p className="text-smmd:text-lg px-8 md:px-20">Every great achievement begins with a single step, and a well-organized plan is the key to unlocking your potential. Ticklist, your trusted companion in productivity, helps you record and manage your daily tasks effortlessly.</p>
  </div>
</div>

   {/* Why Choose Us Section  */}
  <div className="py-10 md:py-16 bg-gray-100 text-center">
    <h2 className="text-2xl md:text-4xl font-bold mb-8 text-indigo-800">Why Choose Us?</h2>
    <div className="flex flex-wrap justify-center gap-6">
     {/* Card 1  */}
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-sm">
        <h3 className="text-2xl font-semibold mb-4 text-green-500">Reliability</h3>
        <ul className="text-left text-gray-600 space-y-2">
          <li>✔ Trusted by thousands of users</li>
          <li>✔ Proven track record</li>
        </ul>
      </div>

       {/* Card 2 */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm">
        <h3 className="text-2xl font-semibold mb-4 text-blue-500">Efficiency</h3>
        <ul className="text-left text-gray-600 space-y-2">
          <li>✔ Save time and resources</li>
          <li>✔ Streamlined processes</li>
        </ul>
      </div>

       {/* Card 3 */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm">
        <h3 className="text-2xl font-semibold mb-4 text-green-500">Innovation</h3>
        <ul className="text-left text-gray-600 space-y-2">
          <li>✔ Cutting-edge technology</li>
          <li>✔ Creative solutions</li>
        </ul>
      </div>
    </div>
  </div>

  {/* Get Started Section  */}
  <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-16 text-center">
      {userId ? (
        // Content when userId exists in localStorage
        <>
          <h2 className="text-4xl font-bold mb-6">Thank You for Joining Us!</h2>
          <p className="text-lg mb-4">
            Here's what makes us great:
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            {/* User Statistics */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-indigo-600">1M+</h3>
              <p className="text-green-500">Active Users</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-indigo-600">4.8/5</h3>
              <p className="text-green-500">Average Rating</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-indigo-600">150+</h3>
              <p className="text-green-500">Countries</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-indigo-600">99.99%</h3>
              <p className="text-green-500">Uptime Guarantee</p>
            </div>
          </div>
          <p className="mt-8">
            Our app is available on <span className="font-bold">Google Play Store</span>.
          </p>
        </>
      ) : (
        // Content when no userId is found in localStorage
        <>
          <h2 className="text-4xl font-bold mb-6">Get Started Today!</h2>
          <p className="text-lg mb-8">Join with us and unlock your potential.</p>
          <a
            href="/signin"
            className="px-8 py-3 bg-white text-green-500 font-semibold rounded-lg shadow hover:bg-gray-100"
          >
            Get Started
          </a>
        </>
      )}
    </div>
</div>

  );
}
