import { Suspense, lazy } from "react";

import PulseLoading from "../../components/Loading/PulseLoading";

const AllUsersTable = lazy(() => import("./AllUsersTable"));
const UserRolesGrid = lazy(() => import("./UserRolesGrid"));

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

      <Suspense fallback={<PulseLoading />}>
        <UserRolesGrid />
      </Suspense>

      {/* Users Table */}

      <AllUsersTable />
    </main>
  );
}

export default SysUsersPage;
