import {pool} from "../db/db.js";

//CRUD for evenets

export const getUpcomingEvents = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM events WHERE event_date >= CURRENT_DATE ORDER BY event_date ASC"
    );
    res.status(200).json(rows);//send data to front end
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const createEvent = async (req, res) => {
  const { title, tag, event_date, event_time, location } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO events (title, tag, event_date, event_time, location)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, tag, event_date, event_time, location]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, tag, event_date, event_time, location } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE events SET title = $1, tag = $2, event_date = $3, event_time = $4, location = $5
       WHERE id = $6 RETURNING *`,
      [title, tag, event_date, event_time, location, id]
    );
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const registerForEvent=async(req,res)=>{
    try{
        const userId=req.user.id;//from auth middleware
        const {eventId}=req.body;

        if(!eventId){
            return res.status(400).json({error:"Event Id is required"});
        }
        const result=await pool.query(
            `INSERT INTO event_registrations(user_id,event_id)
            VALUES($1,$2)
            ON CONFLICT (user_id,event_id) DO NOTHING
            RETURNING *`,
            [userId,eventId]
        );
        if(result.rows.length===0){
            return res.status(200).json({ message: "Already registered" });
        }
        res.status(201).json({ message: "Registered successfully", registration: result.rows[0] });
    }catch(err){
         console.error("Registration error:", err);
        res.status(500).json({ error: "Server error" });
    }
};