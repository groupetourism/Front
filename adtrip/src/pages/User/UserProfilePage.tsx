import React from "react";
import UserProfile from "../../components/Profile/Profile"; // Import the UserProfile component
import NavBar from "../../components/NavBar/NavBar"; // Import the NavBar component

const UserProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <NavBar /> {/* Replace the placeholder navigation bar with the NavBar component */}

      {/* Main Content Area */}
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <UserProfile /> {/* Render the UserProfile component here */}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;