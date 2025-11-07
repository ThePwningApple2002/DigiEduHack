
from bson import ObjectId
from typing import Any, Optional
from pydantic import BaseModel, Field, EmailStr, GetJsonSchemaHandler
from pydantic.json_schema import JsonSchemaValue
from pydantic_core import core_schema

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(
        cls, source_type: Any, handler: Any
    ) -> core_schema.CoreSchema:
        def validate(value: Any) -> ObjectId:
            if not ObjectId.is_valid(value):
                raise ValueError("Invalid ObjectId")
            return ObjectId(value)

        return core_schema.json_or_python_schema(
            json_schema=core_schema.with_info_plain_validator_function(validate),
            python_schema=core_schema.union_schema(
                [
                    core_schema.is_instance_schema(ObjectId),
                    core_schema.with_info_plain_validator_function(validate),
                ]
            ),
            serialization=core_schema.plain_serializer_function_ser_schema(
                lambda instance: str(instance)
            ),
        )

    # --- THIS IS THE CORRECTED METHOD ---
    @classmethod
    def __get_pydantic_json_schema__(
        cls, _core_schema: core_schema.CoreSchema, handler: GetJsonSchemaHandler
    ) -> JsonSchemaValue:
        """
        Defines how this type should be represented in the JSON Schema (OpenAPI docs).
        """
        return {"type": "string", "pattern": "^[0-9a-fA-F]{24}$"}

# In app/models.py

# --- BASE MODEL (for common fields) ---
class UserBase(BaseModel):
    """
    Common user fields shared between input and output models.
    """
    fullname: str = Field(...)
    email: EmailStr = Field(...)
    course_of_study: str = Field(...)

    model_config = {
        "json_schema_extra": {
            "example": {
                "fullname": "Jane Doe",
                "email": "jane.doe@example.com",
                "course_of_study": "Data Science"
            }
        }
    }

# --- INPUT MODEL (This is the class that was missing) ---
class UserCreate(UserBase):
    """
    The model used when CREATING a user. No ID is provided here.
    This class inherits all the fields from UserBase.
    """
    pass

# --- OUTPUT / DATABASE MODEL ---
class User(UserBase):
    """
    The main user model, representing a user as it is stored in MongoDB.
    This model includes the auto-generated `_id`.
    """
    id: PyObjectId = Field(alias="_id")

    model_config = {
        "from_attributes": True,
        "arbitrary_types_allowed": True,
    }