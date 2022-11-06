# This file defines the endpoints related to the users of the app
from datetime import datetime

from fastapi import APIRouter, Body, HTTPException, Header
from models.Users import User, UserLogin
from database import users_collection, black_list_collection
from auth.jwt_handeler import token_response, hashPassword, check_password

user = APIRouter()


# User Sign up

# This endpoint is used to sign up as a user
@user.post("/api/user_signup", tags=["users"])
async def user_signup(the_user: User = Body(default=None)):
    hashed_password = hashPassword(the_user.password)
    the_user.created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    the_user.password = hashed_password
    users_collection.insert_one(dict(the_user))
    return {
        "message": "User Successfully created"
    }


# User Login

# This endpoint is used to log in, it returns a token in the response which can be used to authorize requests
@user.post("/api/user_login", tags=["users"])
def user_login(form_data: UserLogin = Body()):
    if check_password(form_data):
        return token_response(check_password(form_data))
    else:
        raise HTTPException(status_code=400, detail="Incorrect username or password")


# Logout

# This endpoint saves the current token, to a blacklist on the db. All requests passed with a blacklisted token is not
# honoured by the application
@user.post("/api/user_logout", tags=["users"])
def logout(token: str = Header()):
    task = black_list_collection.insert_one({"token": token})
    if task:
        return "User logout successful"
    else:
        return "Unable to logout, try again"
