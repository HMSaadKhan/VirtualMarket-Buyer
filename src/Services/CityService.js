import GenericService from "./GenericService";

class CityService extends GenericService {
  constructor() {
    super();
  }

  GetCities = () =>
    new Promise((resolve, reject) => {
      this.get("cities/getAll")
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
}
let cityService = new CityService();
export default cityService;
