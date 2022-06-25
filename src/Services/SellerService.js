/* eslint-disable no-useless-constructor */
import GenericService from "./GenericService";

import axios from "axios";

class SellerService extends GenericService {
  constructor() {
    super();
  }
  sellerDetails = (id) => axios.get("sellers/getstoredetails/" + id);
}
let sellerService = new SellerService();
export default sellerService;
