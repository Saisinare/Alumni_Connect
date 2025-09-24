from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.admin.email_routes import router as admin_email_router

# Create FastAPI app
app = FastAPI(
    title="VIT Portal API",
    description="API for VIT Student, Alumni and Admin Portal",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure as needed for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(admin_email_router)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "VIT Portal API",
        "version": "1.0.0",
        "modules": ["student", "alumni", "admin"],
        "admin_endpoints": {
            "send_single_email": "/api/admin/send-email",
            "send_bulk_emails": "/api/admin/send-bulk-emails", 
            "upload_csv_and_send": "/api/admin/upload-csv-and-send",
            "validate_csv": "/api/admin/validate-csv"
        },
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "VIT Portal API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
