import React from "react";
import UserProfile from "../../components/Profile/Profile"; // Import the UserProfile component
import { FaHome, FaUser, FaCog, FaBell } from "react-icons/fa"; // Icons for navigation

const UserProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-orange-500">MyApp</div>
        <div className="flex items-center space-x-6">
          <FaHome className="text-gray-700 text-xl cursor-pointer hover:text-orange-500" />
          <FaBell className="text-gray-700 text-xl cursor-pointer hover:text-orange-500" />
          <FaCog className="text-gray-700 text-xl cursor-pointer hover:text-orange-500" />
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
            U
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar (Optional) */}
        <aside className="bg-white w-64 p-6 shadow-lg">
          <ul className="space-y-4">
            <li className="flex items-center space-x-3 text-gray-700 hover:text-orange-500 cursor-pointer">
              <FaUser className="text-xl" />
              <span>Profile</span>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-orange-500 cursor-pointer">
              <FaCog className="text-xl" />
              <span>Settings</span>
            </li>
          </ul>
        </aside>

        {/* User Profile Section */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-black mb-8">User Profile</h1>
          <UserProfile /> {/* Render the UserProfile component here */}
        </main>
      </div>
    </div>
  );
};

export default UserProfilePage;