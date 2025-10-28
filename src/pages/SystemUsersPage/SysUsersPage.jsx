import NavigationContainer from "../../components/Navigation/NavigationContainer";
import AllUsersTable from "./AllUsersTable";
import UserStatsGrid from "./UserStatsGrid";
import RolesDataProvider from "../../context/providers/RolesDataContextProvider";
import UserDataProvider from "../../context/providers/UsersDataContextProvider";

function SysUsersPage() {
  return (
    <main className="bg-background min-h-dvh w-full flex-1 p-6 pt-[80px] lg:w-3/5 lg:pt-6">
      {/* Hero Section */}
      <section className="relative mb-6">
        <h1 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
          System Users
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-base md:text-lg lg:text-xl">
          Manage administrative users and their permissions
        </p>
      </section>

      {/* Users Stats Grid */}
      <RolesDataProvider>
        <UserStatsGrid />
      </RolesDataProvider>

      {/* Users Table */}
      <UserDataProvider>
        <AllUsersTable />
      </UserDataProvider>
    </main>
  );
}

export default SysUsersPage;
