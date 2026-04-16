from pydantic import BaseModel
from typing import List,Optional


# Base schema for City
class CityBase(BaseModel):
      name:str

# Schema used when creating a new city (POST request)
class CityCreate(CityBase):
       # Inherit 'name' from CityBase
      state_id:int    # Foreign key → which state this city belongs to

# Schema used when sending city data as response (GET request)
class CityResponse(CityBase):
      city_id:int
      state_id:int

      # This allows Pydantic to convert SQLAlchemy model → JSON
      class Config:
            orm_mode=True

# Base schema for State
class StateBase(BaseModel):
      name:str
# Schema used when creating new state
class StateCreate(StateBase):
      # No extra fields required
      # It already has 'name' from StateBase
      pass

class StateResponse(StateBase):
      state_id:int
      # List of cities inside this state
      # This creates nested JSON response
      cities:List[CityResponse] = []

      class Config:
            orm_mode=True



#  For Create/Update
class StudentCreate(BaseModel):
    age: Optional[int]= None
    education: Optional[str]= None
    state_id: Optional[int]= None
    city_id: Optional[int]= None
    skills: Optional[List[str]]=None
    language: Optional[List[str]]=None
