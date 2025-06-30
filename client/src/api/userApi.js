//API utility function 

const BASE_URL="http://localhost:3000/api/users"; // Adjust if backend is hosted elsewhere
const XP_URL = 'http://localhost:3000/api/xp';


//profile
export const fetchUserById= async(id)=>{
    try{
        const response= await fetch(`${BASE_URL}/${id}`);//proxy handles this
        if(!response.ok){
            throw new Error("Failed to fetch user");
        }
        const data= await response.json();//convert reponse body form JSON text->JS obj
        return data;
    }catch(error){
        console.error("Error fetching users:",error);
        throw error;
    }
};

export const updateUserProfile = async (id, data) => {
    try{
        const response= await fetch(`${BASE_URL}/${id}`,{
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if(!response.ok){
            throw new Error("Failed to update user");
        }
        return await response.json();
    }catch(err){
        console.error("Error updating user:",err);
        throw err;
    }
};



export const fetchAllUsers=async()=>{
    try{
        const response = await fetch(BASE_URL);
        if(!response.ok){
            throw new Error("Failed to fetch users");
        }
        return await response.json();
    }catch(error){
        console.error("Error fetching users:",error);
        throw error;
    }
};


//XP
export const fetchUserXP= async(id)=>{
    const response = await fetch(`${XP_URL}/${id}`);
    if(!response.ok) throw new Error("Failed to fetch XP");
    return await response.json();
}

export async function updateUserXP(userId, xpGained){
    try{
        const response = await fetch(`${XP_URL}/${userId}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({xpGained}),
        });
        if(!response.ok){
            throw new Error('Failed to update XP');
        }
        return await response.json();//read and parse into js obj
    }catch(error){
        console.error('Error updating XP:', error);
    }
};

//LEADERBOARD
export const fetchLeaderboard = async ()=>{
    try{
        const res= await fetch("http://localhost:3000/api/xp/leaderboard");
        if(!res.ok){
            throw new Error("Failed to fetch Leaderboard");
        }
        return await res.json();
    }catch(err){
        console.error("Error fetching leaderboard",err);
        return [];
    }
};

