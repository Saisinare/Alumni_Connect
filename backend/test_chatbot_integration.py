#!/usr/bin/env python3
"""
Test script to verify chatbot API integration
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_chatbot_endpoints():
    print("🧪 Testing Chatbot API Integration")
    print("=" * 50)
    
    # Test 1: Health check
    print("\n1. Testing health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("✅ Health check passed")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Health check error: {e}")
    
    # Test 2: Get suggestions
    print("\n2. Testing suggestions endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/api/student/chatbot/suggestions")
        if response.status_code == 200:
            data = response.json()
            print("✅ Suggestions endpoint working")
            print(f"   Found {len(data['suggestions'])} suggestions")
            print(f"   First suggestion: {data['suggestions'][0]}")
        else:
            print(f"❌ Suggestions failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Suggestions error: {e}")
    
    # Test 3: Get categories
    print("\n3. Testing categories endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/api/student/chatbot/categories")
        if response.status_code == 200:
            data = response.json()
            print("✅ Categories endpoint working")
            print(f"   Found {len(data['categories'])} categories")
            print(f"   Categories: {list(data['categories'].keys())}")
        else:
            print(f"❌ Categories failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Categories error: {e}")
    
    # Test 4: Chat endpoint
    print("\n4. Testing chat endpoint...")
    try:
        chat_data = {
            "message": "Hello, can you help me with DSA preparation?",
            "session_id": "test_session_123"
        }
        response = requests.post(
            f"{BASE_URL}/api/student/chatbot/chat",
            json=chat_data,
            headers={"Content-Type": "application/json"}
        )
        if response.status_code == 200:
            data = response.json()
            print("✅ Chat endpoint working")
            print(f"   Session ID: {data['session_id']}")
            print(f"   Response preview: {data['response'][:100]}...")
        else:
            print(f"❌ Chat failed: {response.status_code}")
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"❌ Chat error: {e}")
    
    print("\n" + "=" * 50)
    print("🏁 Test completed!")

if __name__ == "__main__":
    test_chatbot_endpoints()
