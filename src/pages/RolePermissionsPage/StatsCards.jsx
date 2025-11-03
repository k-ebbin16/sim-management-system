import Card from "../../components/Card/Card";
import CardContent from "../../components/Card/CardContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StatsCards({
  totalPermissions,
  enabledPermissions,
  disabledPermissions,
}) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
      <Card className="sm:min-w-0">
        <CardContent className="h-full w-full p-3 sm:p-4">
          <div className="flex w-full items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Total Permissions
              </p>
              <p className="text-primary text-lg sm:text-xl lg:text-2xl">
                {totalPermissions}
              </p>
            </div>
            <FontAwesomeIcon
              icon="fa-solid fa-lock"
              className="text-primary/30 h-6 w-6 sm:h-8 sm:w-8"
            />
          </div>
        </CardContent>
      </Card>
      <Card className="sm:min-w-0">
        <CardContent className="h-full w-full p-3 sm:p-4">
          <div className="flex w-full items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Enabled
              </p>
              <p className="text-primary text-lg sm:text-xl lg:text-2xl">
                {enabledPermissions}
              </p>
            </div>
            <FontAwesomeIcon
              icon="fa-solid fa-shield"
              className="text-primary/30 h-6 w-6 sm:h-8 sm:w-8"
            />
          </div>
        </CardContent>
      </Card>
      <Card className="sm:min-w-0">
        <CardContent className="h-full w-full p-3 sm:p-4">
          <div className="flex w-full items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Disabled
              </p>
              <p className="text-muted-foreground text-lg sm:text-xl lg:text-2xl">
                {disabledPermissions}
              </p>
            </div>
            <FontAwesomeIcon
              icon="fa-solid fa-shield"
              className="text-muted-foreground/30 h-6 w-6 sm:h-8 sm:w-8"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StatsCards;
