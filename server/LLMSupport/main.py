import os
from dotenv import load_dotenv
from groq import Groq
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import json

# Load environment variables
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

app = FastAPI()

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

class Query(BaseModel):
    query: str

@app.post("/groq_api")
async def LLM_Response(payload: Query):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an API backend. Reply only with a JSON object like: "
                    "{ \"action\": \"add|update|delete\", \"name\": \"...\", \"quantity\":"
                    " ..., \"size\": \"\", \"color\": \"\", \"category\": \"\" }. "
                    "If any field like size or category is missing, set it to an empty"
                    "string: \"\". For \"update\", include both \"filter\": { field: value } and "
                    "\"updates\": { fields to change }. No explanations or extra text. JSON only."
                )
            },
            {
                "role": "user",
                "content": payload.query,
            }
        ],
        model="llama3-8b-8192",
        max_completion_tokens=50,
        response_format={"type": "json_object"}
    )
    
    content = chat_completion.choices[0].message.content
    print("Raw LLM response:", content)

    json_content = json.loads(content)
    return JSONResponse(content=json_content)

# run with uvicorn server.LLMSupport.main:app --host 0.0.0.0 --port 8000 --reload 
# and on the callings do 127.0.0.1 explicitly 
# 0.0.0.0 allows from all addresses

