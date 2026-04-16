from fastapi import FastAPI,APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
import os, shutil
from database import get_db
import models
import uuid

app = FastAPI()


router = APIRouter(prefix="/module", tags=["Module"])
MODULE_VIDEO_DIR = r"SharedVideos/ModuleVideos"
MODULE_THUMB_DIR = r"SharedVideos/ModuleThumbnail"


os.makedirs(MODULE_VIDEO_DIR, exist_ok=True)
os.makedirs(MODULE_THUMB_DIR, exist_ok=True)


@router.post("/upload/{course_id}")
def create_module(
    course_id: int,
    title: str = Form(...),
    description: str = Form(...),
    thumbnail: UploadFile = File(None),
    video: UploadFile = File(None),
    db: Session = Depends(get_db)
):

    # Check Course Exists
    course = db.query(models.Course).filter(models.Course.course_id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # Save thumbnail
    thumb_filename = None
    if thumbnail:
        thumb_filename = thumbnail.filename
        thumb_path = os.path.join(MODULE_THUMB_DIR, thumb_filename)
        with open(thumb_path, "wb") as buffer:
            shutil.copyfileobj(thumbnail.file, buffer)

    # Save video
    video_filename = None
    if video:
        video_filename = video.filename
        video_path = os.path.join(MODULE_VIDEO_DIR, video_filename)
        with open(video_path, "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)

    module = models.Module(
        course_id=course_id,
        title=title,
        description=description,
        video=video_filename,
        thumbnail=thumb_filename
    )

    db.add(module)
    db.commit()
    db.refresh(module)

    return {"status": "success", "message": "Module created", "module_id": module.module_id}



@router.get("/get_course_module/{course_id}")
def get_modules_by_course(course_id: int, db: Session = Depends(get_db)):
    
    course = db.query(models.Course).filter(models.Course.course_id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    modules = db.query(models.Module).filter(models.Module.course_id == course_id).all()

    return {
        "status": "success",
        "course_id": course_id,
        "total_modules": len(modules),
        "modules": [
            {
                "module_id": m.module_id,
                "title": m.title,
                "description": m.description,
                "video": m.video,
                "thumbnail": m.thumbnail
            }
            for m in modules
        ]
    }
