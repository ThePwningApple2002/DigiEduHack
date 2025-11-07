# In app/routes.py

from typing import List
from fastapi import APIRouter, Body, HTTPException, status
from .database import user_collection
from .models import User, UserCreate
from bson import ObjectId

router = APIRouter()

@router.post(
    "/",
    response_description="Add new user",
    response_model=User, # The response will be the full User model with an ID
    status_code=status.HTTP_201_CREATED
)
async def create_user(user: UserCreate = Body(...)): # The input is now the UserCreate model
    """
    Create a new user. The ID is auto-assigned by the database.
    """
    # Convert the Pydantic model to a dictionary for MongoDB
    user_data = user.model_dump()

    # Check if a user with this email already exists
    if await user_collection.find_one({"email": user_data["email"]}):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"User with email {user_data['email']} already exists"
        )

    # MongoDB automatically adds the `_id` field upon insertion
    new_user = await user_collection.insert_one(user_data)

    # Fetch the newly created document from the DB to get the complete user object, including the ID
    created_user = await user_collection.find_one({"_id": new_user.inserted_id})

    # FastAPI will automatically serialize this (including the ObjectId) into the `User` response_model
    return created_user




@router.get("/{id}", response_description="Get a single user", response_model=User)
async def show_user(id: str):
    """
    Retrieves a single user from the database based on their MongoDB ObjectId.
    """
    # 1. Validate the ID format (important guard clause)
    if not ObjectId.is_valid(id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"The provided ID '{id}' is not a valid ObjectId"
        )

    # 2. Perform the database query
    #    The key is converting the string `id` into an ObjectId object for the query.
    if (user := await user_collection.find_one({"_id": ObjectId(id)})) is not None:
        # 3. Return the user if found
        #    FastAPI and Pydantic will handle serializing the User model to JSON.
        return user

    # 4. Handle the "Not Found" case
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, 
        detail=f"User with ID {id} not found"
    )

# --- NEW "GET ALL" ENDPOINT ---
@router.get(
    "/",
    response_description="List all users",
    response_model=List[User]  # The response is a list of User models
)
async def list_users():
    """
    Retrieves a list of all users from the database.
    """
    # The .find() method returns a cursor that we can iterate over.
    # .to_list(1000) asynchronously fetches up to 1000 documents.
    users = await user_collection.find().to_list()
    return users
