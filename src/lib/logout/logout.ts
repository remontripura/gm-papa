import Cookies from "js-cookie";

export const handleLogout = () => {
  Cookies.remove("GM_T");
  localStorage.removeItem("purchase-storage");
  window.location.href = "/";
};
