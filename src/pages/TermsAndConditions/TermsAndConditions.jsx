import React from 'react';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
  return (
    <div className="policy-page">
      <div className="policy-content">
        <h1>Terms and Conditions</h1>
        <p><strong>Effective Date:</strong>  28-Apr-2025</p>

        <h2>1. Use of Website</h2>
        <p>You agree to use our website for lawful purposes only and not cause harm to the website's functionality.</p>

        <h2>2. Orders and Payments</h2>
        <p>By placing an order, you confirm that all information provided is accurate. Payments are securely processed through Stripe, and we do not store your card information.</p>

        <h2>3. Food Preparation and Allergens</h2>
        <p>Our kitchen handles common allergens. Please inform us of any allergies when ordering.</p>

        <h2>4. Intellectual Property</h2>
        <p>All content on this website is owned by Darjeeling Momo NZ and cannot be reproduced without permission.</p>

        <h2>5. Limitation of Liability</h2>
        <p>We are not responsible for any indirect or consequential damages arising from the use of our services.</p>

        <h2>6. Changes to Terms</h2>
        <p>We reserve the right to update these Terms anytime without prior notice.</p>

        <h2>7. Contact Us</h2>
        <p>For any questions, please contact us at <strong>darjeelinglimitednz@gmail.com</strong> or <strong>+64-278024729</strong>.</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
