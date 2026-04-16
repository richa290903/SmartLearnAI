from fastapi import Depends,APIRouter ,UploadFile, Header,Cookie,File
import models
from database import engine,SessionLocal
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from schemas.stud_profile import StudentCreate
from auth.auth import decode_access_token
from database import get_db
import shutil
import os
import uuid

router = APIRouter(tags=["Profile"])

STUDENT_DIR = "SharedVideos/StudentPhotos"
os.makedirs(STUDENT_DIR, exist_ok=True)

@router.get("/states")
def get_states(db:Session=Depends(get_db)):
      return db.query(models.State).all()


@router.get("/cities/{state_id}")
def get_cities(state_id:int,db:Session=Depends(get_db)):
     return db.query(models.City).filter(models.City.state_id==state_id).all()

@router.get("/cities_display")
def cities_display(db:Session=Depends(get_db)):
    data = db.query(models.City).order_by(models.City.city_id.asc()).all()
    return data


@router.get('/single_profile/{stud_id}')
def single_profile(stud_id: int, db: Session = Depends(get_db)):
    stud_data = db.query(models.Student)\
        .options(joinedload(models.Student.state),
                 joinedload(models.Student.city))\
        .filter(models.Student.stud_id == stud_id)\
        .first()

    if not stud_data:
        return {"error": "Student not found"}

    return {
        "age": stud_data.age,
        "education": stud_data.education,
        "state_id": stud_data.state_id,
        "city_id": stud_data.city_id,
        "state_name": stud_data.state.state_name if stud_data.state else None,
        "city_name": stud_data.city.city_name if stud_data.city else None,
        "skills": stud_data.skills,
        "language": stud_data.language,
        "photo":stud_data.photo
    }


@router.get("/get_student_by_user")
def get_student_by_user(
    token: str = Cookie(None),
    db: Session = Depends(get_db)
):
    if not token:
        return {"exists": False}

    payload = decode_access_token(token)
    user_id = payload.get("user_id")

    student = db.query(models.Student).filter(
        models.Student.user_id == user_id
    ).first()

    if not student:
        return {"exists": False}

    return {
        "exists": True,
        "stud_id": student.stud_id,
        "age": student.age,
        "education": student.education,
        "state_id": student.state_id,
        "city_id": student.city_id,
        "skills": student.skills,
        "language": student.language,
        "photo": student.photo
    }

@router.post("/insert_update_profile/{user_id}")
def insert_update_profile(
    user_id: int,
    data:StudentCreate,
    db: Session = Depends(get_db)
):

    # Check existing student
    student = db.query(models.Student).filter(
        models.Student.user_id == user_id
    ).first()

    if student:
        # UPDATE
        student.age = data.age
        student.education = data.education
        student.state_id = data.state_id
        student.city_id = data.city_id
        student.skills = data.skills
        student.language = data.language

        db.commit()
        db.refresh(student)

        return {"status": True, "message": "Student Updated Successfully"}

    else:
        # INSERT
        new_student = models.Student(
            user_id=user_id,
            age=data.age,
            education=data.education,
            state_id=data.state_id,
            city_id=data.city_id,
            skills=data.skills,
            language=data.language,
        )

        db.add(new_student)
        db.commit()
        db.refresh(new_student)

        return {"status": True, "message": "Student Inserted Successfully"}


@router.get("/students_display")
def students_display(db:Session=Depends(get_db)):
      data = db.query(models.Student).order_by(models.Student.stud_id.asc()).all()
      return data

@router.get("/total_student")
def total_student(db: Session = Depends(get_db)):
    count = db.query(models.Student).count()
    return {"total_student": count}



@router.post("/profile_photo/{user_id}")
def profile_photo(
    user_id: int,
    photo: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    #  Debug
    print("USER ID:", user_id)

    # Check existing student
    student = db.query(models.Student).filter(
        models.Student.user_id == user_id
    ).first()

    print("STUDENT:", student)

    #  Unique filename
    filename = photo.filename
    file_path = os.path.join(STUDENT_DIR, filename)

    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(photo.file, buffer)

    if student:
        # UPDATE
        student.photo = filename
        db.commit()
        db.refresh(student)

        print("UPDATED PHOTO:", student.photo)

        return {"status": True, "message": "Student Photo Updated Successfully"}

    else:
        # INSERT
        new_student = models.Student(
            user_id=user_id,
            photo=filename
        )
        db.add(new_student)
        db.commit()
        db.refresh(new_student)

        print("INSERTED PHOTO:", new_student.photo)

        return {"status": True, "message": "Student photo Inserted Successfully"}
