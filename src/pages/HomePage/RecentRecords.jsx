function RecentRecords() {
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
    <section className="border-border bg-card flex w-full flex-col rounded-2xl border-2 p-8">
      <h3 className="mb-2 text-xl font-semibold">Recent Student Records</h3>
      <p>Latest student registrations and SIM card assignments</p>

      {/* Placeholder for recent activities table or list */}
      <div className="mt-8 flex w-full flex-col gap-4">
        {/* Recent activities content goes here */}
        {recentStudents.map((student) => {
          return (
            <div
              className="border-border hover:bg-muted/50 flex cursor-pointer flex-col justify-between gap-6 rounded-md border p-4 transition-colors md:flex-row md:items-center md:gap-0"
              key={student.id}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                    <span className="text-primary">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm">{student.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {student.id}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col-reverse text-right md:hidden md:flex-row">
                  <p className="text-sm">{student.simCard}</p>
                  <p className="text-muted-foreground text-xs">SIM Card</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-8">
                <div className="flex flex-col-reverse md:block md:text-right">
                  <p className="text-sm">{student.department}</p>
                  <p className="text-muted-foreground text-xs">Department</p>
                </div>
                <div className="hidden text-right md:block md:min-w-24">
                  <p className="text-sm">{student.simCard}</p>
                  <p className="text-muted-foreground text-xs">SIM Card</p>
                </div>
                <div className="w-20 text-right">
                  <span
                    className={`inline-block rounded px-2 py-1 text-xs ${
                      student.status === "Active"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent/50 text-accent-foreground"
                    }`}
                  >
                    {student.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RecentRecords;
