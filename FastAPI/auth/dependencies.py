from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from jose import jwt, JWTError
import os
from dotenv import load_dotenv
from auth.auth import SECRET_KEY, ALGORITHM

load_dotenv()

security = HTTPBearer()
SECRET_KEY = os.getenv("SECRET_KEY")

def verify_token(credentials=Depends(security)):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")