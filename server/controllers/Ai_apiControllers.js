const AI_call = async (query)=>{
    try{
        const response = await fetch('http://127.0.0.1:8000/groq_api',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({query})
        })
        if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json()
        return data
    }catch(err){
        console.error("Error in AI_call:", err);
        return null; 

    }
}

export {AI_call}