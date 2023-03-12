import {RestaurantAddress} from "./RestaurantAddress";
import {MenuItem} from "../MenuItem/MenuItem";

export  interface Restaurant{
  id:string
  name:string;
  image:string;
  address:RestaurantAddress;
  menuItems:MenuItem[];
}
