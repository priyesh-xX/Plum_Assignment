import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const quizHandler = async (req, res) => {
  const topic = req.query.topic;
  const allowedTopics = ["MELA", "Sports", "India", "BizTech", "General"];

  if (!topic || !allowedTopics.includes(topic)) {
    return res.status(400).json({
      message: `Invalid topic. Choose one of: ${allowedTopics.join(", ")}`,
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a quizmaster creating challenging MCQs for quizzes.",
        },
        {
          role: "user",
          content: `Generate 5 multiple-choice questions on "${topic}".
- Each question must have 4 options (A, B, C, D)
- Mark the correct answer
- Provide answers in 1-9 words
Return as JSON array like:
[
  {"question":"...","options":["...","...","...","..."],"answer":"A"}
]`,
        },
      ],
      temperature: 0.7,
    });

    const rawContent = response.choices[0].message.content;
    const jsonStart = rawContent.indexOf("[");
    const jsonEnd = rawContent.lastIndexOf("]");
    const jsonString = rawContent.slice(jsonStart, jsonEnd + 1);
    const questions = JSON.parse(jsonString);

    res.json({ questions, topic });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate quiz questions" });
  }
};
