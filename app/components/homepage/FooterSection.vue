<template>
  <footer class="footer-section">
    <div class="container">
      <div class="footer-mobile mobile-only">
        <div class="mobile-logo-section">
          <img src="/images/logo.svg" alt="Picture the Stars" class="mobile-footer-logo" />
          <p class="mobile-company-description">
            The specialists in creating exceptional Star Maps of the highest quality. 
            Perfected over years of innovation & evolution. New products launched.
          </p>
        </div>
        
        <div class="mobile-sections">
          <div class="mobile-section">
            <h3 class="mobile-footer-title">PREMIUM PRINT</h3>
            <div class="mobile-links">
              <a href="#">Moon Phase Print</a>
              <a href="#">Original Star Map</a>
              <a href="#">Real Photo Star Map</a>
              <a href="#">Mystic Night Star Map</a>
              <a href="#">Deep Space Print</a>
              <a href="#">Location Map</a>
            </div>
          </div>
          
          <div class="mobile-section">
            <h3 class="mobile-footer-title">CONTACT US</h3>
            <div class="mobile-contact">
              <p>We are always happy to help<br>Monday - Friday 9am - 4:30pm</p>
              <p>Picture The Stars, Ivy Business Centre, Crown Street, Failsworth, Manchester, M35 9BD, United Kingdom</p>
              <p>support@picturethestars.com</p>
              <p>0161 528 9460</p>
            </div>
          </div>
          
          <div class="mobile-section">
            <h3 class="mobile-footer-title">FREE UK SHIPPING</h3>
            <div class="mobile-shipping">
              <p>Free shipping to the UK, Orders before 3:30pm are dispatched the same day.</p>
              <p>All orders sent via Royal Mail Fully Tracked 48 hour (1-2 Days). Email and SMS Text updates.</p>
            </div>
          </div>
          
          <div class="mobile-section">
            <h3 class="mobile-footer-title">GUARANTEE</h3>
            <div class="mobile-guarantee">
              <p>We are confident you will love your purchase, however if you decide to return it back to us within 30 days, we will refund you 100% of the purchase amount.</p>
            </div>
          </div>
          
          <div class="mobile-section">
            <h3 class="mobile-footer-title">SECURE PAYMENT</h3>
            <div class="mobile-payment">
              <p>Encrypted secure payment powered by Stripe. Money back guarantee (30 days) if you are not satisfied with your order. Credit & Debit card payments by</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-grid">
        <div class="footer-column">
          <div class="logo-section">
            <img src="/images/logo.svg" alt="Picture the Stars" class="footer-logo" />
          </div>
          <p class="company-description">
            The specialists in creating exceptional<br>
            Star Maps of the highest quality.<br>
            Perfected over years of innovation &<br>
            evolution. New products launched.
          </p>
        </div>
        
        <div class="footer-column">
          <h3 class="footer-title">PREMIUM PRINT</h3>
          <ul class="footer-links">
            <li><a href="#">Moon Phase Print</a></li>
            <li><a href="#">Original Star Map</a></li>
            <li><a href="#">Real Photo Star Map</a></li>
            <li><a href="#">Mystic Night Star Map</a></li>
            <li><a href="#">Deep Space Print</a></li>
            <li><a href="#">Location Map</a></li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h3 class="footer-title">CONTACT US</h3>
          <div class="contact-info">
            <p class="contact-hours">
              We are always happy to help<br>
              Monday - Friday 9am - 4:30pm
            </p>
            
            <p class="contact-address">
              Picture The Stars, Ivy Business<br>
              Centre, Crown Street, Failsworth,<br>
              Manchester, M35 9BD, United<br>
              Kingdom
            </p>
            
            <p class="contact-email">support@picturethestars.com</p>
            <p class="contact-phone">0161 528 9460</p>
          </div>
        </div>
        
        <div class="footer-column">
          <h3 class="footer-title">FREE UK SHIPPING</h3>
          <div class="shipping-info">
            <p class="shipping-text">
              Free shipping to the UK, Orders<br>
              before 3:30pm are dispatched the<br>
              same day.
            </p>
            
            <p class="shipping-details">
              All orders sent via Royal Mail Fully<br>
              Tracked 48 hour (1-2 Days). Email and<br>
              SMS Text updates.
            </p>
          </div>
        </div>
        
        <div class="footer-column">
          <h3 class="footer-title">GUARANTEE</h3>
          <p class="guarantee-text">
            We are confident you will love your<br>
            purchase, however if you decide to<br>
            return it back to us within 30 days,<br>
            we will refund you 100% of the<br>
            purchase amount.
          </p>
        </div>
        
        <div class="footer-column">
          <h3 class="footer-title">SECURE PAYMENT</h3>
          <p class="payment-text">
            Encrypted secure payment powered<br>
            by Stripe. Money back guarantee (30<br>
            days) if you are not satisfied with<br>
            Your order. Credit & Debit card<br>
            payments by
          </p>
        </div>
      </div>

      <div class="footer-middle">
        <div class="social-links">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Tik Tok</a>
          <a href="#">Pinterest</a>
          <a href="#">Spotlight Blog</a>
          <a href="#">Discounts</a>
        </div>
        
        <div class="payment-icons">
          <img src="/images/payments.png" alt="Payment Methods" class="payments-image" />
        </div>
      </div>

      <div class="footer-bottom">
        <div class="copyright">
          <p>COPYRIGHT PICTURE THE STARS © 2024 ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer-section {
  background-color: #25282D;
  color: #ffffff;
  padding: 60px 0 0 0;
}

.container {
  max-width: 100%;
  margin: 0;
  padding: 0 60px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 60px;
  margin-bottom: 40px;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-column:first-child {
  margin-top: -20px;
}

.footer-logo {
  max-width: 200px;
  margin-bottom: 20px;
}

.company-description {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #a0a3a8;
  margin: 0;
}

.footer-title {
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  font-size: 17px;
  line-height: 130%;
  color: #ffffff;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.premium-title {
  margin-top: 30px;
}

.payment-title {
  margin-top: 30px;
}

.footer-links {
  list-style: none;
  font-family: 'Lato', sans-serif;
  font-size: 17px;
  line-height: 135%;
  letter-spacing: 0.5px;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #a0a3a8;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #ffffff;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-hours,
.contact-address,
.contact-email,
.contact-phone {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 135%;
  color: #a0a3a8;
  margin: 0;
}

.shipping-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.shipping-text,
.shipping-details {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #a0a3a8;
  margin: 0;
}

.guarantee-text,
.payment-text {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.5px;
  line-height: 135%;
  color: #a0a3a8;
  margin: 0;
}

.footer-middle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 60px 60px 40px 60px;
  margin: 0 -60px;
}

.social-links {
  display: flex;
  gap: 30px;
  align-items: center;
  margin-top: 10px;
}

.social-links a {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 125%;
  color: #a0a3a8;
  text-decoration: none;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: #ffffff;
}

.payment-icons {
  display: flex;
  align-items: center;
}

.payments-image {
  width: 400px;
  height: 60px;
  object-fit: contain;
}

.footer-bottom {
  background-color: #3a434a;
  border-top: 1px solid #3a434a;
  padding: 20px 0;
  margin: 0 -60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.copyright {
  text-align: center;
}

.copyright p {
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 12%;
  font-size: 12px;
  color: #ffffff;
  margin: 0;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
  }
  
  .footer-middle {
    flex-direction: column;
    gap: 20px;
    text-align: center;
    padding: 30px 20px;
  }
  
  .payments-image {
    width: 300px;
    height: 50px;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  
  .social-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  
  .payments-image {
    width: 250px;
    height: 40px;
  }
}

.desktop-only {
  display: block;
}

.mobile-only {
  display: none;
}

@media (min-width: 769px) {
  .mobile-only {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    display: none;
  }
  
  .mobile-only {
    display: block;
  }
  
  .footer-mobile {
    padding: 20px 0;
  }
  
  .mobile-logo-section {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .mobile-footer-logo {
    max-width: 180px;
    margin: 0 auto 20px auto;
    display: block;
  }
  
  .mobile-company-description {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 135%;
    color: #a0a3a8;
    margin: 0;
  }
  
  .mobile-sections {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  
  .mobile-section {
    text-align: center;
  }
  
  .mobile-footer-title {
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: #ffffff;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .mobile-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .mobile-links a {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #a0a3a8;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .mobile-links a:hover {
    color: #ffffff;
  }
  
  .mobile-contact,
  .mobile-shipping,
  .mobile-guarantee,
  .mobile-payment {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .mobile-contact p,
  .mobile-shipping p,
  .mobile-guarantee p,
  .mobile-payment p {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #a0a3a8;
    margin: 0;
  }
  
  .footer-middle {
    flex-direction: column;
    gap: 30px;
    text-align: center;
    padding: 40px 20px;
    margin: 0 -20px;
  }
  
  .social-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    justify-items: center;
    margin-top: 0;
  }
  
  .payment-icons {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  
  .payments-image {
    width: 100%;
    max-width: 350px;
    height: auto;
  }
  
  .footer-bottom {
    margin: 0 -20px;
    padding: 20px 20px;
  }
  
  .container {
    padding: 0 20px;
  }
}
</style>