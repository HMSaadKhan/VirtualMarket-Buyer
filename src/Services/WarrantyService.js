import GenericService from "./GenericService";

import axios from "axios";

class WarrantyService extends GenericService {
  constructor() {
    super();
  }
  getWarranty = () => axios.get("warranties/getByBuyer/");
}
let warrantyService = new WarrantyService();
export default warrantyService;
