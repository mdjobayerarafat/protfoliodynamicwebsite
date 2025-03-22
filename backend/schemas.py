from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from fastapi import UploadFile, File

# Project schemas
class ProjectBase(BaseModel):
    title: str
    shortDescription: str
    priority: int
    type: str

class ProjectCreate(ProjectBase):
    cover: UploadFile = File(...)
    livePreview: Optional[str] = None
    githubLink: Optional[str] = None
    visitors: Optional[str] = None
    earned: Optional[str] = None
    githubStars: Optional[str] = None
    ratings: Optional[str] = None
    numberOfSales: Optional[str] = None
    siteAge: Optional[str] = None

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    shortDescription: Optional[str] = None
    priority: Optional[int] = None
    cover: Optional[UploadFile] = File(None)
    livePreview: Optional[str] = None
    githubLink: Optional[str] = None
    visitors: Optional[str] = None
    earned: Optional[str] = None
    githubStars: Optional[str] = None
    ratings: Optional[str] = None
    numberOfSales: Optional[str] = None
    type: Optional[str] = None
    siteAge: Optional[str] = None

class Project(ProjectBase):
    id: int
    cover: str  # Store the file path or URL

    class Config:
        orm_mode = True

# Service schemas
class ServiceBase(BaseModel):
    icon: str
    title: str
    shortDescription: str

class ServiceCreate(ServiceBase):
    pass

class Service(ServiceBase):
    id: int

    class Config:
        orm_mode = True

# Skill schemas
class SkillBase(BaseModel):
    name: str
    icon: str

class SkillCreate(SkillBase):
    pass

class Skill(SkillBase):
    id: int

    class Config:
        orm_mode = True

# BlogPost schemas
class BlogPostBase(BaseModel):
    title: str
    description: str
    date: str
    content: str
    tags: str  # Stored as comma-separated values
    slug: str

class BlogPostCreate(BlogPostBase):
    id: str  # Allow client to provide UUID
    coverImage: UploadFile = File(...)

class BlogPost(BlogPostBase):
    id: str
    coverImage: str  # Store the file path or URL

    class Config:
        orm_mode = True

# Certification schemas
class CertificationBase(BaseModel):
    title: str
    date: str
    issuer: str
    link: str
    description: Optional[str] = None
    slug: str

class CertificationCreate(CertificationBase):
    id: str  # Allow client to provide UUID
    image: UploadFile = File(...)

class Certification(CertificationBase):
    id: str
    image: str  # Store the file path or URL

    class Config:
        orm_mode = True

# Hackathon schemas
class HackathonBase(BaseModel):
    title: str
    description: str

class HackathonCreate(HackathonBase):
    pass

class Hackathon(HackathonBase):
    id: int

    class Config:
        orm_mode = True

# Extracurricular schemas
class ExtracurricularBase(BaseModel):
    title: str
    description: str

class ExtracurricularCreate(ExtracurricularBase):
    pass

class Extracurricular(ExtracurricularBase):
    id: int

    class Config:
        orm_mode = True

# ResearchInterest schemas
class ResearchInterestBase(BaseModel):
    interest: str

class ResearchInterestCreate(ResearchInterestBase):
    pass

class ResearchInterest(ResearchInterestBase):
    id: int

    class Config:
        orm_mode = True