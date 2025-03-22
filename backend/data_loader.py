# data_loader.py
import json
import uuid
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models

# Ensure tables are created
Base.metadata.create_all(bind=engine)

# Sample data for initial loading
SAMPLE_PROJECTS = [
    {
        "priority": 1,
        "title": "Project Alpha",
        "shortDescription": "A groundbreaking project that revolutionizes the way we approach technology. Built with cutting-edge tools for maximum efficiency, it sets new industry standards.",
        "cover": "https://images.unsplash.com/photo-1585282263861-f55e341878f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "livePreview": "https://example.com/alpha",
        "type": "Client Work 🙍‍♂️",
        "siteAge": "1 month old",
    },
    {
        "priority": 2,
        "title": "Project Beta",
        "shortDescription": "Project Beta is a static technical blog site built with GatsbyJS. I share tips on topics like building reusable components in React, explaining JavaScript methods and concepts, Node.js scripts, and more.",
        "cover": "https://plus.unsplash.com/premium_photo-1663040328859-48bddaa9dfeb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "livePreview": "https://example.com/beta",
        "visitors": "8K Visitors",
        "earned": "$400 Earned",
        "type": "Personal Project 🚀",
    },
    {
        "priority": 3,
        "title": "Project Epsilon",
        "shortDescription": "A collection of engaging coding challenges designed to help developers improve their ReactJS skills by writing functional business logic. Your task is to make it functional by writing business logic, to improve your frontend skills",
        "cover": "https://plus.unsplash.com/premium_photo-1661700152890-931fb04588e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "type": "Free 🔥",
        "livePreview": "https://example.com/epsilon",
        "githubLink": "https://github.com/example/ReactJS-Coding-Challenges",
        "githubStars": "40 Stars",
        "numberOfSales": "138 Sales",
    },
    {
        "priority": 4,
        "title": "Ejucationzz",
        "shortDescription": "Ejucationzz is a directory site I created for myself using Next.js. On Ejucationzz, you can find free and paid online and offline courses available in Pakistan. 14 academies and 12 main categories, each with subcategories, have been listed.",
        "cover": "https://images.unsplash.com/photo-1527334919515-b8dee906a34b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "type": "New 🔥",
        "livePreview": "https://example.com/Ejucationzz",
        "siteAge": "4 months old",
        "visitors": "100 Visitors",
    }
]

SAMPLE_SERVICES = [
    {
        "icon": "JavaScriptIcon",
        "title": "JavaScript Development",
        "shortDescription": "Creating dynamic and interactive web applications using JavaScript.",
    },
    {
        "icon": "ReactIcon",
        "title": "React.js Development",
        "shortDescription": "Building modern and responsive user interfaces with React.js.",
    },
    {
        "icon": "NodejsIcon",
        "title": "Node.js Backend",
        "shortDescription": "Developing scalable server-side applications using Node.js.",
    },
    {
        "icon": "NextjsIcon",
        "title": "Next.js Development",
        "shortDescription": "Creating server-rendered React applications with Next.js.",
    },
    {
        "icon": "TypescriptIcon",
        "title": "TypeScript Development",
        "shortDescription": "Ensuring robust and maintainable code with TypeScript.",
    },
    {
        "icon": "TailwindCSS",
        "title": "Tailwind CSS Styling",
        "shortDescription": "Designing beautiful and responsive interfaces with Tailwind CSS.",
    }
]

SAMPLE_SKILLS = [
    {"name": "JavaScript", "icon": "JavaScriptIcon"},
    {"name": "TypeScript", "icon": "TypescriptIcon"},
    {"name": "React.js", "icon": "ReactIcon"},
    {"name": "Next.js", "icon": "NextjsIcon"},
    {"name": "Node.js", "icon": "NodejsIcon"},
    {"name": "Express.js", "icon": "ExpressjsIcon"},
    {"name": "Nest.js", "icon": "NestjsIcon"},
    {"name": "Socket.io", "icon": "SocketIcon"}
]

SAMPLE_BLOG_POSTS = [
    {
        "id": str(uuid.uuid4()),
        "title": "Getting Started with FastAPI",
        "description": "Learn how to build robust APIs with FastAPI and Python",
        "date": "2024-03-01",
        "coverImage": "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
        "content": "# Getting Started with FastAPI\n\nFastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints...",
        "tags": "python,fastapi,api,web development",
        "slug": "getting-started-with-fastapi"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "React Hooks Deep Dive",
        "description": "Understanding React hooks and their practical applications",
        "date": "2024-02-15",
        "coverImage": "https://images.unsplash.com/photo-1633356122102-3fe60d47b2d9",
        "content": "# React Hooks Deep Dive\n\nReact Hooks were introduced in React 16.8 and have changed the way we write React components...",
        "tags": "react,javascript,frontend,hooks",
        "slug": "react-hooks-deep-dive"
    }
]

SAMPLE_CERTIFICATIONS = [
    {
        "id": str(uuid.uuid4()),
        "title": "AWS Certified Solutions Architect",
        "date": "2023-10-15",
        "issuer": "Amazon Web Services",
        "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        "link": "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
        "description": "Validates expertise in designing distributed systems on AWS",
        "slug": "aws-solutions-architect"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "MongoDB Certified Developer",
        "date": "2023-07-22",
        "issuer": "MongoDB",
        "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
        "link": "https://university.mongodb.com/certification",
        "description": "Recognizes proficiency in MongoDB application development",
        "slug": "mongodb-certified-developer"
    }
]

SAMPLE_HACKATHONS = [
    {
        "title": "Global AI Hackathon",
        "description": "Developed an AI-powered content recommendation engine that won 2nd place"
    },
    {
        "title": "Web3 Development Challenge",
        "description": "Created a decentralized application for peer-to-peer file sharing using blockchain technology"
    }
]

SAMPLE_EXTRACURRICULARS = [
    {
        "title": "Tech Meetup Organizer",
        "description": "Organize monthly developer meetups focusing on JavaScript and web technologies"
    },
    {
        "title": "Open Source Contributor",
        "description": "Active contributor to several open-source projects including React libraries and Node.js tools"
    }
]

SAMPLE_RESEARCH_INTERESTS = [
    {"interest": "Artificial Intelligence in Web Development"},
    {"interest": "Distributed Systems"},
    {"interest": "WebAssembly Applications"},
    {"interest": "Progressive Web Apps"}
]

def load_sample_data():
    db = SessionLocal()
    try:
        # Check if data already exists
        if db.query(models.Project).count() == 0:
            # Load projects
            for project in SAMPLE_PROJECTS:
                db_project = models.Project(**project)
                db.add(db_project)
            
            # Load services
            for service in SAMPLE_SERVICES:
                db_service = models.Service(**service)
                db.add(db_service)
            
            # Load skills
            for skill in SAMPLE_SKILLS:
                db_skill = models.Skill(**skill)
                db.add(db_skill)
            
            # Load blog posts
            for blog_post in SAMPLE_BLOG_POSTS:
                db_blog_post = models.BlogPost(**blog_post)
                db.add(db_blog_post)
            
            # Load certifications
            for certification in SAMPLE_CERTIFICATIONS:
                db_certification = models.Certification(**certification)
                db.add(db_certification)
            
            # Load hackathons
            for hackathon in SAMPLE_HACKATHONS:
                db_hackathon = models.Hackathon(**hackathon)
                db.add(db_hackathon)
            
            # Load extracurriculars
            for extracurricular in SAMPLE_EXTRACURRICULARS:
                db_extracurricular = models.Extracurricular(**extracurricular)
                db.add(db_extracurricular)
            
            # Load research interests
            for research_interest in SAMPLE_RESEARCH_INTERESTS:
                db_research_interest = models.ResearchInterest(**research_interest)
                db.add(db_research_interest)
            
            db.commit()
            print("Sample data loaded successfully!")
        else:
            print("Database already contains data. Skipping sample data loading.")
    except Exception as e:
        db.rollback()
        print(f"Error loading sample data: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    load_sample_data()