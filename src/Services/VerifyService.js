/* eslint-disable no-useless-constructor */
import GenericService from "./GenericService";

import axios from "axios";

class VerifyService extends GenericService {
  constructor() {
    super();
  }
  verify = (token) => axios.patch("buyers/verifyEmail/", token);
}
let verifyService = new VerifyService();
export default verifyService;
