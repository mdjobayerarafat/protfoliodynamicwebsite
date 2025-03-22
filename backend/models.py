from sqlalchemy import Boolean, Column, Integer, String, Text, ForeignKey, Date
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    shortDescription = Column(Text)
    priority = Column(Integer, default=0)
    cover = Column(String)
    livePreview = Column(String, nullable=True)
    githubLink = Column(String, nullable=True)
    visitors = Column(String, nullable=True)
    earned = Column(String, nullable=True)
    githubStars = Column(String, nullable=True)
    ratings = Column(String, nullable=True)
    numberOfSales = Column(String, nullable=True)
    type = Column(String)
    siteAge = Column(String, nullable=True)

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    icon = Column(String)  # Store the icon name/path
    title = Column(String, index=True)
    shortDescription = Column(Text)

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    icon = Column(String)  # Store the icon name/path

class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    date = Column(String)  # Store as ISO format string
    coverImage = Column(String)
    content = Column(Text)
    tags = Column(String)  # Store as comma-separated values
    slug = Column(String, unique=True, index=True)

class Certification(Base):
    __tablename__ = "certifications"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, index=True)
    date = Column(String)  # Store as ISO format string
    issuer = Column(String)
    image = Column(String)
    link = Column(String)
    description = Column(Text, nullable=True)
    slug = Column(String, unique=True, index=True)

class Hackathon(Base):
    __tablename__ = "hackathons"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)

class Extracurricular(Base):
    __tablename__ = "extracurriculars"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)

class ResearchInterest(Base):
    __tablename__ = "research_interests"

    id = Column(Integer, primary_key=True, index=True)
    interest = Column(String, index=True)
