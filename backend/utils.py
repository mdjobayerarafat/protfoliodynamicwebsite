# utils.py
import os
from fastapi import UploadFile
from pathlib import Path
import shutil
from uuid import uuid4
from typing import Optional

UPLOAD_DIR = "static/uploads"

async def save_upload_file(file: UploadFile, folder: str) -> Optional[str]:
    if not file:
        return None

    # Create folder if it doesn't exist
    folder_path = Path(UPLOAD_DIR) / folder
    folder_path.mkdir(parents=True, exist_ok=True)

    # Generate unique filename
    file_extension = Path(file.filename).suffix
    unique_filename = f"{uuid4()}{file_extension}"
    file_path = folder_path / unique_filename

    try:
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        return f"uploads/{folder}/{unique_filename}"
    except Exception:
        return None
    finally:
        file.file.close()

async def delete_upload_file(file_path: Optional[str]) -> bool:
    if not file_path:
        return False

    try:
        full_path = Path("static") / file_path
        if full_path.exists():
            full_path.unlink()
        return True
    except Exception:
        return False