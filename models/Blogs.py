# This file defines the Blog models that are used in the project

from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class Blog(BaseModel):
    title: str
    content: str
    created_at: Optional[datetime]
    created_by: Optional[str]
    updated_at: Optional[datetime]
    creator_userId: Optional[str]


class BlogUpdateModel(BaseModel):
    title: Optional[str]
    content: Optional[str]
    updated_at: Optional[datetime]
