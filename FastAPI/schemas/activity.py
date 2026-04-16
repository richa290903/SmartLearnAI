from pydantic import BaseModel

class ActivityCreate(BaseModel):
    user_id: int
    course_id: int