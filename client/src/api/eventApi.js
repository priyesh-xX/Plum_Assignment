
const BASE_URL = 'http://localhost:3000/api/events';

export const fetchEvents = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
};

// export const registerForEvent = async (eventId, userId) => {
//   const res = await fetch(`${BASE_URL}/${eventId}/register`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ userId }),
//   });
//   if (!res.ok) throw new Error('Failed to register');
//   return res.json();
// };

export const registerForEvent = async (eventId) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",        // send accessToken cookie
    body: JSON.stringify({ eventId })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to register");
  }

  return res.json();               // { message: "...", registration: {...} }
};


export async function createEvent(formData) {
  const res = await fetch(`${BASE_URL}/create`, {   // ← must match router
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",             // send cookie!
    body: JSON.stringify(formData)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Error creating event");
  }
  return res.json();                    // {message:'Event created',event:{…}}
}

export const updateEvent = async (eventId, updatedData) => {
  const res = await fetch(`${BASE_URL}/${eventId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
    credentials: 'include',  //admin auth
  });
  if (!res.ok) throw new Error('Failed to update event');
  return res.json();
};
