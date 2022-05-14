import GenericService from "./GenericService";

import axios from "axios";

class WarrantyService extends GenericService {
  constructor() {
    super();
  }
  getWarranty = () => axios.get("warranties/getByBuyer/");
  claimWarranty = (_id, data) => axios.patch("warranties/request/" + _id, data);
}
let warrantyService = new WarrantyService();
export default warrantyService;
