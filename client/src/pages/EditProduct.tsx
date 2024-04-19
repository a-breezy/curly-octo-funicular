import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ProductForm from "../components/ProductForm/ProductForm";

export default function EditProduct() {
  const { vendorId, productId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    condition: "good",
    quantity: 0,
    price: 0,
    availability: true,
    productImage: null as File | null,
    vendor: vendorId!,
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5555/products/${productId}`)
      .then((res) => {
        const data = res.data;
        console.log(data.productImage);
        if (data) setFormData(data);
      })
      .catch((error) => {
        setMessage("An error happened. Please check console");
        console.log(error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .putForm(`http://localhost:5555/products/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setMessage("Success, redirecting you to your dashboard");
        setTimeout(() => {
          navigate(`/dashboard/${vendorId}`);
        }, 4000);
      })
      .catch((error) => {
        setMessage("An error occurred. Please try again.");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        message={message}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}