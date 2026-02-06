from pydantic import BaseModel,EmailStr,Field
from datetime import datetime
from typing import Annotated,Literal

class blogModel(BaseModel):
    blogername=Annotated[str,Field(...,max_length=50)]
    blogerrole=Annotated[Literal["Instructors","Learner","Employees"],Field(title="Bloger Role")]
    # blogimage = Annotated[str,Field(...,)]
    blogtitle =Annotated[str,Field(...)]
    blogdescription = Annotated[str,Field(...)]
    blogdate:datetime=datetime.now()