from fastapi import FastAPI, HTTPException, Depends, Security, status, File, UploadFile, Form
from fastapi.security import HTTPBasic, HTTPBasicCredentials, OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import List, Optional
import models
import schemas
from database import SessionLocal, engine, Base
import secrets
from datetime import datetime, timedelta
from jose import JWTError, jwt
from utils import save_upload_file, delete_upload_file
import os

# Create database tables
Base.metadata.create_all(bind=engine)

# Create upload directories
UPLOAD_DIRS = [
    "static/uploads/projects",
    "static/uploads/blog",
    "static/uploads/certifications",
    "static/uploads/services",
    "static/uploads/skills"
]

for dir_path in UPLOAD_DIRS:
    os.makedirs(dir_path, exist_ok=True)

# FastAPI app setup
app = FastAPI(title="Portfolio API", description="API for managing portfolio data")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security setup
security = HTTPBasic()
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"  # Use environment variables in production

def get_current_admin(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, ADMIN_USERNAME)
    correct_password = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)

    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Project routes
@app.post("/projects/", response_model=schemas.Project)
async def create_project(
    cover: UploadFile = File(...),
    title: str = Form(...),
    shortDescription: str = Form(...),
    priority: int = Form(...),
    type: str = Form(...),
    livePreview: Optional[str] = Form(None),
    githubLink: Optional[str] = Form(None),
    visitors: Optional[str] = Form(None),
    earned: Optional[str] = Form(None),
    githubStars: Optional[str] = Form(None),
    ratings: Optional[str] = Form(None),
    numberOfSales: Optional[str] = Form(None),
    siteAge: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    cover_path = await save_upload_file(cover, "projects")
    db_project = models.Project(
        title=title,
        shortDescription=shortDescription,
        priority=priority,
        type=type,
        cover=cover_path,
        livePreview=livePreview,
        githubLink=githubLink,
        visitors=visitors,
        earned=earned,
        githubStars=githubStars,
        ratings=ratings,
        numberOfSales=numberOfSales,
        siteAge=siteAge
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@app.get("/projects/", response_model=List[schemas.Project])
def read_projects(skip: int = 0, limit: int = 100, type: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Project)
    if type:
        query = query.filter(models.Project.type == type)
    return query.order_by(models.Project.priority).offset(skip).limit(limit).all()

@app.get("/projects/{project_id}", response_model=schemas.Project)
def read_project(project_id: int, db: Session = Depends(get_db)):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

@app.put("/projects/{project_id}", response_model=schemas.Project)
async def update_project(
    project_id: int,
    cover: Optional[UploadFile] = File(None),
    title: Optional[str] = Form(None),
    shortDescription: Optional[str] = Form(None),
    priority: Optional[int] = Form(None),
    type: Optional[str] = Form(None),
    livePreview: Optional[str] = Form(None),
    githubLink: Optional[str] = Form(None),
    visitors: Optional[str] = Form(None),
    earned: Optional[str] = Form(None),
    githubStars: Optional[str] = Form(None),
    ratings: Optional[str] = Form(None),
    numberOfSales: Optional[str] = Form(None),
    siteAge: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")

    if cover:
        await delete_upload_file(db_project.cover)
        cover_path = await save_upload_file(cover, "projects")
        db_project.cover = cover_path

    update_data = {
        "title": title,
        "shortDescription": shortDescription,
        "priority": priority,
        "type": type,
        "livePreview": livePreview,
        "githubLink": githubLink,
        "visitors": visitors,
        "earned": earned,
        "githubStars": githubStars,
        "ratings": ratings,
        "numberOfSales": numberOfSales,
        "siteAge": siteAge
    }

    for key, value in update_data.items():
        if value is not None:
            setattr(db_project, key, value)

    db.commit()
    db.refresh(db_project)
    return db_project

@app.delete("/projects/{project_id}")
async def delete_project(project_id: int, db: Session = Depends(get_db)):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")

    await delete_upload_file(db_project.cover)
    db.delete(db_project)
    db.commit()
    return {"message": "Project deleted successfully"}

# Service routes with file upload
@app.post("/services/", response_model=schemas.Service)
async def create_service(
    icon: UploadFile = File(...),
    title: str = Form(...),
    shortDescription: str = Form(...),
    db: Session = Depends(get_db)
):
    icon_path = await save_upload_file(icon, "services")
    db_service = models.Service(
        icon=icon_path,
        title=title,
        shortDescription=shortDescription
    )
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

@app.get("/services/", response_model=List[schemas.Service])
def read_services(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Service).offset(skip).limit(limit).all()

# Skill routes with file upload
@app.post("/skills/", response_model=schemas.Skill)
async def create_skill(
    icon: UploadFile = File(...),
    name: str = Form(...),
    db: Session = Depends(get_db)
):
    icon_path = await save_upload_file(icon, "skills")
    db_skill = models.Skill(
        icon=icon_path,
        name=name
    )
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

@app.get("/skills/", response_model=List[schemas.Skill])
def read_skills(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Skill).offset(skip).limit(limit).all()

# BlogPost routes with file upload
@app.post("/blog-posts/", response_model=schemas.BlogPost)
async def create_blog_post(
    coverImage: UploadFile = File(...),
    title: str = Form(...),
    description: str = Form(...),
    date: str = Form(...),
    content: str = Form(...),
    tags: str = Form(...),
    slug: str = Form(...),
    id: str = Form(...),
    db: Session = Depends(get_db)
):
    cover_path = await save_upload_file(coverImage, "blog")
    db_blog_post = models.BlogPost(
        id=id,
        title=title,
        description=description,
        date=date,
        coverImage=cover_path,
        content=content,
        tags=tags,
        slug=slug
    )
    db.add(db_blog_post)
    db.commit()
    db.refresh(db_blog_post)
    return db_blog_post

@app.get("/blog-posts/", response_model=List[schemas.BlogPost])
def read_blog_posts(skip: int = 0, limit: int = 10, tag: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.BlogPost)
    if tag:
        query = query.filter(models.BlogPost.tags.like(f"%{tag}%"))
    return query.order_by(models.BlogPost.date.desc()).offset(skip).limit(limit).all()

@app.get("/blog-posts/{slug}", response_model=schemas.BlogPost)
def read_blog_post_by_slug(slug: str, db: Session = Depends(get_db)):
    db_blog_post = db.query(models.BlogPost).filter(models.BlogPost.slug == slug).first()
    if db_blog_post is None:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return db_blog_post

# Certification routes with file upload
@app.post("/certifications/", response_model=schemas.Certification)
async def create_certification(
    image: UploadFile = File(...),
    title: str = Form(...),
    date: str = Form(...),
    issuer: str = Form(...),
    link: str = Form(...),
    description: Optional[str] = Form(None),
    slug: str = Form(...),
    id: str = Form(...),
    db: Session = Depends(get_db)
):
    image_path = await save_upload_file(image, "certifications")
    db_certification = models.Certification(
        id=id,
        title=title,
        date=date,
        issuer=issuer,
        image=image_path,
        link=link,
        description=description,
        slug=slug
    )
    db.add(db_certification)
    db.commit()
    db.refresh(db_certification)
    return db_certification

@app.get("/certifications/", response_model=List[schemas.Certification])
def read_certifications(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Certification).order_by(models.Certification.date.desc()).offset(skip).limit(limit).all()

# Hackathon routes
@app.post("/hackathons/", response_model=schemas.Hackathon)
def create_hackathon(hackathon: schemas.HackathonCreate, db: Session = Depends(get_db)):
    db_hackathon = models.Hackathon(**hackathon.dict())
    db.add(db_hackathon)
    db.commit()
    db.refresh(db_hackathon)
    return db_hackathon

@app.get("/hackathons/", response_model=List[schemas.Hackathon])
def read_hackathons(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Hackathon).offset(skip).limit(limit).all()

# Extracurricular routes
@app.post("/extracurriculars/", response_model=schemas.Extracurricular)
def create_extracurricular(extracurricular: schemas.ExtracurricularCreate, db: Session = Depends(get_db)):
    db_extracurricular = models.Extracurricular(**extracurricular.dict())
    db.add(db_extracurricular)
    db.commit()
    db.refresh(db_extracurricular)
    return db_extracurricular

@app.get("/extracurriculars/", response_model=List[schemas.Extracurricular])
def read_extracurriculars(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Extracurricular).offset(skip).limit(limit).all()

# Research Interest routes
@app.post("/research-interests/", response_model=schemas.ResearchInterest)
def create_research_interest(research_interest: schemas.ResearchInterestCreate, db: Session = Depends(get_db)):
    db_research_interest = models.ResearchInterest(**research_interest.dict())
    db.add(db_research_interest)
    db.commit()
    db.refresh(db_research_interest)
    return db_research_interest

@app.get("/research-interests/", response_model=List[schemas.ResearchInterest])
def read_research_interests(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.ResearchInterest).offset(skip).limit(limit).all()

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)