from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

URL_DATABASE ='postgresql+psycopg2://postgres:richa2909@192.168.41.96:5432/SmartLearnAI'

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
# load_dotenv()
# DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(URL_DATABASE)
print(URL_DATABASE)
# Create session
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()
