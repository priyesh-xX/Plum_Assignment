import React, { useEffect, useState } from "react";
import { fetchEvents, registerForEvent, createEvent, updateEvent } from "../api/eventApi"; // we'll define these
import { format } from "date-fns";

const EventsSection = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await registerForEvent(eventId);
      alert(" Registered successfully!");
    } catch (err) {
      alert(" Already registered or error occurred.");
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newEvent = {
      title: form.title.value,
      tag: form.tag.value,
      event_date: form.event_date.value,
      event_time: form.event_time.value,
      location: form.location.value,
    };

    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, newEvent);
        alert("Event updated ");
      } else {
        await createEvent(newEvent);
        alert("Event created ");
      }
      setFormOpen(false);
      setEditingEvent(null);
      loadEvents();
    } catch (err) {
      console.error("Error submitting event", err);
      alert(" Error saving event");
    }
  };

  return (
    <div className="backdrop-blur-md bg-black/50 rounded-xl p-6 border border-purple-900/50 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Upcoming Events</h2>

      {user.role === "admin" && (
        <button
          onClick={() => {
            setEditingEvent(null);
            setFormOpen(!formOpen);
          }}
          className="mb-4 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded"
        >
          {formOpen ? "Cancel" : "➕ Create New Event"}
        </button>
      )}

      {formOpen && (
        <form onSubmit={handleFormSubmit} className="space-y-4 mb-6">
          <input name="title" defaultValue={editingEvent?.title} required placeholder="Title" className="w-full p-2 bg-gray-800 text-white rounded" />
          <input name="tag" defaultValue={editingEvent?.tag} required placeholder="Tag (e.g. General, MELA)" className="w-full p-2 bg-gray-800 text-white rounded" />
          <input type="date" name="event_date" defaultValue={editingEvent?.event_date?.slice(0,10)} required className="w-full p-2 bg-gray-800 text-white rounded" />
          <input type="time" name="event_time" defaultValue={editingEvent?.event_time?.slice(0,5)} required className="w-full p-2 bg-gray-800 text-white rounded" />
          <input name="location" defaultValue={editingEvent?.location} required placeholder="Location" className="w-full p-2 bg-gray-800 text-white rounded" />
          <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
            {editingEvent ? "Update Event" : "Create Event"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-white">Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div key={event.id} className="bg-gradient-to-br from-gray-800/50 to-purple-900/50 rounded-lg p-4 border border-purple-800/30">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-800/50 text-purple-200">{event.tag}</span>
              </div>

              <div className="mt-3 space-y-1 text-sm text-gray-300">
                <div>📅 {format(new Date(event.event_date), "MMMM dd, yyyy")}</div>
                <div>⏰ {event.event_time}</div>
                <div>📍 {event.location}</div>
              </div>

              {user.role === "admin" ? (
                <button onClick={() => handleEdit(event)} className="mt-4 w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded">
                  ✏️ Edit Event
                </button>
              ) : (
                <button onClick={() => handleRegister(event.id)} className="mt-4 w-full py-2 bg-purple-700 hover:bg-purple-800 text-white rounded">
                  Register Now
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsSection;
