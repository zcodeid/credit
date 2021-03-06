import {
  IoIosHome,
  IoLogoUsd,
  IoIosCart,
  IoIosContact,
  IoIosPeople,
} from "react-icons/io";
import Home from "./pages/home/home";
import Customer from "./pages/customer/Customer";
import CustomerAdd from "./pages/customer/CustomerAdd";
import CustomerEdit from "./pages/customer/CustomerEdit";
import Cicilan from "./pages/cicilan/Cicilan";
import CicilanAdd from "./pages/cicilan/CicilanAdd";
import CicilanEdit from "./pages/cicilan/CicilanEdit";
import Penjualan from "./pages/penjualan/Penjualan";
import PenjualanAdd from "./pages/penjualan/PenjualanAdd";
import PenjualanEdit from "./pages/penjualan/PenjualanEdit";
import Account from "./pages/account/account";
import Forbidden from "./pages/others/Forbidden";
import ChangePassword from "./pages/account/ChangePassword";
import EditProfile from "./pages/account/EditProfile";
import Simulation from "./pages/simulation";

import ProductCategory from "./pages/productCategory/ProductCategory";
import ProductCategoryAdd from "./pages/productCategory/ProductCategoryAdd";

export default [
  { to: "/forbidden", public: true, component: Forbidden },
  { to: "/", public: true, exact: true, component: Simulation },
  {
    to: "/home",
    title: "Home",
    icon: IoIosHome,
    layer: 1,
    exact: true,
    public: true,
    component: Home,
  },
  {
    to: "/customer",
    title: "Customer",
    exact: true,
    icon: IoIosPeople,
    layer: 1,
    component: Customer,
  },
  {
    to: "/customer/add",
    component: CustomerAdd,
    exact: true,
  },
  {
    to: "/customer/edit/",
    component: CustomerEdit,
  },
  {
    to: "/cicilan",
    title: "Cicilan",
    exact: true,
    icon: IoLogoUsd,
    layer: 1,
    component: Cicilan,
  },
  {
    to: "/cicilan/add",
    component: CicilanAdd,
    exact: true,
  },
  {
    to: "/cicilan/edit",
    component: CicilanEdit,
    exact: true,
  },
  {
    to: "/penjualan",
    title: "Penjualan",
    exact: true,
    icon: IoIosCart,
    layer: 1,
    component: Penjualan,
  },
  {
    to: "/penjualan/add",
    component: PenjualanAdd,
    exact: true,
  },
  {
    to: "/penjualan/edit",
    component: PenjualanEdit,
    exact: true,
  },
  {
    to: "/account",
    title: "Account",
    icon: IoIosContact,
    layer: 1,
    exact: true,
    component: Account,
  },
  {
    to: "/account/edit-profile",
    component: EditProfile,
  },
  {
    to: "/account/change-password",
    component: ChangePassword,
  },
  {
    to: "/product-category",
    component: ProductCategory,
    exact: true
  },
  {
    to: "/product-category/add",
    component: ProductCategoryAdd,
    exact: true
  },
];
