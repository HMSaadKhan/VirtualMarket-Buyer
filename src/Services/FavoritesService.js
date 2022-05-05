import GenericService from "./GenericService";

import axios from "axios";

class FavoriteService extends GenericService {
  constructor() {
    super();
  }

  AddtoFavorite = (_id) => axios.post("favourites/add", _id);
  GetFavorites = () => axios.get("favourites/getProducts/");
  DeletefromFavorite = (_id) => axios.delete("favourites/removeProduct/" + _id);
}
let favoriteService = new FavoriteService();
export default favoriteService;
