import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <div className="Footer">
      <footer class="footer-distributed">
        <div class="footer-left">
          <h3>
            <span className="logo">
              Virtual<span className="logoinner">Market</span>
            </span>
          </h3>

          <p class="footer-company-name">© 2022 Virtual Market Pvt. Ltd.</p>
        </div>

        <div class="footer-center">
          <div>
            <i class="fa fa-map-marker"></i>
            <p>
              230, Cavalry Ground
              <br></br>
              Lahore Cantt - 54810
            </p>
          </div>

          <div>
            <i class="fa fa-phone"></i>
            <p>+92 37865432</p>
          </div>
          <div>
            <i class="fa fa-envelope"></i>
            <p>
              <a href="mailto:support@eduonix.com">support@virtualmarket.com</a>
            </p>
          </div>
        </div>
        <div class="footer-right">
          <p class="footer-company-about">
            <span>About the company</span>
            We offer best products and wholesale dealers across Pakistan.
          </p>
          <div class="footer-icons">
            <a href="#">
              <i class=""></i>
            </a>
            <a href="#">
              <i class=""></i>
            </a>
            <a href="#">
              <i class=""></i>
            </a>
            <a href="#">
              <i class=""></i>
            </a>
            <a href="#">
              <i class=""></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
