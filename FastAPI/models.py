from sqlalchemy import Column,Integer,String,Text,Date,ForeignKey,Time,DateTime,Float
from database import Base
from sqlalchemy.orm import relationship
from datetime import date,datetime



class Users(Base):
    __tablename__ = 'user'

    user_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    fullname = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False, unique=True)
    password = Column(String(255), nullable=False)

    students = relationship("Student", back_populates="user")
    contacts = relationship("Contact",back_populates="user")
      # otp = Column(String(4), nullable=True)  
      # # Stores 4 digit OTP
      # otp_expiry = Column(DateTime, nullable=True)  
      # # Stores expiry time
      # is_verified = Column(Boolean, default=False)  
      # # Email verified or not


class Blog(Base):
      __tablename__='blog'

      blog_id = Column(Integer,primary_key=True,index=True,autoincrement=True)
      blogername = Column(String(50),nullable=False)
      blogerrole = Column(String(20),nullable=False)
      blogimage = Column(String(255),nullable=False)
      blogtitle =Column(Text,nullable=False)
      blogdescription = Column(Text,nullable=False)
      blogdate = Column(Date, default=date.today)


class State(Base):
    __tablename__ = 'states'

    state_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    state_name = Column(String(100), nullable=False, unique=True)

    cities = relationship("City", back_populates="state")


class City(Base):  
    __tablename__ = 'cities'

    city_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    city_name = Column(String(100), nullable=False, unique=True)
    state_id = Column(Integer, ForeignKey("states.state_id"))

    state = relationship("State", back_populates="cities")



class Student(Base):
    __tablename__ = 'student'

    stud_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.user_id"))

    age = Column(Integer)
    education = Column(String(50))

    state_id = Column(Integer, ForeignKey("states.state_id"))
    city_id = Column(Integer, ForeignKey("cities.city_id"))

    skills = Column(String(255))
    language = Column(String(100))

    user = relationship("Users", back_populates='students')
    state = relationship("State")
    city = relationship("City")


class Contact(Base):
    __tablename__ = "contact"
    contact_id = Column(Integer,primary_key=True,autoincrement=True) 
    user_id = Column(Integer,ForeignKey("user.user_id"))
    message = Column(Text)
    created_at = Column(Date, default=date.today)

    user = relationship("Users", back_populates='contacts')



class Course(Base):
      __tablename__='course'

      course_id=Column(Integer,primary_key=True,index=True,autoincrement=True)
      course_title=Column(Text,nullable=False)
      category=Column(String(50),nullable=False)
      skill_level=Column(String(20),nullable=False)
      prerequisites=Column(Text,nullable=False)
      description=Column(Text,nullable=False)
      tag=Column(Text,nullable=False)
      thumbnail=Column(Text,nullable=False)
      video=Column(Text,nullable=False,unique=True)
      course_price=Column(Integer,nullable=False)
      course_date=Column(Date,default=date.today)
      course_time=Column(Time,default=datetime.now().time)
      created_at = Column(DateTime, default=datetime.utcnow)


class VideoProgress(Base):
    __tablename__ = "videoprogress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    course_id = Column(Integer, nullable=False)
    last_position = Column(Float, nullable=False)