import {
  IoIosHome,
  IoLogoUsd,
  IoIosCart,
  IoIosContact,
  IoIosPeople,
} from "react-icons/io";
import Login from "./pages/auth/login";
import Home from "./pages/home/home";
// import Transaction from "./pages/transaction/transaction";

// fakhrul
import Customer from "./pages/customer/Customer";
import CustomerAdd from "./pages/customer/CustomerAdd";
import CustomerEdit from "./pages/customer/CustomerEdit";
import Cicilan from "./pages/cicilan/Cicilan";
import CicilanAdd from "./pages/cicilan/CicilanAdd";
import CicilanEdit from "./pages/cicilan/CicilanEdit";
import Penjualan from "./pages/penjualan/Penjualan";
import PenjualanAdd from "./pages/penjualan/PenjualanAdd";
import PenjualanEdit from "./pages/penjualan/PenjualanEdit";

// import TransactionAdd from "./pages/transaction/transactionAdd";
// import TransactionEdit from "./pages/transaction/transactionEdit";
import Account from "./pages/account/account";
// import Wallet from "./pages/wallet/Wallet";
// import Cash from "./pages/cash/cash";
// import CashAdd from "./pages/cash/CashAdd";
// import CashEdit from "./pages/cash/CashEdit";
// import WalletAdd from "./pages/wallet/walletAdd";
// import WalletEdit from "./pages/wallet/walletEdit";
// import WalletSearch from "./pages/wallet/WalletSearch";
import Register from "./pages/auth/register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Forbidden from "./pages/others/Forbidden";
import ChangePassword from "./pages/account/ChangePassword";
import EditProfile from "./pages/account/EditProfile";
// import TransactionSearch from "./pages/transaction/TransactionSearch";

export default [
  { to: "/login", public: true, component: Login },
  { to: "/register", public: true, component: Register },
  { to: "/forgot-password", public: true, component: ForgotPassword },
  { to: "/forbidden", public: true, component: Forbidden },
  {
    to: "/",
    title: "Home",
    icon: IoIosHome,
    layer: 1,
    exact: true,
    public: true,
    component: Home,
  },
  // {
  //   to: "/transaction",
  //   title: "Transaction",
  //   exact: true,
  //   icon: IoIosCart,
  //   layer: 1,
  //   component: Transaction,
  // },
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
  // {
  //   to: "/transaction-search",
  //   title: "Transaction Search",
  //   exact: true,
  //   component: TransactionSearch,
  // },
  // {
  //   to: "/transaction/add",
  //   component: TransactionAdd,
  //   exact: true,
  // },
  // {
  //   to: "/transaction/edit/:id",
  //   component: TransactionEdit,
  // },
  // {
  //   to: "/wallet",
  //   title: "Wallet",
  //   icon: IoIosWallet,
  //   exact: true,
  //   layer: 1,
  //   component: Wallet,
  // },
  // {
  //   to: "/wallet/add",
  //   component: WalletAdd,
  // },
  // {
  //   to: "/wallet/edit",
  //   component: WalletEdit,
  // },
  // {
  //   to: "/wallet/search/:current/:key/:all",
  //   component: WalletSearch,
  // },
  // {
  //   to: "/cash",
  //   title: "Cash",
  //   exact: true,
  //   icon: IoIosPulse,
  //   layer: 1,
  //   component: Cash,
  // },
  // {
  //   to: "/cash/add",
  //   component: CashAdd,
  // },
  // {
  //   to: "/cash/edit/:id/:name/:amount",
  //   component: CashEdit,
  // },
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
];
