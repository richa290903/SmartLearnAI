from fastapi import Depends,APIRouter,Form, File, UploadFile
import models
from database import engine,SessionLocal
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from schemas.instructor_profile import InstructorCreate
from database import get_db
from fastapi import Header, HTTPException
import os
from models import Instructor

router = APIRouter(tags=["Instructor Profile"])

STUDENT_DIR=r"\\192.168.41.96\SharedVideos\StudentPhotos"
os.makedirs(STUDENT_DIR,exist_ok=True)


@router.get("/instructor_display")
def instructor_display(db:Session=Depends(get_db)):
      data = db.query(models.Instructor).order_by(models.Instructor.instructor_id.asc()).all()
      return data

@router.get("/total_instructor")
def total_instructor(db: Session = Depends(get_db)):
    count = db.query(models.Instructor).count()
    return {"total_instructor": count}



@router.post("/insert_update_instructor_profile/{user_id}")
async def insert_profile(
    user_id: int,
    gender: str = Form(...),
    mobile: str = Form(...),
    qualification: str = Form(...),
    bio: str = Form(...),
    experience: int = Form(...),
    state_id: int = Form(...),
    city_id: int = Form(...),
    language: str = Form(...),
    skills: str = Form(...),
    photo: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    try:
        file_name = None

        print("DATA RECEIVED:")
        print("gender:", gender)
        print("mobile:", mobile)
        print("experience:", experience)
        print("state_id:", state_id)
        print("city_id:", city_id)
        print("language:", language)
        print("skills:", skills)

        import os

        #  FIXED FILE SAVE
        if photo:
            file_name = photo.filename
            file_location = os.path.join(STUDENT_DIR, file_name)

            print("Saving file to:", file_location)

            with open(file_location, "wb") as f:
                f.write(await photo.read())

        #  DB insert
        new_profile = Instructor(
            user_id=user_id,
            gender=gender,
            mobile=mobile,
            qualification=qualification,
            bio=bio,
            experience=experience,
            state_id=state_id,
            city_id=city_id,
            language=language,
            skills=skills,
            photo=file_name
        )

        db.add(new_profile)
        db.commit()
        db.refresh(new_profile)

        print("INSERT SUCCESS")  # debug

        return {"message": "Data inserted successfully"}

    except Exception as e:
        print("ERROR:", e)
        return {"error": str(e)}


@router.get("/get_instructor_by_user/{user_id}")
def get_instructor_by_user(user_id: int, db: Session = Depends(get_db)):

    instructor = db.query(models.Instructor).filter(
        models.Instructor.user_id == user_id
    ).first()

    if not instructor:
        return {"exists": False}

    return {
        "exists": True,
        "instructor_id": instructor.instructor_id,
        "gender": instructor.gender,
        "mobile": instructor.mobile,
        "qualification": instructor.qualification,
        "experience": instructor.experience,
        "skills": instructor.skills,
        "bio": instructor.bio,
        "language": instructor.language,
        "state_id": instructor.state_id,
        "city_id": instructor.city_id,
    }