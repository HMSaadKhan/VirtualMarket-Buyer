import GenericService from "./GenericService";
class ProductsService extends GenericService {
  constructor() {
    super();
  }
  getProducts = () => this.get("products/all");
  getProductDetails = (_id) =>
    new Promise((resolve, reject) => {
      this.get("products/details/" + _id)
        .then((data) => {
          console.log("get Name");
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
}

let productService = new ProductsService();
export default productService;