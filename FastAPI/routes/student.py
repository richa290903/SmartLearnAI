from fastapi import FastAPI,Depends,Form,HTTPException,APIRouter
import models
from typing import Annotated
from database import engine,SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Annotated
from schemas.student import StudentModel
from auth import hash_password,verify_password
from fastapi.middleware.cors import CORSMiddleware
from routes import blog
from fastapi.staticfiles import StaticFiles
import shutil,os

router=APIRouter(tags=["Student"])

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
# with hashed
@router.post("/stud_registration")
def register_user( 
      fullname: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):


    # Check email exists
    existing_user = db.query(models.Student).filter(models.Student.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    #  HASH PASSWORD
    hashed_pwd = hash_password(password)

    # Save user
    new_user = models.Student(
        fullname=fullname,
        email=email,
        password=hashed_pwd
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Registration successful"}


# without hashed
# @router.post("/stud_registration")
# def stud_registration(
#     fullname: str = Form(...),
#     email: str = Form(...),
#     password: str = Form(...),
#     db: Session = Depends(get_db)
# ):
#     # check email
#     user = db.query(models.Student).filter(models.Student.email == email).first()
#     if user:
#         raise HTTPException(status_code=400, detail="Email already registered")

#     new_user = models.Student(
#         fullname=fullname,
#         email=email,
#         password=password  
#     )

#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)

#     return {"message": "Registration successful"}



@router.get("/student_display")
def student_display(db:Session=Depends(get_db)):
      data = db.query(models.Student).order_by(models.Student.stud_id.asc()).all()
      return data


# without hashed
# @router.post("/login")
# def login(
#     email: str = Form(...),
#     password: str = Form(...),
#     db: Session = Depends(get_db)
# ):
#     stud = db.query(models.Student).filter(models.Student.email == email).first()

#     if not stud:
#         raise HTTPException(status_code=404, detail="Email not registered")

#     if stud.password != password:
#         raise HTTPException(status_code=401, detail="Incorrect password")

#     return {
#         "message": "Login successful",
#         "user": {
#             "id": stud.stud_id,
#             "fullname": stud.fullname,
#             "email": stud.email
#         }
#     }



# with hashed
@router.post("/login")
def login_user(
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db),
):

    stud = db.query(models.Student).filter(models.Student.email == email).first()

    if not stud:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # VERIFY PASSWORD
    if not verify_password(password, stud.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    token = create_access_token({
        "stud_id":stud.stud_id
    })

    return {
        "message": "Login successful",
        # "user": {
        #     "id": stud.stud_id,
        #     "fullname": stud.fullname,
        #     "email": stud.email
        #  }
        "access_token":token,
        "token_type":"bearer"
    }