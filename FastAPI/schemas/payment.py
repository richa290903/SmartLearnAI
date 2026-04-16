from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PaymentBase(BaseModel):
    user_id: int
    course_id: int
    amount: float
    currency: str = "INR"

class PaymentCreate(PaymentBase):
    razorpay_order_id: str

class PaymentUpdate(BaseModel):
    razorpay_payment_id: Optional[str] = None
    razorpay_signature: Optional[str] = None
    status: Optional[str] = None

class PaymentResponse(BaseModel):
    payment_id: int
    user_id: int
    course_id: int
    amount: float
    currency: str
    status: str
    razorpay_order_id: str
    razorpay_payment_id: Optional[str]
    razorpay_signature: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True

# class OrderRequest(BaseModel):
#     amount:int

# class VerifyPayment(BaseModel):
#     razorpay_order_id: str
#     razorpay_payment_id: str
#     razorpay_signature: str