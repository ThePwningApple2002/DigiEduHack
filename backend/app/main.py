from fastapi import FastAPI
from .routes import router as user_router

app = FastAPI()

app.include_router(user_router, tags=["users"], prefix="/users")

@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI MongoDB async backend!"}