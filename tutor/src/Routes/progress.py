from fastapi import FastAPI,Depends,Form,File,UploadFile,HTTPException,APIRouter
import models
from database import engine,SessionLocal, SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas.videoprogress import VideoProgressRequest
import models


app = FastAPI()
router = APIRouter(tags=["video_progress"])

@router.post("/save-progress")
def save_progress(progress: VideoProgressRequest, db: Session = Depends(get_db)):

    existing = db.query(models.VideoProgress).filter(
        models.VideoProgress.user_id == progress.user_id,
        models.VideoProgress.course_id == progress.course_id
    ).first()

    if existing:
        existing.last_position = progress.last_position
    else:
        new_progress = models.VideoProgress(
            user_id=progress.user_id,
            course_id=progress.course_id,
            last_position=progress.last_position
        )
        db.add(new_progress)

    db.commit()

    return {"message": "Progress saved successfully"}

@router.get("/get-progress/{user_id}/{course_id}")
def get_progress(user_id: int, course_id: int, db: Session = Depends(get_db)):

    progress = db.query(models.VideoProgress).filter(
        models.VideoProgress.user_id == user_id,
        models.VideoProgress.course_id == course_id
    ).first()

    if progress:
        return {"last_position": progress.last_position}

    return {"last_position": 0}


app.include_router(router)
