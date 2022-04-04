import React from "react";

export default function Otp() {
  return (
    <center>
      <div className="container justify-content-center">
        <div className="container d-flex align-items-center justify-content-center text-center not-found-container">
          <div className="d-flex flex-column justify-content-between">
            <div className="card mt-3 p-5">
              <div className="logo mb-3">Virtual Market</div>
            </div>
            <div className="card two bg-white px-5 py-4 mb-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                />
                <label className="form-control-placeholder" for="name">
                  OTP Code <span className="color">*</span>
                </label>
              </div>

              <button className="btn btn-primary btn-block btn-lg mt-1 mb-2">
                <span>
                  Comfirm
                  <i className="fas fa-long-arrow-alt-right ml-2"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </center>
  );
}
