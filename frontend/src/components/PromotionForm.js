import React, { useState } from "react";
import axios from "axios";
import "../styles/promotions.css";

const PromotionForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    promotion_id: "",
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    discount_type: "percentage",
    discount_value: "",
    status: "active",
  });

  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert("Please select a valid image file");
        return;
      }
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate dates
      if (new Date(formData.start_date) >= new Date(formData.end_date)) {
        alert("End date must be after start date");
        setIsSubmitting(false);
        return;
      }

      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        payload.append(key, formData[key]);
      });
      
      if (image) {
        payload.append("image", image);
      }

      const response = await axios.post("http://localhost:5000/promotions", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onAdd(response.data.promotion);
      
      // Reset form
      setFormData({
        promotion_id: "",
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        discount_type: "percentage",
        discount_value: "",
        status: "active",
      });
      setImage(null);
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error("Error adding promotion:", error);
      alert(error.response?.data?.message || "Error adding promotion");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="promotion-form">
      <h2>Add New Promotion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="promotion_id"
          value={formData.promotion_id}
          onChange={handleInputChange}
          placeholder="Promotion ID (e.g., P0001)"
          required
        />
        
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Promotion Title"
          required
        />
        
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Promotion Description"
          required
        />
        
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleInputChange}
          required
          title="Start Date"
        />
        
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleInputChange}
          required
          title="End Date"
        />
        
        <select
          name="discount_type"
          value={formData.discount_type}
          onChange={handleInputChange}
          required
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed Amount</option>
        </select>
        
        <input
          type="number"
          name="discount_value"
          value={formData.discount_value}
          onChange={handleInputChange}
          placeholder={`Discount Value ${formData.discount_type === 'percentage' ? '(%)' : '($)'}`}
          min="0"
          step={formData.discount_type === 'percentage' ? "0.01" : "1"}
          max={formData.discount_type === 'percentage' ? "100" : undefined}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          title="Upload promotion image (optional)"
        />
        {image && (
          <div style={{ fontSize: '14px', color: '#d3af37', marginBottom: '10px' }}>
            Selected: {image.name}
          </div>
        )}

        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <div className="form-buttons">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Promotion"}
          </button>
          <button 
            type="button" 
            className="cancel-button" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromotionForm;