// Footer.js
import React from 'react';
import '../styles/Footer.css'; // Bạn có thể tạo file CSS riêng cho phần style
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h2>About Us</h2>
            <p>
              Welcome to GymPro, your number one source for all fitness needs. We are dedicated to providing the best training and health resources.
            </p>
          </div>

          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h2>Contact Us</h2>
            <p>Email: contact@gympro.com</p>
            <p>Phone: +123 456 789</p>
            <p>Address: 123 Fitness Street, Gym City</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2024 GymPro | Designed by Tuấn
      </div>
    </footer>
  );
}

export default Footer;
