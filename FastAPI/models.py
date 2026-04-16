from sqlalchemy import Column,Integer,String,Text,Date,ForeignKey,Time,Float,DateTime,UniqueConstraint
from database import Base
from sqlalchemy.orm import relationship
from datetime import date, datetime


class Users(Base):
    __tablename__ = 'user'
    user_id = Column(Integer, primary_key=True, index=True, autoincrement=True) 
    fullname = Column(String(50), nullable=False)
    email = Column(String(50),unique=True)
    password = Column(String(255),nullable=False)


    students = relationship("Student", back_populates="user")
    contacts = relationship("Contact",back_populates="user")
    instructor = relationship("Instructor",back_populates="user")
      # otp = Column(String(4), nullable=True)  
      # # Stores 4 digit OTP
      # otp_expiry = Column(DateTime, nullable=True)  
      # # Stores expiry time
      # is_verified = Column(Boolean, default=False)  
      # # Email verified or not
    # students = relationship("Student", back_populates="user")
    # contacts = relationship("Contact", back_populates="user")
    course_views = relationship("CourseView", back_populates="user")
    courses = relationship("Course", back_populates="user")
    payments = relationship("Payment", back_populates="user")

class Blog(Base):
    __tablename__ = 'blog'
    blog_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    blogername = Column(String(50), nullable=False)
    blogerrole = Column(String(20), nullable=False)
    blogimage = Column(String(255), nullable=False)
    blogtitle = Column(Text, nullable=False)
    blogdescription = Column(Text, nullable=False)
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
    stud_id = Column(Integer, primary_key=True, index=True,autoincrement=True)
    user_id = Column(Integer, ForeignKey("user.user_id"))
    age = Column(Integer)
    education = Column(String(50))
    state_id = Column(Integer, ForeignKey("states.state_id"))
    city_id = Column(Integer, ForeignKey("cities.city_id"))
    skills = Column(String(255))
    language = Column(String(100))
    photo = Column(String(255))
    
    user = relationship("Users", back_populates='students')
    state = relationship("State")
    city = relationship("City")


class Contact(Base):
    __tablename__ = "contact"
    contact_id = Column(Integer,primary_key=True,autoincrement=True) 
    user_id = Column(Integer,ForeignKey("user.user_id"))
    message = Column(Text)
    created_at = Column(Date, default=date.today)
    user = relationship("Users", back_populates="contacts")


class Course(Base):
    __tablename__ = 'course'

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
    rating = Column(Float, default=0)
    total_reviews = Column(Integer, default=0)
    instructor_id = Column(Integer, ForeignKey("instructor.instructor_id"))
    user_id = Column(Integer, ForeignKey("user.user_id"))

     # Relationships
    instructor = relationship("Instructor", back_populates="courses")
    user = relationship("Users", back_populates="courses")
    course_views = relationship("CourseView", back_populates="course")
    modules = relationship("Module", back_populates="course", cascade="all, delete")
    payments = relationship("Payment", back_populates="course")
    
class Instructor(Base):
    __tablename__ = 'instructor'

    instructor_id = Column(Integer, primary_key=True, index=True,autoincrement=True)
    user_id = Column(Integer, ForeignKey("user.user_id"))

    # Basic Info
    photo = Column(Text,nullable=True)
    gender = Column(String(10))
    mobile = Column(String(15))

    # Professional Info
    qualification = Column(String(100))
    experience = Column(String)
    skills = Column(String(255))

    # Teaching Info
    language = Column(String(100))
    bio = Column(Text)

    # Location
    state_id = Column(Integer, ForeignKey("states.state_id"))
    city_id = Column(Integer, ForeignKey("cities.city_id"))

    user = relationship("Users", back_populates='instructor')
    state = relationship("State")
    city = relationship("City")
    courses = relationship("Course", back_populates="instructor")


class Admin(Base):
    __tablename__ = 'admin'
    admin_id = Column(Integer,primary_key=True,index=True,autoincrement=True)
    admin_email = Column(String(50),unique=True,nullable=False)
    admin_password = Column(String(255),nullable=False)

    otps = relationship("OTP", back_populates="admin")


class CourseView(Base):
    __tablename__ = "course_views"

    courseview_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.user_id"), nullable=False)
    course_id = Column(Integer, ForeignKey("course.course_id"), nullable=False)
    viewed_at = Column(Time,default=datetime.now().time)

    user = relationship("Users", back_populates="course_views")
    course = relationship("Course", back_populates="course_views")

    __table_args__ = (
    UniqueConstraint('user_id', 'course_id', name='unique_user_course'),
)



class OTP(Base):
    __tablename__ = 'otp_table'

    otp_id = Column(Integer,primary_key=True,autoincrement=True,index=True)
    admin_email = Column(String,ForeignKey('admin.admin_email'),index=True)
    otp = Column(String)
    expiry = Column(DateTime)

    admin = relationship("Admin", back_populates="otps")

class VideoProgress(Base):
    __tablename__ = "videoprogress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    course_id = Column(Integer, nullable=False)
    last_position = Column(Float, nullable=False)


class Module(Base):
    __tablename__ = "modules"

    module_id = Column(Integer, primary_key=True, index=True,autoincrement=True)
    course_id = Column(Integer, ForeignKey("course.course_id"))
    title = Column(String(255))
    description = Column(Text,nullable=False)
    thumbnail=Column(Text,nullable=False)
    video=Column(Text,nullable=False,unique=True)

    course = relationship("Course", back_populates="modules")


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.user_id"), nullable=False)
    course_id = Column(Integer, ForeignKey("course.course_id"), nullable=False)

    amount = Column(Float, nullable=False)
    currency = Column(String(10), default="INR")

    razorpay_order_id = Column(String(200), unique=True)
    razorpay_payment_id = Column(String(200), unique=True)
    razorpay_signature = Column(String(300))

    status = Column(String(50), default="pending")   # pending, paid, failed

    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("Users", back_populates="payments")
    course = relationship("Course", back_populates="payments")