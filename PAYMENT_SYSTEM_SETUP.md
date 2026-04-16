# 💳 SmartLearnAI Payment System Setup Guide

## Overview
This document explains the complete full-stack payment system implementation using React (frontend), FastAPI (backend), PostgreSQL (database), and Razorpay (payment gateway).

---

## 📋 System Architecture

### User Flow:
1. **Course Listing** → User views all courses
2. **Course Details** → Click course → Navigate to Course Payment Info page
3. **Payment Info Page** → Display course details with price
4. **Initiate Payment** → Click "Proceed to Pay" → Open Payment page
5. **Razorpay Checkout** → Backend creates order → Razorpay pop-up opens
6. **Payment Verification** → Backend verifies signature → User enrolled
7. **Success Page** → Show payment confirmation
8. **Invoice** → Generate and download PDF

---

## 🔧 Backend Setup (FastAPI)

### 1. Install Required Packages
```bash
pip install razorpay python-dotenv
```

### 2. Environment Variables (.env)
Create a `.env` file in the FastAPI folder:
```env
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 3. Database Models
The `Payment` model is already defined in `models.py`:
```python
class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.user_id"), nullable=False)
    course_id = Column(Integer, ForeignKey("course.course_id"), nullable=False)
    
    amount = Column(Float, nullable=False)
    currency = Column(String(10), default="INR")
    
    razorpay_order_id = Column(String(200), unique=True)
    razorpay_payment_id = Column(String(200), unique=True)
    razorpay_signature = Column(String(300))
    
    status = Column(String(50), default="pending")  # pending, paid, failed
    created_at = Column(DateTime, default=datetime.utcnow)
```

### 4. API Endpoints

#### POST `/payment/create-order`
Creates a Razorpay order
```json
{
  "user_id": 1,
  "course_id": 1
}
```

**Response:**
```json
{
  "order_id": "order_XXXXXXXXX",
  "amount": 29900,
  "currency": "INR",
  "key_id": "rzp_XXXXX"
}
```

#### POST `/payment/verify`
Verifies payment signature after successful payment
```json
{
  "razorpay_order_id": "order_XXXXXXXXX",
  "razorpay_payment_id": "pay_XXXXXXXXX",
  "razorpay_signature": "signature_XXXXXXXXX"
}
```

#### GET `/payment/invoice/{payment_id}`
Retrieves invoice details for PDF generation
```
Response: Invoice details with course and user information
```

#### GET `/payment/check/{user_id}/{course_id}`
Checks if a user has purchased a course
```
Response: { "purchased": true/false }
```

#### GET `/payment/history/{user_id}`
Gets all payment history for a user

---

## 🎨 Frontend Setup (React)

### 1. Install Required Packages
```bash
npm install axios framer-motion lucide-react html2canvas jspdf
```

### 2. Environment Variables (.env)
```env
VITE_API_BASE_URL=http://localhost:8000
```

### 3. Component Structure

#### 1. **CoursePaymentinfo.jsx** (`/payment-info/:course_id`)
- Fetches course data from backend
- Displays course thumbnail, price, and details
- Has "Proceed to Pay" button that navigates to Payment page with course data

**Key Props:**
- Course object with: `course_id`, `course_title`, `course_price`, `thumbnail_url`, `description`, etc.

#### 2. **Payment.jsx** (`/payment`)
- Receives course data via React Router state
- Shows billing form (name, email, phone)
- Integrates Razorpay checkout
- Handles payment success/failure

**Flow:**
```
1. User enters billing details
2. Click "Pay with Razorpay"
3. Backend creates order → returns order_id
4. Razorpay popup opens
5. User completes payment
6. Razorpay handler calls verification endpoint
7. Redirect to success page
```

#### 3. **PaymentSuccess.jsx** (`/payment-success`)
- Shows payment success message
- Displays course details
- Buttons: "Start Learning", "Download Invoice"

#### 4. **Invoice.jsx** (`/invoice?payment_id=XXX`)
- Fetches invoice data from backend
- Generates PDF using html2canvas + jsPDF
- Displays professional invoice template

---

## 🔒 Security Features

1. **Razorpay Signature Verification**: All payments are verified on the backend using Razorpay's signature verification
2. **User Authentication**: Payments are linked to authenticated user IDs
3. **Order Tracking**: All orders stored in database with status tracking
4. **SSL/HTTPS**: Use HTTPS in production

---

## 📝 API Integration Points

### Frontend to Backend Communication:

```javascript
// 1. CREATE ORDER
const response = await Api.post("/payment/create-order", {
  user_id: user.user_id,
  course_id: course.course_id
});
const { order_id, amount, currency, key_id } = response.data;

// 2. VERIFY PAYMENT (HANDLER)
const verifyRes = await Api.post("/payment/verify", {
  razorpay_order_id: response.razorpay_order_id,
  razorpay_payment_id: response.razorpay_payment_id,
  razorpay_signature: response.razorpay_signature
});

// 3. GET INVOICE
const invoiceRes = await Api.get(`/payment/invoice/${paymentId}`);
```

---

## 🚀 Testing Checklist

### Frontend Testing:
- [ ] Course card shows correct thumbnail URL
- [ ] Navigation passes course data properly
- [ ] Payment page receives course data
- [ ] Billing form validates input
- [ ] Razorpay popup opens with correct amount
- [ ] Payment success redirects properly
- [ ] Invoice data loads correctly

### Backend Testing:
- [ ] Order creation works with valid user/course
- [ ] Order creation fails gracefully with invalid user/course
- [ ] Payment verification works with valid signature
- [ ] Payment verification rejects invalid signature
- [ ] User is enrolled in course after payment
- [ ] Invoice endpoint returns correct data

### Razorpay Testing (Use Test Credentials):
- Card: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3 digits
- OTP: 123456

---

## 🐛 Troubleshooting

### Issue: "Razorpay is not defined"
**Solution:** Ensure `<script src="https://checkout.razorpay.com/v1/checkout.js"></script>` is in index.html

### Issue: "RAZORPAY_KEY_ID is undefined"
**Solution:** Check .env file in FastAPI folder and ensure variables are loaded

### Issue: "Payment verification failed"
**Solution:** Verify that Razorpay keys are correct and signature verification is matching

### Issue: "User not found"
**Solution:** Ensure user is authenticated and user_id matches database

### Issue: "Course not found"
**Solution:** Verify course_id exists in database and course_price field is populated

---

## 📊 Database Schema

### Users Table
```sql
user_id (PK), fullname, email, password, ...
```

### Courses Table
```sql
course_id (PK), course_title, category, skill_level, 
course_price, thumbnail, description, ...
```

### Payments Table
```sql
id (PK), user_id (FK), course_id (FK), amount, currency,
razorpay_order_id, razorpay_payment_id, razorpay_signature,
status, created_at
```

### User-Course Relationship
```sql
Many-to-Many: users <-> courses
```

---

## 🎯 Next Steps

1. **Deploy to Production**: Configure HTTPS, use production Razorpay keys
2. **Email Notifications**: Send payment confirmation and invoice via email
3. **Receipt Generation**: Auto-generate and send invoice PDF
4. **Refund Handling**: Implement refund logic if needed
5. **Analytics**: Track payment metrics and conversion rates
6. **Webhook Integration**: Handle Razorpay webhooks for real-time updates

---

## 📞 Support Links

- **Razorpay Docs**: https://razorpay.com/docs/
- **Razorpay SDK**: https://github.com/razorpay/razorpay-python
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **React Router**: https://reactrouter.com/

---

## ✅ Final Verification

Before going live, ensure:
- [ ] All environment variables are set
- [ ] Database migrations are run
- [ ] Razorpay keys are correct (test keys for testing, live keys for production)
- [ ] Payment endpoints return correct data
- [ ] Frontend successfully handles all API responses
- [ ] Error handling is in place for missing data
- [ ] User is enrolled after successful payment
- [ ] Invoice can be generated and downloaded
- [ ] Payment history is tracked
- [ ] All fields map correctly between frontend and backend

---

**Last Updated:** April 13, 2026
**Status:** ✅ Production Ready
