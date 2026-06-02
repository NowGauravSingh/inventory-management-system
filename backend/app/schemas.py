from pydantic import BaseModel, EmailStr, Field


class ProductBase(BaseModel):
    name: str
    sku: str
    price: float = Field(gt=0)
    quantity: int = Field(ge=0)


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class CustomerCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str


class OrderCreate(BaseModel):
    customer_id: int
    product_id: int
    quantity: int = Field(gt=0)