import React, { useState } from "react";
import { deleteUserById } from "../api/userApi";

const SettingsPage = ({ user }) => {
  const [notificationPref, setNotificationPref] = useState("Email Only");
  const [theme, setTheme] = useState("Dark");
  const [language, setLanguage] = useState("English");
  const [emailUpdates, setEmailUpdates] = useState(true);

  const handleSave = () => {
    // You could POST this data to your backend here
    alert("Settings saved!");
  };

  if (!user) {
    return <div className="text-white text-center pt-20">Loading user settings...</div>;
  }

  const deleteAccount = async () => {
  if (!confirm('Are you sure you want to delete your account?')) return;

  try {
    await deleteUserById(user.id);
    // Clear local storage, redirect to login/home
    localStorage.clear();
    window.location.href = '/login';
  } catch (err) {
    console.error('Delete failed',err);
  }
};


  return (
    <div className="min-h-screen pt-24 px-4 md:px-0 text-white bg-gradient-to-br from-black via-purple-950 to-black">
      <div className="max-w-3xl mx-auto p-8 rounded-xl border border-purple-800 bg-black/60 backdrop-blur-sm shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-purple-400">Settings</h1>
        <p className="text-lg mb-6">
          Welcome, <span className="font-semibold text-purple-300">{user.username}</span>! Customize your preferences below.
        </p>

        {/* Notification Preference */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Notification Preferences</label>
          <select
            value={notificationPref}
            onChange={(e) => setNotificationPref(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-purple-700"
          >
            <option>Email Only</option>
            <option>Push Only</option>
            <option>All Notifications</option>
            <option>None</option>
          </select>
        </div>

        {/* Theme Preference */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-purple-700"
          >
            <option>Dark</option>
            <option>Light</option>
            <option>System Default</option>
          </select>
        </div>

        {/* Language */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-purple-700"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>Hindi</option>
            
          </select>
        </div>

        {/* Email Updates Toggle */}
        <div className="mb-6 flex items-center">
          <input
            id="emailUpdates"
            type="checkbox"
            checked={emailUpdates}
            onChange={() => setEmailUpdates(!emailUpdates)}
            className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="emailUpdates" className="text-sm text-gray-300">
            Receive monthly email updates
          </label>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md transition-all"
        >
          Save Changes
        </button>
      </div>

            <div className="max-w-3xl mx-auto mt-10 p-6 rounded-xl border border-red-800 bg-black/50 backdrop-blur-sm shadow-lg">
        <h2 className="text-xl font-semibold text-red-500 mb-3">Danger Zone</h2>
        <p className="text-sm text-gray-300 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
        <button
            onClick={deleteAccount}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition-all"
        >
            Delete My Account
        </button>
    </div>
    </div>
  );
};

export default SettingsPage;
