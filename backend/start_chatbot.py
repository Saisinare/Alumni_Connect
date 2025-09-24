#!/usr/bin/env python3
"""
Startup script for the Placement Preparation AI Assistant API
"""
import uvicorn
import sys
import os

def main():
    print("🎓 Starting Placement Preparation AI Assistant API...")
    print("🚀 Server will start at http://localhost:8000")
    print("📚 API documentation: http://localhost:8000/docs")
    print("🔄 CORS enabled for frontend at http://localhost:3001")
    print("\n" + "="*50)
    
    try:
        uvicorn.run(
            "chatbot_api:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
