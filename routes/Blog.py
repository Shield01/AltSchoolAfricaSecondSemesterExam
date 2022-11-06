# This file defines the endpoints related to the blogs of the app

from datetime import datetime
from bson import ObjectId
from fastapi import APIRouter, Body, Header
from models.Blogs import Blog, BlogUpdateModel
from database import blogs_collection
from schemas.schema import serialize_dict, serialize_list
from auth.jwt_handeler import decode_token, verify_token

blog = APIRouter()


# Get all blogs

# This endpoint returns all blogs in the database (A user does not need to be authorized before he/she is able to access
# endpoint)
@blog.get("/blogs/homepage", tags=["blogs"])
def get_all_blogs():
    blogs = blogs_collection.find()
    return serialize_list(blogs)


# This endpoint returns a blog (A user does not need to be authorized before he/she is able to access
# # endpoint)
@blog.get("/blogs/{blog_id}", tags=["blogs"])
def get_a_blog(blog_id):
    blog_post = blogs_collection.find_one({"_id": ObjectId(blog_id)})
    if blog_post:
        return serialize_dict(blog_post)
    else:
        return f"Blog with id {blog_id} does not exist in the database"


# This endpoint satisfies the "About Page Requirements" but it returns a custom message from me
@blog.get("/blogs/about_me", tags=["about"])
def about_me():
    return {
        "title": "A message from the developer",
        "message": "Hello, my name is Hussein. This endpoint satisfies the 'About Page' Requirements but it returns a "
                   "custom message from me. I enjoyed building this for you...(I developed headache at some point"
                   " though) But above all, I hope you enjoy using/grading my application"
    }


# This endpoint satisfies the "Contact Page" requirements. It contains information on how to contact me
@blog.get("/blogs/contact_me", tags=["contact"])
def contact_me():
    return {
        "title": "How to contact the developer",
        "message": "You can contact me through the following channel ; Telephone : 08106049732 (Please leave a text"
                   ", if I don't pick up), Email Address : husseintijani2017@gmail.com ... Errm I guess that's it."
    }


# Create a blog post

# This endpoint is used to create a blog

# The client must provide a token in header of a request with the property name "token" as the value will be checked
# in other to authorize the request

# The values of the blogs created_at, created_by, and creator_userId are being set in the function, to make the blog
# creation easy for the user as the user only needs to input the value of the title and the content fields
@blog.post("/blogs/create_blog", tags=["blogs"])
def create_blog(the_blog: Blog = Body(), token: str = Header()):
    if verify_token(token):
        decoded_token = decode_token(token)
        the_blog.created_by = decoded_token["users_full_name"]
        the_blog.created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        the_blog.creator_userId = decoded_token["userId"]
        task = blogs_collection.insert_one(dict(the_blog))
        if task:
            return {
                "message": "Blog successfully created",
                "blog": the_blog
            }
    return "Token invalid please login again"


# Update a blog post

# This endpoint is used to update a blog

# The client must provide a token in header of a request with the property name "token" as the value will be checked
# in order to authorize the request

# The id of the blog must be passed as a request param, as the application needs the information to know which blog to
# update

# The value of the blogs updated_at is being set in the function, to make the user experience better
@blog.put("/blogs/update_blog/{blog_id}", tags=["blogs"])
def update_blog(blog_id, the_blog: BlogUpdateModel = Body(), token: str = Header()):
    if verify_token(token):
        blog_post = blogs_collection.find_one({"_id": ObjectId(blog_id)})
        decoded_token = decode_token(token)
        if blog_post["creator_userId"] == decoded_token["userId"]:
            the_blog.updated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            task = blogs_collection.find_one_and_update({"_id": ObjectId(blog_id)}, {"$set": the_blog.dict(exclude_unset=True)})
            if task:
                return {
                    "message": "Blog successfully updated",
                    "blog": serialize_dict(blogs_collection.find_one({"_id": ObjectId(blog_id)}))
                }
            else:
                return "Error updating the blog post"
        else:
            return "You're not the creator of this blog, hence you can't update it"
    else:
        return "Token is not valid, kindly login again"
