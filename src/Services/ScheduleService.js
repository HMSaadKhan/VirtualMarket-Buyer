import GenericService from "./GenericService";

import axios from "axios";

class ScheduleService extends GenericService {
  constructor() {
    super();
  }
  addscheduledOrder = (data) => axios.post("scheduledOrders/add/", data);
  getScheduledOrder = () => axios.get("scheduledOrders/getByBuyer/");
  deleteScheduledOrder = (_id) => axios.delete("scheduledOrders/del/" + _id);
  editScheduledOrder = (_id, data) =>
    axios.patch("scheduledOrders/edit/" + _id, data);
  getSingleScheduledOrder = (_id) =>
    axios.get("scheduledOrders/getSingleDetails/" + _id);
}
let scheduleService = new ScheduleService();
export default scheduleService;
