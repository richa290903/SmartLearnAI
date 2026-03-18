from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class VideoProgressRequest(BaseModel):
    user_id: int
    course_id: int
    last_position: float
    # updated_at: Optional[datetime] = None