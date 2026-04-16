from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
import os, shutil
from database import get_db
import models
import uuid


router = APIRouter(prefix="/module",tags=["Module"])

MODULE_VIDEO_DIR = r"Z:\ModuleVideos"
MODULE_THUMB_DIR = r"Z:\ModuleThumbnail"

os.makedirs(MODULE_VIDEO_DIR, exist_ok=True)
os.makedirs(MODULE_THUMB_DIR, exist_ok=True)


@router.post("/upload")
def create_module(
    course_id: int = Form(...),
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




# @router.post("/add")
# def add_module(
#     course_id: int = Form(...),
#     title: str = Form(...),
#     description: str = Form(...),
#     video: UploadFile = File(...),
#     thumbnail: UploadFile = File(...),
#     db: Session = Depends(get_db)
# ):

#     # Save thumbnail
#     thumb_name = f"{uuid.uuid4()}.{thumbnail.filename.split('.')[-1]}"
#     thumb_path = os.path.join(MODULE_THUMB_DIR, thumb_name)
#     with open(thumb_path, "wb") as buffer:
#         shutil.copyfileobj(thumbnail.file, buffer)

#     # Save video
#     video_name = f"{uuid.uuid4()}.{video.filename.split('.')[-1]}"
#     video_path = os.path.join(MODULE_VIDEO_DIR, video_name)
#     with open(video_path, "wb") as buffer:
#         shutil.copyfileobj(video.file, buffer)

#     module = models.Module(
#         course_id=course_id,
#         title=title,
#         description=description,
#         video_url=f"/ModuleVideos/{video_name}",
#         thumbnail_url=f"/ModuleThumbnail/{thumb_name}"
#     )
#     db.add(module)
#     db.commit()
#     db.refresh(module)

#     return {"message": "Module added successfully", "module": module}