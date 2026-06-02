from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from ..dependencies import get_db
from ..models import Product, Customer, Order

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def get_dashboard(
    db: Session = Depends(get_db)
):

    total_products = db.query(
        func.count(Product.id)
    ).scalar()

    total_customers = db.query(
        func.count(Customer.id)
    ).scalar()

    total_orders = db.query(
        func.count(Order.id)
    ).scalar()

    low_stock_products = (
        db.query(Product)
        .filter(Product.quantity < 5)
        .all()
    )

    return {
        "total_products": total_products,
        "total_customers": total_customers,
        "total_orders": total_orders,
        "low_stock_products": [
            {
                "id": product.id,
                "name": product.name,
                "sku": product.sku,
                "quantity": product.quantity
            }
            for product in low_stock_products
        ]
    }