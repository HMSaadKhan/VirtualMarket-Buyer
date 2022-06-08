/* eslint-disable no-useless-constructor */
import GenericService from "./GenericService";

import axios from "axios";

class WarrantyService extends GenericService {
  constructor() {
    super();
  }
  getWarranty = (status) => axios.get("warranties/getByBuyer/" + status);
  claimWarranty = (_id, data) => axios.patch("warranties/request/" + _id, data);
}
let warrantyService = new WarrantyService();
export default warrantyService;
