from pydantic import BaseModel, EmailStr
from typing import List, Optional

class EmailRecipient(BaseModel):
    name: str
    email: EmailStr

class SingleEmailRequest(BaseModel):
    name: str
    email: EmailStr
    profile_url: Optional[str] = "https://alumni.vit.edu/profile"

class BulkEmailRequest(BaseModel):
    recipients: List[EmailRecipient]
    delay_seconds: Optional[int] = 2

class EmailResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None

class BulkEmailResponse(BaseModel):
    success: bool
    message: str
    total_recipients: int
    successful: int
    failed: int
    details: Optional[dict] = None
