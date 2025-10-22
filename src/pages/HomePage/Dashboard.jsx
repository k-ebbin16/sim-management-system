import RecentRecords from "./RecentRecords";
import StatsGrid from "./StatsGrid";

function Dashboard() {
  return (
    <main className="mt-[80px] min-h-dvh flex-1 p-6 lg:mt-0">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground relative mb-8 overflow-hidden rounded-lg">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://cdn.pyclubs.org/website-storage/club/Umat.jpeg"
            alt="Campus"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative p-8">
          <h1 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
            Welcome to SimCard Management System
          </h1>
          <p className="mt-2 max-w-2xl text-base md:text-lg lg:text-xl">
            Efficiently manage student mobile SIM card assignments and track
            distribution across all departments.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <StatsGrid />

      {/* Recent Activities */}
      <RecentRecords />
    </main>
  );
}

export default Dashboard;
