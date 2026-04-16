from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from database import get_db
from models import Admin
from schemas.admin import AdminLogin

router = APIRouter(tags=["Admin"])

@router.post("/admin_login")
def admin_login(data: AdminLogin, db = Depends(get_db)):
    admin = db.query(Admin).filter(
        Admin.admin_email == data.admin_email,
        Admin.admin_password == data.admin_password
    ).first()

    if admin:
        return {
            "success": True,
            "message": "Login successful",
            "admin_email": admin.admin_email
        }
    else:
        return JSONResponse(
            status_code=401,
            content={"success": False, "message": "Invalid credentials"}
        )