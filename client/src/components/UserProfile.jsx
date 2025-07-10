import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { fetchUserById, updateUserProfile } from '../api/userApi';

import { motion, AnimatePresence } from "framer-motion";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: "", email: "" ,password: ""});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // 👈 new state

  useEffect(() => {
    const LoadUser = async () => {
      try {
        const userData = await fetchUserById(id);
        setUser(userData);
        setForm({ username: userData.username, email: userData.email ,password: userData.password });
      } catch (err) {
        console.error("failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    };
    LoadUser();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));//username or email
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateUserProfile(id, form);
      setUser(updated);
      alert("Profile updated successfully");
      setIsEditing(false); // stop editing after save
    } catch (err) {
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Restore original data and exit edit mode
    setForm({ username: user.username, email: user.email, password: user.password });
    setIsEditing(false);
  };

  if (loading || user === null) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center text-white">
  <div className="w-full max-w-2xl p-8 bg-black/40 rounded-xl border border-purple-700/50 shadow-xl">
    <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center">
      User Profile
    </h2>

    <div className="grid gap-6">
      <div>
        <label className="block text-sm text-purple-400 font-semibold mb-1">
          Username
        </label>
        <AnimatePresence mode="wait">
  {isEditing ? (
    <motion.input
      key="edit-username"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.2 }}
      type="text"
      name="username"
      value={form.username}
      onChange={handleChange}
      className="w-full p-3 bg-gray-900 text-white rounded border border-purple-600"
    />
  ) : (
    <motion.p
      key="view-username"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.2 }}
      className="text-lg"
    >
      {user.username}
    </motion.p>
  )}
</AnimatePresence>
      </div>

      <div>
        <label className="block text-sm text-purple-400 font-semibold mb-1">
          Email
        </label>
        <AnimatePresence mode="wait">
  {isEditing ? (
    <motion.input
      key="edit-email"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.2 }}
      type="text"
      name="email"
      value={form.email}
      onChange={handleChange}
      className="w-full p-3 bg-gray-900 text-white rounded border border-purple-600"
    />
  ) : (
    <motion.p
      key="view-email"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.2 }}
      className="text-lg"
    >
      {user.email}
    </motion.p>
  )}
</AnimatePresence>
      </div>

      <div>
        <span className="text-sm text-purple-400 font-semibold">
          XP:
        </span>
        <p className="text-lg">{user.xp}</p>
      </div>

      <div>
        <span className="text-sm text-purple-400 font-semibold">
          Level:
        </span>
        <p className="text-lg">{user.level}</p>
      </div>
    </div>

    <div className="mt-8 flex justify-end gap-4">
      {isEditing ? (
        <>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium"
        >
          Edit Profile
        </button>
      )}
    </div>
  </div>
</div>

  );
};

export default UserProfile;
