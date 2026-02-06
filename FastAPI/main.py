from fastapi import FastAPI,Depends
import models
from typing import Annotated
from database import engine,SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Annotated
from schemas.student import StudentModel
from fastapi.middleware.cors import CORSMiddleware
from routes import blog,student
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()

app.include_router(blog.router)
app.include_router(student.router)

#Blog Image Folder
UPLOAD_DIR="blogimages"
os.makedirs(UPLOAD_DIR,exist_ok=True)
app.mount("/blogimages", StaticFiles(directory="blogimages"), name="blogimages")


origins = [
      'http://localhost:5173',
      'http://localhost:3000',
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create all database tables
models.Base.metadata.create_all(bind=engine)


# Dependency to get database session
def get_db():
      db = SessionLocal()
      try:
            yield db
      finally:
            db.close()


db_dependency = Annotated[Session,Depends(get_db)]



