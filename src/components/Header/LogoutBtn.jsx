import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.js";
import { logout } from "../../store/authSlice.js";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logouthandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button onClick={logouthandler} className="inline-block px-6 py-2 duration-150 hover:bg-blue-500 rounded-full">
      Logout
    </button>
  );
}

export default LogoutBtn;
