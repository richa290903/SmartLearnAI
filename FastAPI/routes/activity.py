from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import models
from schemas.activity import ActivityCreate
from datetime import datetime

router=APIRouter(tags=["Activity"])

# TRACK ACTIVITY
@router.post("/track")
def track_activity(data: ActivityCreate, db: Session = Depends(get_db)):

    activity = models.UserCourseActivity(
        user_id=data.user_id,
        course_id=data.course_id
    )

    db.add(activity)
    db.commit()
    db.refresh(activity)

    return {
        "message": "Activity tracked successfully",
        "activity_id": activity.activity_id
    }