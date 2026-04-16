from pydantic import BaseModel

class AdminLogin(BaseModel):
    admin_email: str
    admin_password: str