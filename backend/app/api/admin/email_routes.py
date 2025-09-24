from fastapi import APIRouter, File, UploadFile, HTTPException
from typing import List
import csv
import io

from app.core.email_service import EmailService
from app.models.email_models import (
    SingleEmailRequest, 
    BulkEmailRequest, 
    EmailResponse, 
    BulkEmailResponse,
    EmailRecipient
)

router = APIRouter(prefix="/api/admin", tags=["Admin Email"])

# Initialize email service
email_service = EmailService()

@router.post("/send-email", response_model=EmailResponse)
async def send_single_email(request: SingleEmailRequest):
    """Send a single alumni welcome email"""
    try:
        success = email_service.send_alumni_welcome_email(
            recipient_email=request.email,
            user_name=request.name,
            profile_url=request.profile_url
        )
        
        if success:
            return EmailResponse(
                success=True,
                message=f"Email sent successfully to {request.name} ({request.email})",
                data={
                    "recipient": request.name,
                    "email": request.email,
                    "profile_url": request.profile_url
                }
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to send email")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error sending email: {str(e)}")

@router.post("/send-bulk-emails", response_model=BulkEmailResponse)
async def send_bulk_emails(request: BulkEmailRequest):
    """Send bulk emails to multiple recipients"""
    try:
        # Convert Pydantic models to dict format expected by email service
        recipients = [
            {"name": recipient.name, "email": recipient.email}
            for recipient in request.recipients
        ]
        
        results = email_service.send_bulk_emails(recipients, request.delay_seconds)
        
        return BulkEmailResponse(
            success=True,
            message="Bulk email sending completed",
            total_recipients=results["total"],
            successful=len(results["success"]),
            failed=len(results["failed"]),
            details={
                "successful_emails": results["success"],
                "failed_emails": results["failed"]
            }
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error sending bulk emails: {str(e)}")

@router.post("/upload-csv-and-send", response_model=BulkEmailResponse)
async def upload_csv_and_send_emails(
    file: UploadFile = File(...),
    delay_seconds: int = 2
):
    """Upload CSV file and send emails to all recipients"""
    try:
        # Validate file type
        if not file.filename.endswith('.csv'):
            raise HTTPException(status_code=400, detail="File must be a CSV file")
        
        # Read and parse CSV content
        content = await file.read()
        csv_content = content.decode('utf-8')
        
        recipients = email_service.parse_csv_content(csv_content)
        
        if not recipients:
            raise HTTPException(status_code=400, detail="No valid recipients found in CSV file")
        
        # Send bulk emails
        results = email_service.send_bulk_emails(recipients, delay_seconds)
        
        return BulkEmailResponse(
            success=True,
            message=f"CSV processed and emails sent to {len(recipients)} recipients",
            total_recipients=results["total"],
            successful=len(results["success"]),
            failed=len(results["failed"]),
            details={
                "successful_emails": results["success"],
                "failed_emails": results["failed"]
            }
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing CSV and sending emails: {str(e)}")

@router.post("/validate-csv", response_model=EmailResponse)
async def validate_csv_file(file: UploadFile = File(...)):
    """Validate CSV file and return recipient list without sending emails"""
    try:
        # Validate file type
        if not file.filename.endswith('.csv'):
            raise HTTPException(status_code=400, detail="File must be a CSV file")
        
        # Read and parse CSV content
        content = await file.read()
        csv_content = content.decode('utf-8')
        
        recipients = email_service.parse_csv_content(csv_content)
        
        if not recipients:
            raise HTTPException(status_code=400, detail="No valid recipients found in CSV file")
        
        return EmailResponse(
            success=True,
            message=f"CSV file validated successfully. Found {len(recipients)} valid recipients.",
            data={
                "total_recipients": len(recipients),
                "recipients": recipients[:10],  # Show first 10 recipients
                "has_more": len(recipients) > 10
            }
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error validating CSV file: {str(e)}")
