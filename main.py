# This file is the entry point into the application

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.User import user
from routes.Blog import blog

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(user)
app.include_router(blog)
