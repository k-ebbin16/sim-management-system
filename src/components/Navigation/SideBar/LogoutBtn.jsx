import AuthContext from "../../../context/AuthContext";
import { useContext } from "react";

function LogoutBtn() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className="hover:bg-sidebar-accent/50 text-sidebar-foreground transition-background mt-3 flex items-center gap-6 rounded-md px-4 py-6 text-xl font-medium transition duration-400"
      onClick={handleLogout}
    >
      <i className="fa-solid fa-right-from-bracket"></i>
      <button className="w-full text-left">Logout</button>
    </div>
  );
}

export default LogoutBtn;
