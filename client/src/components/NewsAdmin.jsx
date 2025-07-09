import { useState } from "react";

const NewsAdmin = () => {
  const [form, setForm] = useState({ title: "", content: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:"include",
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage("News successfully posted!");
        setForm({ title: "", content: "" });
      } else {
        setMessage("Failed to post news");
      }
    } catch (err) {
      setMessage("Server error",err);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center text-white">
      <div className="w-full max-w-xl p-6 bg-black/40 rounded-lg border border-purple-700/50 shadow-lg">

      <h2 className="text-2xl font-bold mb-4">Post New Club News</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 bg-gray-800 rounded border border-purple-600"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          rows={5}
          className="w-full p-2 bg-gray-800 rounded border border-purple-600"
          required
        />
        <button type="submit" className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700">
          Post News
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
    </div>
  );
};

export default NewsAdmin;
