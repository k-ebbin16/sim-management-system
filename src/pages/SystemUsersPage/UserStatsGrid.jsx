import Card from "../../components/Card/Card";
import CardContent from "../../components/Card/CardContent";

function UserStatsGrid() {
  const userRoles = [
    {
      roleName: "Distributor",
      roleDescription: "Distributor Role.",
      totalNumberOfUsers: 6,
    },
    {
      roleName: "Administrator",
      roleDescription: "Administrator Role.",
      totalNumberOfUsers: 1,
    },
    {
      roleName: "SuperAdmin",
      roleDescription: "SuperAdmin Role.",
      totalNumberOfUsers: 2,
    },
    {
      roleName: "TelecelAdministrator",
      roleDescription: "TelecelAdministrator Role.",
      totalNumberOfUsers: 5,
    },
  ];
  return (
    <section className="mb-8 grid grid-cols-1 gap-6 max-[1440px]:grid-cols-2 max-lg:grid-cols-2 max-sm:grid-cols-1 min-[1440px]:grid-cols-4">
      {userRoles.map((role, index) => (
        <Card
          key={index}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Users</p>
                <p className="text-primary text-2xl">
                  {role.totalNumberOfUsers}
                </p>
              </div>
              <i className="fa-solid fa-shield text-primary/30 h-8 w-8"></i>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

export default UserStatsGrid;
