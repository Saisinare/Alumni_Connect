# AI Placement Preparation Chatbot Integration

This document explains how to run the integrated AI Placement Preparation Chatbot system.

## Overview

The system consists of:
- **Frontend**: Next.js React component (`/components/chatbot/chatbot.jsx`)
- **Backend**: FastAPI server (`/backend/chatbot_api.py`)
- **AI Service**: Cohere API for natural language processing

## Setup Instructions

### 1. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Start the Backend Server

Option A - Using the startup script:
```bash
cd backend
python start_chatbot.py
```

Option B - Direct uvicorn command:
```bash
cd backend
uvicorn chatbot_api:app --host 0.0.0.0 --port 8000 --reload
```

The backend will start at: `http://localhost:8000`

### 3. Start the Frontend (Next.js)

In a separate terminal:
```bash
# From the project root
npm run dev
# or
yarn dev
```

The frontend will start at: `http://localhost:3000`

### 4. Access the Chatbot

1. Navigate to `http://localhost:3000`
2. Login as a student
3. Go to the "AI Assistant" tab
4. Start chatting with the AI Placement Mentor!

## API Endpoints

The backend provides these endpoints:

- `POST /chat` - Send a message to the AI assistant
- `GET /suggestions` - Get topic suggestions
- `GET /categories` - Get available question categories
- `GET /sessions/{session_id}` - Get conversation history
- `DELETE /sessions/{session_id}` - Clear conversation history
- `GET /health` - Health check
- `GET /` - API information

## Features

### AI Capabilities
- **Technical Interview Prep**: DSA, System Design, Programming
- **Online Assessment Help**: Coding problems, Aptitude, Time management
- **HR & Behavioral**: Common questions, STAR method, Salary negotiation
- **Resume & Profile**: ATS-friendly formatting, LinkedIn optimization
- **Academic Guidance**: Study plans, Certifications, Project ideas
- **Company-Specific**: FAANG prep, Startup tips, Industry insights

### Frontend Features
- Real-time chat interface
- Session management
- Typing indicators
- Error handling with user-friendly messages
- Responsive design

## Configuration

### API Key
The Cohere API key is currently hardcoded in `chatbot_api.py`. For production, move it to environment variables:

```python
import os
COHERE_API_KEY = os.getenv("COHERE_API_KEY", "your-default-key")
```

### CORS Settings
The backend is configured to accept requests from:
- `http://localhost:3000`
- `http://127.0.0.1:3000`

## Troubleshooting

### Common Issues

1. **"Backend server not running" error**
   - Ensure the backend is running on port 8000
   - Check if the port is already in use

2. **CORS errors**
   - Verify the frontend is running on port 3000
   - Check CORS configuration in `chatbot_api.py`

3. **AI service errors**
   - Verify the Cohere API key is valid
   - Check internet connection
   - Monitor API rate limits

### Logs
- Backend logs appear in the terminal where you started the server
- Frontend errors appear in the browser console

## Development Notes

- The chatbot maintains conversation history per session
- Sessions are stored in memory (will reset when server restarts)
- For production, consider using a persistent database for sessions
- The AI responses are contextual based on conversation history

## File Structure

```
/backend/
├── chatbot_api.py          # Main FastAPI application
├── start_chatbot.py        # Startup script
├── requirements.txt        # Python dependencies
└── README_CHATBOT.md       # This file

/components/chatbot/
└── chatbot.jsx             # React chatbot component

/app/student/chatbot/
└── page.jsx                # Student chatbot page
```
