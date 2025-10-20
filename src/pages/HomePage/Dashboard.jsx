import RecentRecords from "./RecentRecords";
import StatsGrid from "./StatsGrid";

function Dashboard() {
  const stats = [
    {
      title: "Total Students",
      icon: "fa-solid fa-users",
      color: "text-primary",
      value: 1247,
      description: "Active student records",
    },
    {
      title: "SIM Cards Issued",
      icon: "fa-solid fa-circle-check",
      color: "text-accent",
      value: 892,
      description: "Currently assigned",
    },
    {
      title: "Available SIMs",
      icon: "fa-solid fa-sim-card",
      color: "text-primary",
      value: 355,
      description: "Ready for assignment",
    },
    {
      title: "Pending Requests",
      icon: "fa-solid fa-circle-exclamation",
      color: "text-accent",
      value: 23,
      description: "Awaiting processing",
    },
  ];

  const recentStudents = [
    {
      id: "STU001",
      name: "Amara Okafor",
      department: "Computer Engineering",
      status: "Active",
      simCard: "SIM-2023-001",
    },
    {
      id: "STU002",
      name: "Chinedu Eze",
      department: "Electrical Engineering",
      status: "Active",
      simCard: "SIM-2023-002",
    },
    {
      id: "STU003",
      name: "Ngozi Adewale",
      department: "Mechanical Engineering",
      status: "Pending",
      simCard: "-",
    },
    {
      id: "STU004",
      name: "Oluwaseun Balogun",
      department: "Civil Engineering",
      status: "Active",
      simCard: "SIM-2023-003",
    },
    {
      id: "STU005",
      name: "Fatima Hassan",
      department: "Chemical Engineering",
      status: "Active",
      simCard: "SIM-2023-004",
    },
  ];
  return (
    <main className="min-h-screen flex-1 p-6">
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
      <StatsGrid stats={stats} />

      {/* Recent Activities */}
      <RecentRecords recentStudents={recentStudents} />
    </main>
  );
}

export default Dashboard;
