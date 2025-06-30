const API_BASE = 'http://localhost:3000/api/practice';

export const fetchPracticeQuizzesByTopic=async(topic)=>{
    try{
        const response= await fetch(`${API_BASE}?topic=${topic}`);
        if(!response.ok){
            throw new Error("Failed to fetch quizzes");
        }
        return await response.json();
    }catch(err){
        console.error("Error fetching practice quizzes",err);
        return [];
    }
};