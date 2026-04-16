from fastapi import FastAPI,Depends,Form,HTTPException,APIRouter,Header,Cookie,Response
import models
from database import engine,SessionLocal
from sqlalchemy.orm import Session
from routes import blog
from auth.auth import hash_password, verify_password, create_access_token, decode_access_token
from database import get_db
from auth.dependencies import verify_token
from fastapi.responses import JSONResponse

router=APIRouter(tags=["Users"])
        
@router.post("/stud_registration")
def stud_registration(
    fullname: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),  # already SHA256 from frontend
    db: Session = Depends(get_db)
):
    user = db.query(models.Users).filter(models.Users.email == email).first()
    if user:
        raise HTTPException(400, "Email already exists")

    hashed_pwd = hash_password(password)

    new_user = models.Users(
        fullname=fullname,
        email=email,
        password=hashed_pwd
    )

    db.add(new_user)
    db.commit()

    return {"message": "User registered"}


@router.get("/users_display")
def users_display(
    # payload: dict = Depends(verify_token),  
    db: Session = Depends(get_db)
):
    data = db.query(models.Users).all()
    return data



@router.post("/login")
def login(
    response: Response,
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    user = db.query(models.Users).filter(models.Users.email == email).first()

    if not user:
        raise HTTPException(400, "User not found")

    if not verify_password(password, user.password):
        raise HTTPException(400, "Invalid password")

    token = create_access_token({"user_id": user.user_id})

    response = JSONResponse(content={"message": "Login success"})

    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=False
    )

    return response

@router.get("/total_users")
def total_users(db: Session = Depends(get_db)):
    count = db.query(models.Users).count()
    return {"total_users": count}


@router.get("/me")
def get_me(
    token: str = Cookie(None),
    db: Session = Depends(get_db)
):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(401, "Invalid token")
    
    print("TOKEN:", token)
    user = db.query(models.Users).filter(
        models.Users.user_id == payload["user_id"]
    ).first()

    if not user:
        raise HTTPException(404, "User not found")

    return {
        "user_id": user.user_id,
        "fullname": user.fullname,
        "email": user.email
    }


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("token")  # ✅ removes cookie
    return {"message": "Logged out successfully"}