# This file defines the User models that are used in the project

from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class User(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    gender: str
    password: str
    phone_number: Optional[str] = None
    created_at: Optional[datetime]


class UserLogin(BaseModel):
    email: EmailStr
    password: str
