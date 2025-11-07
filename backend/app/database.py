from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_DETAILS = os.getenv("MONGO_DETAILS")

client = AsyncIOMotorClient(MONGO_DETAILS)

database = client["hackaton"] # Replace with your database name

# Example collection
user_collection = database.get_collection("users")

# You can add more collections here