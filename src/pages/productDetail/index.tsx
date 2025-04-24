import React, { useState } from "react";
import "./index.css";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);

  // Dữ liệu mẫu
  const productData = {
    id: "1",
    name: "Giant Defy Advanced",
    categoryId: "1",
    supplierId: "2",
    description:
      "Experience unmatched comfort and performance with the Giant Defy Advanced. This endurance race bike features a lightweight carbon frame, advanced compliance technology.",
    price: 299.0,
    priceReduced: 249.0,
    promotionId: "PROMO123",
    createdAt: "2025-03-25T03:58:01.035Z",
    updatedAt: "2025-03-25T03:58:01.035Z",
    images: "https://api.xedap.vn/products/HYPER/rider-3-charcoal_2.jpg",
  };

  const specifications = [
    {
      specificationId: "1",
      productId: "1",
      key: "Color",
      value: "Silver",
    },
  ];

  const handleQuantityChange = (type: "increment" | "decrement") => {
    setQuantity((prev) =>
      type === "increment" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  const colorSpec = specifications.find((spec) => spec.key === "Color");

  return (
    <div className="product-detail-container">
      {/* Left Section: Product Images */}
      <div className="product-images">
        <img
          src={productData.images}
          alt="Main Product"
          className="main-product-image"
        />
      </div>

      {/* Right Section: Product Details */}
      <div className="product-details">
        <h1>{productData.name}</h1>
        <p className="reviews">★ ★ ★ ★ ★ 5 Reviews</p>
        <h2 className="price">${productData.price.toFixed(2)} USD</h2>
        <p className="description">{productData.description}</p>

        {/* Display Product Color */}
        {colorSpec && (
          <div className="product-color-display">
            <h4>
              Color:
              <span style={{marginLeft: 5}}>{colorSpec.value}</span>
            </h4>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="quantity-selector">
          <h4>Quantity:</h4>
          <div className="quantity-controls">
            <button onClick={() => handleQuantityChange("decrement")}>-</button>
            <input type="text" value={quantity} readOnly />
            <button onClick={() => handleQuantityChange("increment")}>+</button>
          </div>
        </div>

        {/* Buttons */}
        <div className="action-buttons">
          <button className="add-to-cart">Add to Cart</button>
          <button className="buy-now">Buy Now</button>
        </div>

        {/* Payment Options */}
        <div className="payment-options">
          <h4>Guaranteed Safe Checkout:</h4>
          <div className="payment-logos">
            <img src="../public/assets/images/logo_VISA.png" alt="Visa" />
            <img src="../public/assets/images/logo_MOMO.png" alt="Momo" />
            <img src="../public/assets/images/logo_COD.png" alt="Cash on Delivery" />
          </div>
          <p className="shipping-info">
            Orders ship within 5 to 10 business days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
