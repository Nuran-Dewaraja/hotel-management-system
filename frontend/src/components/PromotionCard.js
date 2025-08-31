import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';

const PromotionCard = ({ promotion, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(promotion);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://Localhost:5000/promotions/${promotion.promotion_id}`, formData);
      onUpdate(response.data.promotion);
      setIsEditing(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating promotion');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this promotion?')) {
      try {
        await axios.delete(`http://Localhost:5000/promotions/${promotion.promotion_id}`);
        onDelete(promotion.promotion_id);
      } catch (error) {
        alert(error.response?.data?.message || 'Error deleting promotion');
      }
    }
  };

  return (
    <div className="promotion-card">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Title"
          />
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description"
          />
          <input
            type="date"
            value={formData.start_date.split('T')[0]}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
          />
          <input
            type="date"
            value={formData.end_date.split('T')[0]}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
          />
          <input
            type="text"
            value={formData.discount_type}
            onChange={(e) => setFormData({ ...formData, discount_type: e.target.value })}
            placeholder="Discount Type (e.g., percentage, fixed)"
          />
          <input
            type="number"
            value={formData.discount_value}
            onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
            placeholder="Discount Value"
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <div>
            <button onClick={handleUpdate}>Save</button>
            <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <h3>{promotion.title}</h3>
          <p>{promotion.description}</p>
          <p>Start Date: {new Date(promotion.start_date).toLocaleDateString()}</p>
          <p>End Date: {new Date(promotion.end_date).toLocaleDateString()}</p>
          <p>Discount: {promotion.discount_value} {promotion.discount_type}</p>
          <p>Status: {promotion.status}</p>
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionCard;