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

library.add(fas, far, fab);

function UserStatsGrid() {
  const { getRoles, roles } = useContext(RolesDataContext);

  const getRolesData = async () => {
    try {
      const result = await getRoles();
    } catch (err) {
      console.error("Error in getRolesData:", err);
    }
  };

  useEffect(() => {
    getRolesData();
  }, []);

  return (
    <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
      {roles.map((role) => (
        <Card key={role.id}>
          <CardContent className="w-full p-0">
            <div className="flex w-full items-center justify-between">
              <div>
                <p className="text-muted-foreground text-base">{`${role.name}s`}</p>
                <p className="text-primary text-2xl">
                  {/* {role.totalNumberOfUsers} */}
                </p>
              </div>
              <FontAwesomeIcon
                icon="fa-solid fa-shield"
                className={cn(
                  "text-primary/30 h-8 w-8 text-3xl",
                  role.name === "SuperAdmin" ? "text-accent/30" : "",
                )}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

export default UserStatsGrid;
