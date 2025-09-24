# Sample usage examples for the CSV email sender

from emailSender import EmailSender, send_bulk_emails_from_csv

# Example 1: Simple usage - send bulk emails from CSV
def example_bulk_send():
    """Example of sending bulk emails from CSV file"""
    print("📧 Example: Bulk email sending from CSV")
    
    # This will read 'recipients.csv' and send emails to all recipients
    results = send_bulk_emails_from_csv("recipients.csv", delay_seconds=3)
    
    print(f"✅ Sent {len(results['success'])} emails successfully")
    print(f"❌ Failed to send {len(results['failed'])} emails")

# Example 2: Advanced usage with custom settings
def example_advanced_usage():
    """Example of advanced usage with custom settings"""
    print("🔧 Example: Advanced usage")
    
    # Create email sender instance
    sender = EmailSender()
    
    # Create a sample CSV file
    sender.create_sample_csv("my_recipients.csv")
    
    # Read and preview recipients
    recipients = sender.read_csv_file("my_recipients.csv")
    print(f"📋 Found {len(recipients)} recipients")
    
    # Send bulk emails with custom delay
    results = sender.send_bulk_alumni_emails("my_recipients.csv", delay_seconds=1)
    
    return results

# Example 3: Single email sending
def example_single_email():
    """Example of sending a single email"""
    print("📧 Example: Single email")
    
    sender = EmailSender()
    
    # Send welcome email to specific person
    success = sender.send_alumni_welcome_email(
        user_name="John Doe",
        profile_url="https://alumni.vit.edu/profile/john-doe"
    )
    
    if success:
        print("✅ Email sent successfully!")
    else:
        print("❌ Failed to send email!")

if __name__ == "__main__":
    print("🚀 Email Sender Usage Examples")
    print("=" * 40)
    
    # Run examples (uncomment the ones you want to test)
    
    # example_single_email()
    # example_advanced_usage()
    # example_bulk_send()
    
    print("💡 Edit this file to test different examples!")
