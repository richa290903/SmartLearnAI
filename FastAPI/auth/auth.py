from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
import os
from dotenv import load_dotenv
from fastapi import HTTPException
from sqlalchemy.orm import Session
# from app import models
import models
# from app.auth.jwt_handler import decode_access_token
import hashlib

load_dotenv()  
SECRET_KEY = os.getenv("SECRET_KEY") # from .env
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 43200

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")   

def hash_password(password: str):
    return pwd_context.hash(password[:72])


# def hash_sha256(password: str):
#     return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password[:72], hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None
    

def get_current_user(token: str, db: Session):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(models.Users).filter(
        models.Users.user_id == payload["user_id"]
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user




