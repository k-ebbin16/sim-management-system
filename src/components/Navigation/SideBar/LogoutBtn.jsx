import AuthContext from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useContext } from "react";

library.add(fas, far, fab);

function LogoutBtn({ setUserProfile }) {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setUserProfile([]);
  };

  return (
    <div
      className="hover:bg-sidebar-accent/50 text-sidebar-foreground transition-background mt-3 flex items-center gap-6 rounded-md px-4 py-6 text-xl font-medium transition duration-400"
      onClick={handleLogout}
    >
      <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
      <button className="w-full text-left">Logout</button>
    </div>
  );
}

export default LogoutBtn;
