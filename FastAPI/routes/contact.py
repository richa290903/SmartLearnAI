from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
import models
from database import get_db
from schemas.contact import ContactModel

router=APIRouter(tags=["Contacts"])

@router.post("/insert_contact_msg")
def insert_contact_msg(data: ContactModel, db: Session = Depends(get_db)):

    new_contact = models.Contact(
        user_id=data.user_id,
        message=data.message
    )

    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)

    return {
        "status": True,
        "message": "Contact message inserted successfully"
    }


@router.get("/contact_display")
def contact_display(
    db: Session = Depends(get_db)
):
    return db.query(models.Contact).all()



@router.delete("/contact/{contact_id}")
def delete_contact(contact_id: int, db: Session = Depends(get_db)):
    contacts = db.query(models.Contact).filter(models.Contact.contact_id == contact_id).first()
    if not contacts:
        raise HTTPException(status_code=404, detail="contact not found")
    
    db.delete(contacts)
    db.commit()
    
    return {"message": f"Contact with ID {contact_id} deleted successfully"}