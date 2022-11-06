# This file handles the database connection

from pymongo import MongoClient
from decouple import config

conn = MongoClient(config("MongoDb_URI"))

db = conn
users_collection = db.altSchoolAfricaSecondSemesterExam.users
blogs_collection = db.altSchoolAfricaSecondSemesterExam.blogs
black_list_collection = db.altSchoolAfricaSecondSemesterExam.blacklist
