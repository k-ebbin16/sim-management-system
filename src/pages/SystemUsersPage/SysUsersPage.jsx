import NavigationContainer from "../../components/Navigation/NavigationContainer";
import UserStatsGrid from "./UserStatsGrid";

function SysUsersPage({ navData }) {
  return (
    <div className="bg-background flex min-h-dvh w-full">
      {/* Navigation */}
      <NavigationContainer navData={navData} />

      {/* Content Section */}
      <main className="mt-[80px] min-h-dvh flex-1 p-8 lg:mt-0">
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
        <UserStatsGrid />

        {/* Users Table */}
        <section></section>
      </main>
    </div>
  );
}

export default SysUsersPage;
