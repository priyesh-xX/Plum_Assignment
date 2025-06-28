import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getChallengeQuestions = async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a quizmaster who creates tough, narrative-style quiz questions for quizzing competitions.',
        },
        {
          role: 'user',
          content: `Generate 10 descriptive general knowledge questions with this style:
- Each question should be at least 3 lines long
- Frame the question like a story, historical moment, or real-life scenario
- Include real references (sports, history, science, politics, culture,literature, etc.)
- End each question with a curiosity-prompt like "Where have you seen this?" or "What does this refer to?"
- Do NOT use multiple-choice format
- Each answer must be between 1 and 9 words

Return a JSON array like this:
[
  {
    "question": "Narrative-style question here...",
    "answer": "Short answer (1-9 words)"
  }
]`,
        },
      ],
      temperature: 0.7,
    });

    const rawContent = response.choices[0].message.content;
    console.log("GPT raw response:", rawContent);

    let questions = [];

    try {
      const jsonStart = rawContent.indexOf("[");
      const jsonEnd = rawContent.lastIndexOf("]");
      const jsonString = rawContent.slice(jsonStart, jsonEnd + 1);
      questions = JSON.parse(jsonString);
    } catch (parseErr) {
      console.error("Error parsing GPT output:", parseErr.message);
      return res
        .status(500)
        .json({ success: false, error: "Invalid GPT response format." });
    }

    res.status(200).json({ success: true, questions });
  } catch (error) {
    const status = error?.status || error?.response?.status;

    // Explicit 429 handler
    if (status === 429) {
      console.warn("Rate limit hit. Try again later.");
      return res.status(429).json({
        success: false,
        error: "Rate limit exceeded. Please wait a moment and try again.",
      });
    }

    // Other errors
    console.error("GPT error:", error.response?.data || error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to generate questions." });
  }
};
