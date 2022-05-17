import React from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  PaymentElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import cartService from "../../Services/CartServices";

const CardDetails = ({ name, address, phone, city }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [Id, setId] = React.useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    const { id } = paymentMethod;
    setId(id);
  };
  const paymentProceed = async () => {
    console.log(Id);
    await cartService
      .OnlinePayment({ id: Id, name, address, phone, city })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardNumberElement />
      <CardExpiryElement />
      <CardCvcElement />

      <button
        type="submit"
        disabled={!stripe || !elements}
        onClick={paymentProceed}
      >
        Pay
      </button>
    </form>
  );
};
export default CardDetails;
