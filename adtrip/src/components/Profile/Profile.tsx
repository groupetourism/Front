import React, { useEffect, useState } from "react";
import { useUser } from "../../context/AuthContext";
import { fetchUserData } from "../../api/Auth";
import { FaUserCircle, FaEnvelope, FaPhone, FaSignOutAlt } from "react-icons/fa";

const UserProfile = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        setLoading(true);
        try {
          const { data, error } = await fetchUserData(user.id, localStorage.getItem("authToken") || "");
          console.log("Fetched user data:", data);
          if (error) {
            setError(error);
          } else {
            setUser(data); // Update user data in context
          }
        } catch (err) {
          setError("Failed to fetch user data.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user?.id, setUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setUser(null);
  };

  // Debugging: Log the user object
  console.log("User in profile component:", user);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        {/* Header with Avatar */}
        <div className="bg-orange-500 p-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4">
            <FaUserCircle className="text-orange-500 text-8xl" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            {user ? `${user.firstname} ${user.lastname}` : "Guest"}
          </h1>
        </div>

        {/* Personal Info Section */}
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-orange-500 text-2xl" />
            <div>
              <p className="text-gray-600">Email</p>
              <p className="text-black font-medium">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FaPhone className="text-orange-500 text-2xl" />
            <div>
              <p className="text-gray-600">Phone</p>
              <p className="text-black font-medium">{user?.phone}</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;