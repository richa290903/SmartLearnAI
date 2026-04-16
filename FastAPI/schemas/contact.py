from pydantic import BaseModel


class ContactModel(BaseModel):
   user_id: int
   message:str
      
   class Config:
         from_attributes = True
