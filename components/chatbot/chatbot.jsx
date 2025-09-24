"use client"

import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// --- Helper Components ---

// Icon for the chatbot avatar
const BotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
    </svg>
);

// Icon for the user avatar
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

// Icon for the send button
const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

// Icon for attachments
const AttachmentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.59a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
    </svg>
);

// --- Main Chat Component ---

const ChatMessage = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
        <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                    <BotIcon />
                </div>
            )}
            <div className={`px-4 py-3 rounded-xl max-w-md ${isUser ? 'bg-teal-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                <div className="text-sm leading-relaxed space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h3]:font-semibold [&_h3]:mt-2 [&_strong]:font-semibold [&_code]:bg-gray-200/70 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.text}
                    </ReactMarkdown>
                </div>
                {message.attachment && (
                    <div className="mt-2 text-xs text-gray-500 bg-gray-200 rounded p-2">
                        Attached: {message.attachment.name}
                    </div>
                )}
            </div>
             {isUser && (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <UserIcon />
                </div>
            )}
        </div>
    );
};

export default function Chatbot() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: `Hello! I'm your AI Placement Preparation Mentor. I can help with:

### What I can do
- Technical interview prep: DSA, problem-solving, complexity
- System design fundamentals and patterns
- Resume review and bullet point improvements
- HR/behavioral questions and mock answers
- Career guidance and project suggestions

Ask me anything to begin, or pick a suggestion below.`,
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Load suggestions on component mount
    useEffect(() => {
        const loadSuggestions = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/student/chatbot/suggestions');
                if (response.ok) {
                    const data = await response.json();
                    setSuggestions(data.suggestions);
                }
            } catch (error) {
                console.error('Error loading suggestions:', error);
            }
        };
        loadSuggestions();
    }, []);
    
    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAttachment(e.target.files[0]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === '' && !attachment) return;

        const userMessage = inputValue.trim();
        const newUserMessage = {
            id: messages.length + 1,
            text: userMessage,
            sender: 'user',
            attachment: attachment
        };
        
        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setAttachment(null);
        setIsTyping(true);

        try {
            // Call FastAPI backend
            const response = await fetch('http://localhost:8000/api/student/chatbot/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    session_id: sessionId
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Update session ID if it's new
            if (!sessionId) {
                setSessionId(data.session_id);
            }

            const botResponse = {
                id: messages.length + 2,
                text: data.response,
                sender: 'bot',
            };
            
            setIsTyping(false);
            setMessages(prev => [...prev, botResponse]);

        } catch (error) {
            console.error('Error calling chatbot API:', error);
            setIsTyping(false);
            
            const errorResponse = {
                id: messages.length + 2,
                text: "I'm sorry, I'm having trouble connecting to my AI service right now. Please make sure the backend server is running on port 8000 and try again.",
                sender: 'bot',
            };
            setMessages(prev => [...prev, errorResponse]);
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-white rounded-2xl shadow-lg border border-gray-200 mt-4">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-6 py-6 min-h-[80px] border-b border-gray-200 bg-white rounded-t-2xl">
                <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center">
                        <BotIcon />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-800">AI Placement Mentor</h1>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <p className="text-sm text-gray-500">Ready to help with placements</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto">
                {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                
                {/* Show suggestions after welcome message */}
                {messages.length === 1 && suggestions.length > 0 && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-3">💡 Here are some topics I can help you with:</p>
                        <div className="grid grid-cols-1 gap-2">
                            {suggestions.slice(0, 5).map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-sm text-gray-700 transition-colors duration-200"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                {isTyping && (
                     <div className="flex items-start gap-3 my-4 justify-start">
                        <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                            <BotIcon />
                        </div>
                        <div className="px-4 py-3 rounded-xl bg-gray-100 text-gray-800 rounded-bl-none">
                            <div className="flex items-center justify-center gap-1.5">
                                <span className="h-2 w-2 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-teal-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="px-6 py-6 bg-white border-t border-gray-200 rounded-b-2xl">
                {attachment && (
                    <div className="px-3 py-2 mb-2 text-sm bg-gray-100 rounded-lg flex justify-between items-center">
                        <span>{attachment.name}</span>
                        <button onClick={() => setAttachment(null)} className="text-red-500 hover:text-red-700">&times;</button>
                    </div>
                )}
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="p-3 bg-gray-100 text-white rounded-xl flex items-center justify-center hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200"
                    >
                        <AttachmentIcon />
                    </button>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask about DSA, interviews, resume tips, or career guidance..."
                        className="flex-1 w-full px-4 py-3 bg-gray-100 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                    />
                    <button
                        type="submit"
                        className="w-12 h-12 bg-teal-500 text-white rounded-xl flex items-center justify-center hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 disabled:bg-teal-300"
                        disabled={!inputValue.trim() && !attachment}
                    >
                        <SendIcon />
                    </button>
                </form>
            </div>
        </div>
    );
}
