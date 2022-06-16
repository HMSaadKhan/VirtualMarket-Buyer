/* eslint-disable no-useless-constructor */
import GenericService from "./GenericService";

import axios from "axios";

class BargainService extends GenericService {
  constructor() {
    super();
  }
  sendOffer = (data) => axios.post("offers/sendoffer/", data);
}
let bargainService = new BargainService();
export default bargainService;
