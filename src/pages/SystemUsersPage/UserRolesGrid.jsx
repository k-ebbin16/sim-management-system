import { useContext, useEffect } from "react";

import Card from "../../components/Card/Card";
import CardContent from "../../components/Card/CardContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RolesDataContext from "../../context/RolesDataContext";
import { cn } from "../../utils/util";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { NavLink } from "react-router-dom";

library.add(fas, far, fab);

function UserRolesGrid() {
  const { getRoles, roles } = useContext(RolesDataContext);

  const getRolesData = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const result = await getRoles();
    } catch (err) {
      console.error("Error in getRolesData:", err);
    }
  };

  useEffect(() => {
    getRolesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
      {roles.map((role) => (
        <NavLink key={role.id} to={`/roles/permissions/${role.id}`}>
          <Card
            
            className="hover:border-primary/50 cursor-pointer border-2 transition-shadow hover:shadow-md"
          >
              <div className="pb-3">
                <div className="mb-4 flex items-start justify-between">
                  <FontAwesomeIcon
                    icon="fa-solid fa-shield"
                    className={cn(
                      "text-primary/30 h-8 w-8 text-3xl",
                      role.name === "SuperAdmin" ? "text-accent/30" : "",
                    )}
                  />
                  <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                </div>
                <p className="text-lg">{role.name}</p>
                <p className="text-muted-foreground text-sm">
                  {role.description}
                </p>
              </div>
          </Card>
        </NavLink>
      ))}
    </section>
  );
}

export default UserRolesGrid;
