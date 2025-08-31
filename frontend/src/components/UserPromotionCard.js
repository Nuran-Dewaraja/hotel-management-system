import React from 'react';
import '../styles/styles.css';
import '../styles/UserPromotions.css';

const UserPromotionCard = ({ promotion }) => {
  return (
    <div className="promotion-card">
      <h3>{promotion.title}</h3>
      <p>{promotion.description}</p>
      <p>Start Date: {new Date(promotion.start_date).toLocaleDateString()}</p>
      <p>End Date: {new Date(promotion.end_date).toLocaleDateString()}</p>
      <p>Discount: {promotion.discount_value} {promotion.discount_type}</p>
      <p>Status: {promotion.status}</p>
    </div>
  );
};

export default UserPromotionCard;
