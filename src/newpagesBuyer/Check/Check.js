import React from "react";
import "./check.css";
import { FormControl } from "@material-ui/core";
import { RadioGroup } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Radio } from "@material-ui/core";

export default function Check() {
  return (
    <div className="container">
      <section className="shop checkout section">
        {/* <div className="container"> */}
          <div className="row">
            <div className="col-lg-8 col-12 column1">
              <div className="checkout-form">
                <h2>Make Your Checkout Here</h2>
                <p>Please provide your Details</p>
                {/* <!-- Form --> */}
                <form className="form" method="post" action="#">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Name<span>*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder=""
                          required="required"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Phone Number<span>*</span>
                        </label>
                        <input
                        type=""
                          name="number"
                          placeholder=""
                          required="required"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Address <span>*</span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          placeholder=""
                          required="required"
                        />
                      </div>
                    </div>
                  </div>
                </form>
                {/* <!--/ End Form --> */}
              </div>
            </div>

            <div className="col-lg-4 col-12 column2">
              <div className="order-details">
                {/* <!-- Order Widget --> */}
                <div className="single-widget">
                  <h2>CART TOTALS</h2>
                  <div className="content">
                    <ul>
                      <li>
                        Sub Total<span>Rs 180,000</span>
                      </li>
                      <li>
                        (+) Shipping<span>Rs 1000</span>
                      </li>
                      <li className="last">
                        Total<span>Rs 181,000</span>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <!--/ End Order Widget -->
							<!-- Order Widget --> */}
                <div className="single-widget">
                  <h2>Payments</h2>
                  <div className="content">
                    <div className="checkbox">
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="COD"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            value="COD"
                            control={<Radio />}
                            label="COD"
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Credit Card"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                </div>
                {/* <!--/ End Order Widget --> */}
                <div className="single-widget get-button">
                  <div className="content">
                    <div className="button">
                      <a href="#" className="btn">
                        proceed to checkout
                      </a>
                    </div>
                  </div>
                </div>
                {/* <!--/ End Button Widget --> */}
              </div>
            </div>
            </div>
            <br></br>
            <div className="col-lg-8 col-12 column1">
              <div className="checkout-form">
                <h2>Card Details</h2>
                <br></br>
                {/* <!-- Form --> */}
                <form className="form" method="post" action="#">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Card Holder Name<span>*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder=""
                          required="required"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Card Number<span>*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder=""
                          required="required"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          CVC<span>*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder=""
                          required="required"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Expiry Date<span>*</span>
                        </label>
                        <input
                          type=""
                          name="number"
                          placeholder=""
                          required="required"
                        />
                      </div>
                    </div>
                  </div>
                </form>
                {/* <!--/ End Form --> */}
              </div>
            </div>
          
        {/* </div> */}
      </section>
    </div>
  );
}
