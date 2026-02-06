from pydantic import BaseModel,EmailStr,Field
from typing import Annotated

class StudentModel(BaseModel):
      fullname : Annotated[str,Field(...,max_length=50)]
      email : Annotated[EmailStr,Field(...,max_length=50)]
      password: Annotated[str,Field(...,max_length=10)]
    
# class StudentCreates(StudentBase):
#       password:str

# class Student(StudentBase):
#       id:int
#       class Config:
#             orm_mode = True

# class Token(StudentBase):
#       access_token:str
#       token_type:str

# class StudentOut(BaseModel):
#       id:int
#       fullname:str
#       email:str
#       class Config:
#             orm_mode=True