from fastapi import FastAPI,Depends
from routes import users
import models 
from typing import Annotated
from database import engine,SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Annotated
from schemas.user import UserModel
from routes import blog,users
from fastapi.staticfiles import StaticFiles
from routes import stud_profile,course,contact,progress
import os

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(blog.router)
app.include_router(users.router)
app.include_router(stud_profile.router)
app.include_router(course.router)
app.include_router(contact.router)
app.include_router(progress.router)

#Blog Image Folder
UPLOAD_DIR=r"\\192.168.254.96\SharedVideos\BlogImages"
os.makedirs(UPLOAD_DIR,exist_ok=True)
app.mount(
    "/BlogImages", 
    StaticFiles(directory=UPLOAD_DIR), 
    name="BlogImages"
)

# Course Thumbnail Folder   
# THUMBNAIL_DIR =r"\\192.168.254.96\SharedVideos\Thumbnail"
# THUMBNAIL_DIR=r"Z:/Coursevideo"
# os.makedirs(THUMBNAIL_DIR, exist_ok=True)
# app.mount(
#     "/Thumbnail",
#     StaticFiles(directory=THUMBNAIL_DIR),
#     name="Thumbnail"
# )

# Course Video Folder
# VIDEO_DIR =r"\\192.168.254.96\SharedVideos\Coursevideo"
# VIDEO_DIR=r"Z:/Thumbnail"
# os.makedirs(VIDEO_DIR, exist_ok=True)
# app.mount(
#     "/Coursevideo",
#     StaticFiles(directory=VIDEO_DIR ),
#     name="Coursevideo"
# )
# Course Thumbnail Folder   
THUMBNAIL_DIR = r"Z:\Thumbnail"
os.makedirs(THUMBNAIL_DIR, exist_ok=True)
app.mount(
    "/Thumbnail",
    StaticFiles(directory=THUMBNAIL_DIR),
    name="Thumbnail"
)

# Course Video Folder
VIDEO_DIR = r"Z:\Coursevideo"
os.makedirs(VIDEO_DIR, exist_ok=True)
app.mount(
    "/Coursevideo",
    StaticFiles(directory=VIDEO_DIR),
    name="Coursevideo"
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