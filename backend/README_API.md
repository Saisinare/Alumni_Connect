# VIT Portal API - Admin Email Module

Clean REST API for CSV to email functionality in the admin module.

## 📁 Directory Structure

```
EmailFunctionTester/
├── app/
│   ├── __init__.py
│   ├── core/
│   │   ├── __init__.py
│   │   └── email_service.py          # Email service logic
│   ├── models/
│   │   ├── __init__.py
│   │   └── email_models.py           # Pydantic models
│   └── api/
│       ├── __init__.py
│       ├── admin/
│       │   ├── __init__.py
│       │   └── email_routes.py       # Admin email endpoints
│       ├── student/
│       │   └── __init__.py           # Student module (placeholder)
│       └── alumni/
│           └── __init__.py           # Alumni module (placeholder)
├── main_api.py                       # FastAPI app entry point
├── requirements.txt                  # Dependencies
└── README_API.md                     # This file
```

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the API:**
   ```bash
   python main_api.py
   ```

3. **Access API:**
   - API: http://localhost:8000
   - Docs: http://localhost:8000/docs

## 📡 API Endpoints

### Admin Email Endpoints (`/api/admin/`)

#### 1. Send Single Email
```http
POST /api/admin/send-email
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "profile_url": "https://alumni.vit.edu/profile/john-doe"
}
```

#### 2. Send Bulk Emails
```http
POST /api/admin/send-bulk-emails
Content-Type: application/json

{
  "recipients": [
    {"name": "John Doe", "email": "john.doe@example.com"},
    {"name": "Jane Smith", "email": "jane.smith@example.com"}
  ],
  "delay_seconds": 2
}
```

#### 3. Upload CSV and Send Emails
```http
POST /api/admin/upload-csv-and-send
Content-Type: multipart/form-data

file: [CSV file]
delay_seconds: 2
```

#### 4. Validate CSV File
```http
POST /api/admin/validate-csv
Content-Type: multipart/form-data

file: [CSV file]
```

## 📄 CSV Format

```csv
name,email
John Doe,john.doe@example.com
Jane Smith,jane.smith@example.com
```

## 🔧 Usage Examples

### Using curl:

```bash
# Send single email
curl -X POST "http://localhost:8000/api/admin/send-email" \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'

# Upload CSV and send emails
curl -X POST "http://localhost:8000/api/admin/upload-csv-and-send" \
  -F "file=@recipients.csv" \
  -F "delay_seconds=2"

# Validate CSV
curl -X POST "http://localhost:8000/api/admin/validate-csv" \
  -F "file=@recipients.csv"
```

### Using Python requests:

```python
import requests

# Send single email
response = requests.post("http://localhost:8000/api/admin/send-email", 
                        json={"name": "John Doe", "email": "john@example.com"})

# Upload CSV and send
with open("recipients.csv", "rb") as f:
    response = requests.post("http://localhost:8000/api/admin/upload-csv-and-send",
                           files={"file": f},
                           data={"delay_seconds": 2})
```

## 📊 Response Format

### Success Response:
```json
{
  "success": true,
  "message": "Email sent successfully",
  "data": {
    "recipient": "John Doe",
    "email": "john@example.com"
  }
}
```

### Bulk Email Response:
```json
{
  "success": true,
  "message": "Bulk email sending completed",
  "total_recipients": 2,
  "successful": 2,
  "failed": 0,
  "details": {
    "successful_emails": [...],
    "failed_emails": []
  }
}
```

### Error Response:
```json
{
  "detail": "Error message here"
}
```

## 🏗️ Integration

This API is designed to be part of a larger application with three modules:
- **Student** (`/api/student/`)
- **Alumni** (`/api/alumni/`)  
- **Admin** (`/api/admin/`)

Only the admin email functionality is implemented. Other modules can be added as needed.

## 🔧 Configuration

Update email credentials in `app/core/email_service.py`:
```python
self.sender_email = "your_email@gmail.com"
self.sender_password = "your_app_password"
```
