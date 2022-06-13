/* eslint-disable no-useless-constructor */
import GenericService from "./GenericService";

import axios from "axios";

class ChatService extends GenericService {
  constructor() {
    super();
  }
  chatInitiate = (data) => axios.post("chats/initiate/", data);
  getChats = () => axios.get("chats/getchats/");
}
let chatService = new ChatService();
export default chatService;
