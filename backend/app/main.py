from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine

# Import routers
from .routers import products

from .routers import customers

from .routers import orders

from .routers import dashboard



# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Inventory Management API",
    description="Inventory & Order Management System API",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change later in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Register Routers
app.include_router(products.router)

app.include_router(customers.router)

app.include_router(orders.router)

app.include_router(dashboard.router)



@app.head("/")
def health_check():
    return {}

# Root Endpoint
@app.get("/")
def root():
    return {
        "message": "Inventory Management API Running",
        "status": "success"
    }

   