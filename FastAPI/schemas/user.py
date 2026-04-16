from pydantic import BaseModel,EmailStr,Field
from typing import Annotated

class UserModel(BaseModel):
      fullname : Annotated[str,Field(...,max_length=50)]
      email : Annotated[EmailStr,Field(...,max_length=50)]
      password: Annotated[str,Field(...,max_length=10)]
    
class UserLogin(BaseModel):
    email: EmailStr
    password: str