/* eslint-disable no-useless-constructor */
import GenericService from "./GenericService";

import axios from "axios";

class MessageService extends GenericService {
  constructor() {
    super();
  }
  sendMessage = (id, data) => axios.post("messages/sendText/" + id, data);
  getMessage = (id) => axios.get("messages/getbuyermessages/" + id);
}
let messageService = new MessageService();
export default messageService;
