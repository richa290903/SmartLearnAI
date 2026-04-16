from pydantic import BaseModel
from datetime import datetime
class CourseRequest(BaseModel):
    course_title: str
    category: str
    skill_level: str
    prerequisites: str
    description: str
    tag: str
    thumbnail: str   # URL or local filename
    video: str       # URL or local filename
    course_price: str
    duration: int

class CourseRatingRequest(BaseModel):
    course_id: int
    rating: int



class CourseViewPercentage(BaseModel):
    course_id: int
    total_views: int
    percentage: float


class TrackRequest(BaseModel):
    watch_time: int = 0
    progress: float = 0


class CourseSchema(BaseModel):
    class Config:
        from_attributes = True