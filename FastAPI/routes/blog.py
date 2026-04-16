from  fastapi import FastAPI, APIRouter,Depends,Form,File,UploadFile,HTTPException
from typing import Annotated,Literal
from pydantic import Field
from sqlalchemy.orm import Session
from database import get_db
import shutil
import models

router=APIRouter(tags=["Blog"])

UPLOAD_DIR = r"\\192.168.254.96\SharedVideos\BlogImages"


@router.post("/blog")
def blog(
    blogername: str = Form(...),
    blogerrole: Literal["Instructor","Learner","Employees"]=Form(...),
    blogtitle :  str =Form(...),
    blogdescription : str =Form(...),
    blogimage: UploadFile =File(...),
    db: Session=Depends(get_db)
):
    file_path = f"{UPLOAD_DIR}/{blogimage.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(blogimage.file, buffer)

    db_blog = models.Blog(
        blogername=blogername,
        blogerrole=blogerrole,
        blogtitle=blogtitle,
        blogdescription=blogdescription,
       blogimage=blogimage.filename 
    )

    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)

    return {"message": "Blog inserted"}



# @router.post("/blog")
# def blog(data: BlogCreate, db: Session = Depends(get_db)):

#     db_blog = models.Blog(
#         blogername=data.blogername,
#         blogerrole=data.blogerrole,
#         blogtitle=data.blogtitle,
#         blogdescription=data.blogdescription,
#         blogimage=data.blogimage
#     )

#     db.add(db_blog)
#     db.commit()
#     db.refresh(db_blog)

#     return {"message": "Blog inserted successfully"}


@router.get("/blog_display")
async def display(db:Session=Depends(get_db)):
    data=db.query(models.Blog).order_by(models.Blog.blog_id.asc()).all()
    return data

@router.get("/single_blog_data/{blog_id}")
async def single_data(blog_id:int,db:Session=Depends(get_db)):
    result=db.query(models.Blog).filter(models.Blog.blog_id==blog_id).first()
    if not result:
        raise HTTPException(status_code=404,detail="Employee not found")
    return result


@router.delete("/blogs/{blog_id}")
def delete_blog(blog_id:int,db:Session=Depends(get_db)):
    blog = db.query(models.Blog).filter(models.Blog.blog_id==blog_id).first()
    if not blog:
        raise HTTPException(status_code=404,detail="Blog not found")
    db.delete(blog)
    db.commit()
    return {"message":f"State with ID {blog_id} deleted successfully"}