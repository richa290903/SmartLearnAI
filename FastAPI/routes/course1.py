from fastapi import FastAPI,Depends,Form,File,UploadFile,HTTPException,APIRouter
import models
from database import engine,SessionLocal, SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from schemas.course import CourseRequest
from typing import Annotated,Literal
from pydantic import Field
import shutil
from database import get_db
import os
from fastapi.staticfiles import StaticFiles

app = FastAPI()
router = APIRouter(tags=["Course"])


THUMBNAIL_DIR = "./images/Thumbnail"
os.makedirs(THUMBNAIL_DIR, exist_ok=True)


UPLOAD_DIR1="images/Coursevideo"
os.makedirs(UPLOAD_DIR1,exist_ok=True)



@router.post("/course_upload")
def course_upload(
    course_title: str = Form(...),
    category: str = Form(...),
    skill_level: str = Form(...),
    prerequisites: str = Form(...),
    description: str = Form(...),
    tag: str = Form(...),
    course_price: str = Form(...),
    thumbnail: UploadFile = File(...),
    video: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    thumb_path = os.path.join(THUMBNAIL_DIR, thumbnail.filename)

    with open(thumb_path, "wb") as buffer:
        shutil.copyfileobj(thumbnail.file, buffer)

    video_path = os.path.join(UPLOAD_DIR1, video.filename)

    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(video.file, buffer)

    db_course = models.Course(
        course_title=course_title,
        category=category,
        skill_level=skill_level,
        prerequisites=prerequisites,
        description=description,
        tag=tag,
        course_price=course_price,
        thumbnail=thumbnail.filename,
        video=video.filename
    )

    db.add(db_course)
    db.commit()
    db.refresh(db_course)

    return {
        "message": "Course uploaded successfully",
        "course_id": db_course.course_id
    }

@router.get("/course_display")
async def display(db:Session=Depends(get_db)):
    data=db.query(models.Course).order_by(models.Course.course_id.asc()).all()
    return data



@router.get("/single_video_data/{course_id}")
def single_data(course_id: int, db: Session = Depends(get_db)):
    result = db.query(models.Course).filter(models.Course.course_id == course_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Course not found")

    # Local URLs
    video_url = f"http://localhost:8000/Coursevideo/{result.video}" if not result.video.startswith("http") else result.video
    thumbnail_url = f"http://localhost:8000/Thumbnail/{result.thumbnail}" if not result.thumbnail.startswith("http") else result.thumbnail

    return {
        "course_id": result.course_id,
        "course_title": result.course_title,
        "category": result.category,
        "skill_level": result.skill_level,
        "prerequisites": result.prerequisites,
        "description": result.description,
        "tag": result.tag,
        "course_price": result.course_price,
        "video_url": video_url,
        "thumbnail_url": thumbnail_url
    }


@router.delete("/course/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.course_id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # Delete files locally
    try:
        if course.video:
            video_path = os.path.join(UPLOAD_DIR1, course.video)
            if os.path.exists(video_path):
                os.remove(video_path)
        if course.thumbnail:
            thumb_path = os.path.join(THUMBNAIL_DIR, course.thumbnail)
            if os.path.exists(thumb_path):
                os.remove(thumb_path)
    except Exception as e:
        print("File deletion error:", e)

    db.delete(course)
    db.commit()

    return {"status": "success", "message": "Course + files deleted successfully"}