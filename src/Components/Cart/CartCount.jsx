import React, { useEffect } from "react";
import useState from "react-usestateref";
import cartService from "../../Services/CartServices";

const GetCartCount = () => {
  const [count, setCount, countRef] = useState(0);
  const getCount = () => {
    cartService.getQty().then((data) => {
      console.log(data.data.count);
      setCount(data.data.count);
    });
  };
  useEffect(getCount, []);

  return count;
};
export { GetCartCount };
