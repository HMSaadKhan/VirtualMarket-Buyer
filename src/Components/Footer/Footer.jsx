import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <div className="Footer">
      <footer className="footer-distributed">
        <div className="footer-left">
          <h3>
            <span className="logo">
              Virtual<span className="logoinner">Market</span>
            </span>
          </h3>

          <p className="footer-company-name">© 2022 Virtual Market Pvt. Ltd.</p>
        </div>

        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              230, Cavalry Ground
              <br></br>
              Lahore Cantt - 54810
            </p>
          </div>

          <div>
            <i className="fa fa-phone"></i>
            <p>+92 37865432</p>
          </div>
          <div>
            <i className="fa fa-envelope"></i>
            <p>
              <a href="mailto:support@eduonix.com">support@virtualmarket.com</a>
            </p>
          </div>
        </div>
        <div className="footer-right">
          <p className="footer-company-about">
            <span>About the company</span>
            We offer best products and wholesale dealers across Pakistan.
          </p>
          <div className="footer-icons">
            <a href="#">
              <i className=""></i>
            </a>
            <a href="#">
              <i className=""></i>
            </a>
            <a href="#">
              <i className=""></i>
            </a>
            <a href="#">
              <i className=""></i>
            </a>
            <a href="#">
              <i className=""></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
