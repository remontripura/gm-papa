export const dynamic = "force-dynamic";

import Cookies from "js-cookie";

export const handleLogout = () => {
  Cookies.remove("GM_T");
  localStorage.removeItem("purchase-storage");
  localStorage.removeItem("user-storage");
  localStorage.removeItem("purchase-storage");
  window.location.href = "/";
};
