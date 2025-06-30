import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById, updateUserProfile } from '../api/userApi';

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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-black/50 border border-purple-700/50 rounded-xl">
      <h2 className="text-3xl font-bold text-white mb-6">User Profile</h2>

      <div className="grid gap-4 text-white">
        <div>
          <label className="block font-semibold text-purple-400">Username:</label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="mt-1 w-full p-2 bg-gray-800 text-white rounded border border-purple-600"
            />
          ) : (
            <p>{user.username}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-purple-400">Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full p-2 bg-gray-800 text-white rounded border border-purple-600"
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>
        
        <div>
          <label className="block font-semibold text-purple-400">Password:</label>
          {isEditing ? (
            <input
              type="text"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full p-2 bg-gray-800 text-white rounded border border-purple-600"
            />
          ) : (
            <p>{user.password}</p>
          )}
        </div>

        <div>
          <span className="font-semibold text-purple-400">XP: </span>
          {user.xp}
        </div>
        <div>
          <span className="font-semibold text-purple-400">Level: </span>
          {user.level}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
