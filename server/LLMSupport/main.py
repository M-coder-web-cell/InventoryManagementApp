import os
from dotenv import load_dotenv
from groq import Groq
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
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
                "content": "Output JSON with fields action (Add, Remove, Update only), quantity, name; optionally color, size, category. Respond only with JSON, no extra text."
                #this prompt is 35 tokens for general GPTs
            },
            {
                "role": "user",
                "content": payload.query,
            }
        ],
        model="llama3-8b-8192",  
        max_completion_tokens= 40
    )

    parsed = json.loads(chat_completion.choices[0].message.content)
    print(parsed)
    return parsed

#run with uvicorn server.LLMSupport.main:app --host 0.0.0.0 --port 8000 --reload and on the callings do 127.0.0.1 explicitly 
#0.0.0.0 allows from all addresses

