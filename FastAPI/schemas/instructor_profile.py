from pydantic import BaseModel
from typing import List,Optional


class InstructorCreate(BaseModel):
    photo: Optional[str]=None
    gender: str
    mobile: str
    qualification: str
    experience: Optional[str]=None
    skills: str
    language: str 
    bio: Optional[str]=None
    state_id: str
    city_id: str