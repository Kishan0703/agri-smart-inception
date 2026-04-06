from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import json
import base64

try:
    # Preferred SDK import path for google-genai package.
    from google import genai
    _GENAI_MODE = "new"
except ImportError:
    # Fallback for environments that only have google-generativeai installed.
    import google.generativeai as genai
    _GENAI_MODE = "legacy"

# Load ENV
load_dotenv(override=True)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Gemini Client
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("❌ GEMINI_API_KEY missing in .env")

if _GENAI_MODE == "new":
    client = genai.Client(api_key=API_KEY)
else:
    genai.configure(api_key=API_KEY)
    client = genai.GenerativeModel("gemini-2.5-flash")


def gemini_generate_text(contents) -> str:
    if _GENAI_MODE == "new":
        result = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=contents,
        )
        return (result.text or "").strip()

    result = client.generate_content(contents)
    return (getattr(result, "text", "") or "").strip()


# -------------------------------------------------------------------
# Middleware
# -------------------------------------------------------------------

@app.middleware("http")
async def body_size_patch(request: Request, call_next):
    request._receive = request._receive
    return await call_next(request)


# -------------------------------------------------------------------
# DATA MODELS
# -------------------------------------------------------------------

class ChatRequest(BaseModel):
    message: str
    language: str = "English"


class BasicAdviceRequest(BaseModel):
    cropName: str
    fertilizer: str
    pesticide: str
    language: str = "English"


class SoilAdviceRequest(BaseModel):
    cropName: str
    fertilizer: str
    pesticide: str
    nitrogen: float
    phosphorus: float
    potassium: float
    ph: float
    organic_carbon: float
    language: str = "English"


# -------------------------------------------------------------------
# 1️⃣ CHATBOT
# -------------------------------------------------------------------

conversation_history = []


def local_chat_fallback(user_message: str) -> str:
    text = user_message.lower().strip()

    if any(word in text for word in ["hi", "hello", "hey"]):
        return "Hello! Share your crop, location, and issue. I can help with fertilizer, pest control, irrigation, and weather-based farming tips."

    if any(word in text for word in ["fertilizer", "urea", "npk", "dap"]):
        return (
            "For fertilizer advice, share crop name, growth stage, and soil values (N, P, K, pH). "
            "General rule: use split doses, avoid overuse of urea, and add organic matter to improve soil health."
        )

    if any(word in text for word in ["pest", "insect", "disease", "fungus", "leaf", "spot"]):
        return (
            "For pest/disease support, share crop, symptoms, and affected plant part. "
            "Start with field sanitation and correct dose spraying. Rotate active ingredients to prevent resistance."
        )

    if any(word in text for word in ["water", "irrigation", "drip", "sprinkler"]):
        return (
            "Use irrigation in early morning/evening to reduce losses. "
            "Prefer drip for water efficiency and avoid overwatering to reduce root diseases."
        )

    if any(word in text for word in ["weather", "rain", "temperature", "wind"]):
        return (
            "Check short-term forecast before spraying fertilizers or pesticides. "
            "Avoid spraying during strong wind or expected rain in the next 6-8 hours."
        )

    return (
        "I can help with crop nutrition, pest control, irrigation, and weather planning. "
        "Please share crop name, location, and your exact problem for a specific recommendation."
    )


@app.post("/api/chatbot")
async def chatbot(req: ChatRequest):

    user_message = req.message.strip()

    if not user_message:
        return {"reply": "Please enter a message."}

    conversation_history.append({"role": "user", "text": user_message})

    context = "\n".join(
        [("User" if m["role"] == "user" else "Assistant") + ": " + m["text"]
         for m in conversation_history[-6:]]
    )

    prompt = f"""
You are an agricultural assistant helping farmers.

Rules:
- Always reply in the SAME LANGUAGE as the user's question.
- If the user writes in Kannada → reply in Kannada.
- If the user writes in Hindi → reply in Hindi.
- If the user writes in English → reply in English.
- Keep answers simple and practical for farmers.

Conversation:
{context}

User: {user_message}
Assistant:
"""

    try:
        reply = gemini_generate_text(prompt)

        if not reply:
            reply = local_chat_fallback(user_message)

        conversation_history.append({"role": "assistant", "text": reply})

        return {"reply": reply}

    except Exception as e:
        print("Chatbot Error:", e)
        reply = local_chat_fallback(user_message)
        conversation_history.append({"role": "assistant", "text": reply})
        return {"reply": reply}


# -------------------------------------------------------------------
# 2️⃣ BASIC ADVICE
# -------------------------------------------------------------------

@app.post("/get-better-advice")
async def get_better_advice(req: BasicAdviceRequest):

    prompt = f"""
Suggest better fertilizer & pesticide for {req.cropName}.
Respond in {req.language}.

Inputs:
Fertilizer: {req.fertilizer}
Pesticide: {req.pesticide}

Return ONLY JSON:

{{
 "better_fertilizer": "",
 "fertilizer_reason": "",
 "better_pesticide": "",
 "pesticide_reason": ""
}}
"""

    try:
        text = gemini_generate_text(prompt).replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception as e:
        print("Advice Error:", e)

        return {
            "better_fertilizer": "N/A",
            "fertilizer_reason": "AI failed.",
            "better_pesticide": "N/A",
            "pesticide_reason": "AI failed."
        }


# -------------------------------------------------------------------
# 3️⃣ ECO & SOIL HEALTH ADVICE
# -------------------------------------------------------------------

@app.post("/get-environment-friendly-advice")
async def get_environment_friendly_advice(req: SoilAdviceRequest):

    prompt = f"""
You are an agricultural sustainability expert.
Respond in {req.language}.

Soil values:
N={req.nitrogen}
P={req.phosphorus}
K={req.potassium}
pH={req.ph}
Organic Carbon={req.organic_carbon}

Crop: {req.cropName}

Current Inputs:
Fertilizer: {req.fertilizer}
Pesticide: {req.pesticide}

Return ONLY JSON:

{{
 "environment_friendly_fertilizer": "",
 "fertilizer_reason": "",
 "environment_friendly_pesticide": "",
 "pesticide_reason": "",
 "soil_health_advice": ""
}}
"""

    try:
        text = gemini_generate_text(prompt).replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception as e:
        print("Soil Advice Error:", e)

        return {
            "environment_friendly_fertilizer": "N/A",
            "fertilizer_reason": "AI failed.",
            "environment_friendly_pesticide": "N/A",
            "pesticide_reason": "AI failed.",
            "soil_health_advice": "Try again later."
        }
# -------------------------------------------------------------------
# HEALTH CHECK ROUTE (for cron job)
# -------------------------------------------------------------------

@app.get("/api/health")
async def health_check():
    return {
        "status": "running",
        "service": "weather-crop-advisory-ai",
        "message": "Server is awake"
    }

# -------------------------------------------------------------------
# 4️⃣ LEAF DISEASE DETECTION
# -------------------------------------------------------------------

@app.post("/detect-leaf-disease")
async def detect_leaf_disease(file: UploadFile = File(...), language: str = "English"):

    image_bytes = await file.read()

    if len(image_bytes) > 6 * 1024 * 1024:
        raise HTTPException(400, "Image too large (>6MB).")

    b64_img = base64.b64encode(image_bytes).decode()

    mime = file.content_type or "image/jpeg"

    prompt = f"""
Identify the leaf disease and return ONLY JSON in {language}.

{{
 "disease_name": "",
 "severity": "",
 "cause": "",
 "chemical_treatment": "",
 "eco_friendly_solution": "",
 "prevention_tips": ""
}}
"""

    try:
        text = gemini_generate_text([
            {"text": prompt},
            {
                "inline_data": {
                    "mime_type": mime,
                    "data": b64_img
                }
            }
        ]).replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception as e:
        print("Leaf Error:", e)

        return {
            "disease_name": "N/A",
            "severity": "N/A",
            "cause": "Processing failed",
            "chemical_treatment": "N/A",
            "eco_friendly_solution": "N/A",
            "prevention_tips": "Try again later."
        }


# -------------------------------------------------------------------
# RUN SERVER
# -------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)