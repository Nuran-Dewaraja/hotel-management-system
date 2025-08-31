import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PromotionCard from '../components/PromotionCard';
import PromotionForm from '../components/PromotionForm';
import '../styles/styles.css';

const PromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // form visibility

  const fetchPromotions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/promotions');
      setPromotions(response.data.promotions);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching promotions');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleAdd = (newPromotion) => {
    setPromotions([...promotions, newPromotion]);
    setShowForm(false); 
  };

  const handleUpdate = (updatedPromotion) => {
    setPromotions(
      promotions.map((promo) =>
        promo.promotion_id === updatedPromotion.promotion_id ? updatedPromotion : promo
      )
    );
  };

  const handleDelete = (promotionId) => {
    setPromotions(promotions.filter((promo) => promo.promotion_id !== promotionId));
  };

  return (
    <div className="container">
      <h1>Promotions</h1>

      <div className="add-btn-container">
        {!showForm && (
          <button className="add-btn" onClick={() => setShowForm(true)}>
            Add Promotion
          </button>
        )}
      </div>

      {showForm && (
        <PromotionForm 
          onAdd={handleAdd} 
          onClose={() => setShowForm(false)} 
        />
      )}
      
      {/* {showForm && <PromotionForm onAdd={handleAdd} />} */}

      
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      
      {!showForm && promotions.length === 0 && !loading && !error && (
        <p className="no-promotions">No promotions found.</p>
      )}

      {!showForm && (
        <div className="promotion-grid">
          {promotions.map((promotion) => (
            <PromotionCard
              key={promotion.promotion_id}
              promotion={promotion}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PromotionsPage;
