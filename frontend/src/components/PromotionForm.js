import React, { useState } from 'react';
import axios from 'axios';
import '../styles/promotions.css';

const PromotionForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    promotion_id: '',
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    discount_type: '',
    discount_value: '',
    status: 'active',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const payload = { ...formData, discount_value: Number(formData.discount_value) };

      const response = await axios.post('http://localhost:5000/promotions', payload);

      onAdd(response.data.promotion);

      setFormData({
        promotion_id: '',
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        discount_type: '',
        discount_value: '',
        status: 'active',
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding promotion');
    }
  };

  return (
    <form className="promotion-form" onSubmit={handleSubmit}>
      <h2>Add New Promotion</h2>
      <input
        type="text"
        value={formData.promotion_id}
        onChange={(e) => setFormData({ ...formData, promotion_id: e.target.value })}
        placeholder="Promotion ID (e.g., P0001)"
        required
      />
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Title"
        required
      />
      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Description"
        required
      />
      <input
        type="date"
        value={formData.start_date}
        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
        required
      />
      <input
        type="date"
        value={formData.end_date}
        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
        required
      />
      <input
        type="text"
        value={formData.discount_type}
        onChange={(e) => setFormData({ ...formData, discount_type: e.target.value })}
        placeholder="Discount Type (percentage/fixed)"
        required
      />
      <input
        type="number"
        value={formData.discount_value}
        onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
        placeholder="Discount Value"
        required
      />
      <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <div className="form-buttons">
        <button type="submit">Submit</button>
        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default PromotionForm;



