# This file is responsible for signing, encoding, decoding, hashing passwords  and returning JWTs

from datetime import datetime, timedelta

import jwt
from bson import ObjectId
from decouple import config
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from database import users_collection, black_list_collection

JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/user_login")


# This function returns the generated token in the specified format
def token_response(token: str):
    return {
        "access token": token,
        "token_type": "bearer"
    }


# This function builds the payload to be signed, signs it and then returns it
def sign_jwt(user_id: str):
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    payload = {
        "userId": str(user_id),
        "expires": (datetime.now() + timedelta(minutes=5)).strftime("%Y-%m-%d %H:%M:%S.%f"),
        "users_full_name": user["firstname"] + " " + user["lastname"]
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token


# This function decodes the token and returns the token, if it is not expired
def decode_token(token):
    decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    if decoded_token:
        expiry_time = datetime.strptime(decoded_token['expires'], "%Y-%m-%d %H:%M:%S.%f")
        if expiry_time >= datetime.now():
            return decoded_token
        else:
            return False
    else:
        return False


# This function hashes the password
def hashPassword(password):
    return password_context.hash(password)


# Check that the password is correct
def check_password(data):
    the_user = users_collection.find_one({"email": data.email})
    if the_user:
        verify_password = password_context.verify(data.password, the_user["password"])
        if verify_password:
            return sign_jwt(the_user["_id"])
    else:
        return False


# This function verifies that a token is valid, by confirming it's not on the blacklist and
def verify_token(token: str):
    is_token_valid: bool = False
    check_blacklist = black_list_collection.find_one({"token": token})
    if check_blacklist:
        return is_token_valid
    else:
        payload = decode_token(token)
        if payload:
            is_token_valid = True
            return is_token_valid
        else:
            return is_token_valid
