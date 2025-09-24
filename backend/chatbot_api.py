#!/usr/bin/env python3
"""
Placement Preparation AI Assistant - FastAPI REST API
Simple REST API for the placement chatbot functionality
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import cohere
import uvicorn
from datetime import datetime



# Pydantic models for request/response
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None



class ChatResponse(BaseModel):
    response: str
    session_id: str
    timestamp: str



class SuggestionsResponse(BaseModel):
    suggestions: List[str]



class CategoriesResponse(BaseModel):
    categories: Dict[str, List[str]]



# Placement Chatbot Class (simplified from test.py)
class PlacementChatbot:
    def __init__(self, api_key: str):
        self.client = cohere.Client(api_key)
        self.system_prompt = self._build_system_prompt()
        
    def _build_system_prompt(self) -> str:
        return """You are an expert placement preparation mentor for college students. Your role is to help students prepare for campus placements, internships, and job interviews. You specialize in:


🎯 **TECHNICAL ROUNDS:**
- Data Structures & Algorithms (DSA)
- System Design fundamentals
- Programming languages (Python, Java, C++, JavaScript)
- Database concepts (SQL, NoSQL)
- Operating Systems, Networks, OOPS
- Project discussion strategies


💻 **ONLINE ASSESSMENTS (OA):**
- Coding problem solving techniques
- Aptitude (Quantitative, Logical, Verbal)
- Time management strategies
- Company-specific OA patterns


🤝 **HR & BEHAVIORAL ROUNDS:**
- Common HR questions and STAR method responses
- "Tell me about yourself" structuring
- Behavioral interview preparation
- Salary negotiation for freshers
- Company culture fit


📄 **RESUME & PROFILE:**
- ATS-friendly resume building
- Project highlighting techniques
- Skills section optimization
- Cover letter writing
- LinkedIn profile enhancement


📚 **ACADEMICS & SKILLS:**
- Subject-wise preparation plans
- Certification recommendations
- Project ideas and implementation
- Study schedules and timelines


🏢 **COMPANY-SPECIFIC GUIDANCE:**
- FAANG preparation strategies
- Product vs Service company differences
- Startup preparation tips
- Core company requirements


Provide practical, actionable advice with examples. Be encouraging yet realistic about effort required. Structure responses with bullet points and clear sections when helpful."""


    def chat(self, user_message: str, conversation_history: List[Dict] = None, max_tokens: int = 1500) -> str:
        """Get AI response with placement context"""
        # Build conversation context
        context = ""
        if conversation_history:
            recent_messages = conversation_history[-6:]  # Last 3 exchanges
            for msg in recent_messages:
                context += f"\n{msg['role']}: {msg['message']}"
        
        # Create full prompt with context
        full_prompt = f"{self.system_prompt}\n\nConversation History:{context}\n\nStudent: {user_message}\nMentor:"
        
        try:
            response = self.client.chat(
                model="command-r-plus-08-2024",
                message=full_prompt,
                max_tokens=max_tokens,
                temperature=0.7
            )
            
            return response.text.strip()
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")


    def get_topic_suggestions(self) -> List[str]:
        """Get topic suggestions for students"""
        return [
            "📊 Create a 12-week placement preparation plan",
            "💻 Most important DSA topics for coding interviews", 
            "📄 How to build an ATS-friendly resume",
            "🎯 Prepare for system design interviews",
            "🤔 Common HR questions and how to answer them",
            "⏰ Time management strategies for online assessments",
            "🏢 Difference between FAANG and service company interviews",
            "🔧 Essential projects to include in resume",
            "📈 How to improve problem-solving skills",
            "💼 Salary negotiation tips for freshers"
        ]


    def get_categories(self) -> Dict[str, List[str]]:
        """Show available question categories"""
        return {
            "🎯 Technical Rounds": [
                "DSA preparation roadmap",
                "System design basics", 
                "Programming interview tips",
                "Project discussion strategies"
            ],
            "💻 Online Assessments": [
                "Coding problem techniques",
                "Aptitude preparation",
                "Time management tips",
                "Company-specific patterns"
            ],
            "🤝 HR & Behavioral": [
                "Common HR questions",
                "STAR method examples",
                "Behavioral interview prep",
                "Salary negotiation"
            ],
            "📄 Resume & Profile": [
                "ATS-friendly formatting",
                "Project highlighting",
                "Skills optimization",
                "LinkedIn enhancement"
            ],
            "📚 Academics & Skills": [
                "Study plan creation",
                "Certification guidance",
                "Project ideas",
                "Skill development"
            ],
            "🏢 Company Guidance": [
                "FAANG preparation",
                "Startup interview tips",
                "Company research",
                "Industry insights"
            ]
        }



# Initialize FastAPI app
app = FastAPI(
    title="Placement Preparation AI Assistant API",
    description="REST API for placement preparation chatbot",
    version="1.0.0"
)

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://127.0.0.1:3000"],  # Next.js default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Initialize chatbot
COHERE_API_KEY = "s09IHjog5OygTZncXCVf0fA0vsxVNydnwRDo4syG"
chatbot = PlacementChatbot(COHERE_API_KEY)


# In-memory storage for conversation sessions
conversation_sessions: Dict[str, List[Dict]] = {}



@app.get("/")
async def root():
    """Welcome endpoint"""
    return {
        "message": "🎓 Placement Preparation AI Assistant API",
        "description": "Your AI-powered placement preparation mentor",
        "endpoints": {
            "POST /chat": "Send a message to the AI assistant",
            "GET /suggestions": "Get topic suggestions",
            "GET /categories": "Get available question categories",
            "DELETE /sessions/{session_id}": "Clear conversation history",
            "GET /health": "Health check"
        }
    }



@app.post("/chat", response_model=ChatResponse)
async def chat_with_ai(request: ChatRequest):
    """Chat with the AI placement mentor"""
    try:
        # Generate session ID if not provided
        session_id = request.session_id or f"session_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        # Get conversation history
        history = conversation_sessions.get(session_id, [])
        
        # Get AI response
        ai_response = chatbot.chat(request.message, history)
        
        # Store conversation
        if session_id not in conversation_sessions:
            conversation_sessions[session_id] = []
        
        conversation_sessions[session_id].extend([
            {"role": "Student", "message": request.message},
            {"role": "Mentor", "message": ai_response}
        ])
        
        # Keep only last 20 messages per session
        conversation_sessions[session_id] = conversation_sessions[session_id][-20:]
        
        return ChatResponse(
            response=ai_response,
            session_id=session_id,
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@app.get("/suggestions", response_model=SuggestionsResponse)
async def get_suggestions():
    """Get topic suggestions"""
    return SuggestionsResponse(suggestions=chatbot.get_topic_suggestions())



@app.get("/categories", response_model=CategoriesResponse)
async def get_categories():
    """Get available question categories"""
    return CategoriesResponse(categories=chatbot.get_categories())



@app.get("/sessions/{session_id}")
async def get_session_history(session_id: str):
    """Get conversation history for a session"""
    history = conversation_sessions.get(session_id, [])
    return {
        "session_id": session_id,
        "message_count": len(history),
        "history": history
    }



@app.delete("/sessions/{session_id}")
async def clear_session(session_id: str):
    """Clear conversation history for a session"""
    if session_id in conversation_sessions:
        del conversation_sessions[session_id]
        return {"message": f"Session {session_id} cleared successfully"}
    else:
        raise HTTPException(status_code=404, detail="Session not found")



@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Placement Preparation AI Assistant",
        "active_sessions": len(conversation_sessions),
        "timestamp": datetime.now().isoformat()
    }



if __name__ == "__main__":
    print("🎓 Starting Placement Preparation AI Assistant API...")
    print("🚀 Server will start at http://localhost:8000")
    print("📚 API documentation: http://localhost:8000/docs")
    
    uvicorn.run(
        "chatbot_api:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
