import GenericService from "./GenericService";

class CategoryService extends GenericService {
  constructor() {
    super();
  }

  GetCategories = () =>
    new Promise((resolve, reject) => {
      this.get("categories/getAll")
        .then((data) => {
          console.log("Category Get");
          console.log(data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
}
let categoryService = new CategoryService();
export default categoryService;
