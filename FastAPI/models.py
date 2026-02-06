from sqlalchemy import Column,Integer,String,Text,DateTime,Date
from database import Base
from datetime import datetime,date


class Student(Base):
      __tablename__ = 'student'

      stud_id = Column(Integer,primary_key=True,index=True,autoincrement=True)
      fullname = Column(String(50),nullable=False)
      email = Column(String(50),nullable=False,unique=True)
      password = Column(Text)

class Blog(Base):
      __tablename__='blog'

      blog_id = Column(Integer,primary_key=True,index=True, autoincrement=True)
      blogername = Column(String(50),nullable=False)
      blogerrole = Column(String(20),nullable=False)
      blogimage = Column(String(255),nullable=False)
      blogtitle =Column(Text,nullable=False)
      blogdescription = Column(Text,nullable=False)
      blogdate = Column(Date, default=date.today)