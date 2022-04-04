import React from 'react'
import "./forgotpassword.css";

export default function ForgotPassword() {
  return (
    <center>
      <div className="container justify-content-center">
        <div className="container d-flex align-items-center justify-content-center text-center not-found-container">
          <div className="d-flex flex-column justify-content-between">
            <div className="card mt-3 p-5">
              <div className="logo mb-3">Virtual Market</div>
              {/* <div>
                <p className="mb-1">Future of </p>
                <h4 className="mb-5 text-white">WholeSale Market</h4>
            </div>  */}
              {/* <button className="btn btn-primary btn-lg">
                <small>Already signed up?</small>
                <span>&nbsp;Log in</span>{" "}
              </button> */}
            </div>
            <div className="card two bg-white px-5 py-4 mb-3">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="mail"
                  required
                />
                <label className="form-control-placeholder" for="mail">
                  New Password <span className="color">*</span>
                </label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                />
                <label className="form-control-placeholder" for="name">
                  Confirm Password <span className="color">*</span>
                </label>
              </div>

              <button className="btn btn-primary btn-block btn-lg mt-1 mb-2">
                <span>
                  GET OTP CODE
                  <i className="fas fa-long-arrow-alt-right ml-2"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </center>
  )
}
