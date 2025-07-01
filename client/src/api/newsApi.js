

export const fetchAllNews=async()=>{
    const res=await fetch("http://localhost:3000/api/news");
    if(!res.ok){
        throw new Error("Failed to fetch news");
    }
    return await res.json();
};

export const postNews=async(newsItem)=>{
    const res=await fetch("http://localhost:3000/api/news",{
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(newsItem),
    })
    if(!res.ok){
        throw new Error("Failed to post news");
    }
    return await res.json();
};