from pydantic import BaseModel

class ModuleRequest(BaseModel):
    course_id: int
    title: str
    description: str
    thumbnail: str   # URL or local filename
    video: str       # URL or local filename