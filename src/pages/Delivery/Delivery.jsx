import React from 'react';
import './Delivery.css';

const Delivery = () => {
  return (
    <div className="policy-page">
      <div className="policy-content">
        <h1>Delivery Policy</h1>
        <p><strong>At Darjeeling Momo NZ</strong>, we are proud to serve fresh, authentic Nepalese and Indian flavors directly to your doorstep. To ensure the best service and maintain the quality of our food, we currently offer delivery only to selected areas within South Auckland.</p>

        <h2>Delivery Areas</h2>
        <ul>
          <li>We currently deliver exclusively within South Auckland regions.</li>
          <li>Delivery availability may vary based on distance from our operating location at Jellicoe Road, Manurewa 2102.</li>
        </ul>

        <h2>Delivery Charges</h2>
        <p>Our delivery fees are based on the distance from our kitchen:</p>
        <ul>
          <li><strong>Within 15 km:</strong> $10 Delivery Charge</li>
          <li><strong>Between 15 km – 30 km:</strong> $15 Delivery Charge</li>
          <li><strong>Between 30 km – 50 km:</strong> $20 Delivery Charge</li>
          <li><strong>Above 50 km:</strong> Delivery is not available — Pickup only from <strong>Jellicoe Road, Manurewa.</strong></li>
        </ul>


        <h2>Additional Information</h2>
        <ul>
          <li>Delivery charges are automatically calculated based on your address at the time of order confirmation.</li>
          <li>We aim to deliver your order promptly and safely. Delivery times may vary based on location and order volume.</li>
          <li>For any urgent orders, large catering orders, or special delivery requests, please contact us directly before placing the order.</li>
        </ul>
        <p>Thank you for choosing Darjeeling Momo NZ — we are committed to bringing traditional flavors and quality service right to your home!</p>
      </div>
    </div>
  );
};

export default Delivery;

