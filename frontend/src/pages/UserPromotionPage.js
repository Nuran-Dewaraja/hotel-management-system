import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserPromotionCard from '../components/UserPromotionCard'; 
import '../styles/styles.css';
import '../styles/UserPromotions.css';

const PromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="container">
      <h1>Promotions</h1>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && promotions.length === 0 && (
        <p className="no-promotions">No promotions found.</p>
      )}

      <div className="promotion-grid">
        {promotions.map((promotion) => (
          <UserPromotionCard
            key={promotion.promotion_id}
            promotion={promotion}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionsPage;
