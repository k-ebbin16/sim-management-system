import Card from "../../components/Card/Card";
import CardContent from "../../components/Card/CardContent";
import Input from "../../components/Input";
import Table from "../../components/Table/Table";
import TableBody from "../../components/Table/TableBody";
import TableCell from "../../components/Table/TableCell";
import TableHead from "../../components/Table/TableHead";
import TableHeader from "../../components/Table/TableHeader";
import TableRow from "../../components/Table/TableRow";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AllUsersTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    {
      id: 1,
      name: "Dr. Olumide Adebayo",
      email: "olumide.adebayo@admin.edu",
      role: "Super Admin",
      department: "Administration",
      status: "Active",
      lastLogin: "2 hours ago",
    },
    {
      id: 2,
      name: "Prof. Aisha Bello",
      email: "aisha.bello@admin.edu",
      role: "Admin",
      department: "Computer Engineering",
      status: "Active",
      lastLogin: "1 day ago",
    },
    {
      id: 3,
      name: "Mr. Emeka Obi",
      email: "emeka.obi@admin.edu",
      role: "Manager",
      department: "Student Affairs",
      status: "Active",
      lastLogin: "3 hours ago",
    },
    {
      id: 4,
      name: "Mrs. Yetunde Ogundipe",
      email: "yetunde.o@admin.edu",
      role: "Manager",
      department: "Registrar's Office",
      status: "Active",
      lastLogin: "5 hours ago",
    },
    {
      id: 5,
      name: "Dr. Ibrahim Suleiman",
      email: "ibrahim.s@admin.edu",
      role: "Admin",
      department: "Electrical Engineering",
      status: "Active",
      lastLogin: "2 days ago",
    },
    {
      id: 6,
      name: "Ms. Grace Nwosu",
      email: "grace.nwosu@admin.edu",
      role: "Staff",
      department: "IT Support",
      status: "Inactive",
      lastLogin: "1 week ago",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Super Admin":
        return "bg-accent text-accent-foreground hover:bg-accent";
      case "Admin":
        return "bg-primary hover:bg-primary";
      case "Manager":
        return "bg-primary/70 hover:bg-primary/70";
      default:
        return "";
    }
  };

  const navigate = useNavigate();
  return (
    <section>
      <Card>
        {/* Header */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-2 text-xl font-semibold">All Users</h3>
              <p className="text-muted-foreground text-sm md:text-base">
                View and manage system administrators
              </p>
            </div>
            <button
              className="bg-primary hover:bg-primary/90 h-9 rounded-md px-4 py-2 sm:h-8 lg:h-10"
              onClick={() => navigate("/add-user")}
            >
              <i className="fa-solid fa-user-plus mr-2 text-xl"></i>
              Add New User
            </button>
          </div>
        </div>

        {/* Table Container*/}
        <CardContent className="flex-col">
          {/* Search Box */}
          <div className="mb-8 w-full">
            <div className="relative w-full">
              <Input
                placeholder="Search users by name, email, or role..."
                className="w-full pl-10"
                icon="fa-solid fa-magnifying-glass"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div>
                          <span className="bg-primary/10 text-primary h-10 w-10 rounded-full">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>

                        {/* Username */}
                        <div>
                          <p>{user.name}</p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Email */}
                    <TableCell className="text-muted-foreground">
                      {user.email}
                    </TableCell>

                    {/* Role */}
                    <TableCell>
                      <button className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </button>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <div className="bg-primary text-primary-foreground [a&]:hover:bg-primary/90 inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow]">
                        {user.status}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <button>
                          <i className="fa-solid fa-pen-to-square text-base"></i>
                        </button>
                        <button className="text-destructive hover:text-destructive">
                          <i class="fa-solid fa-trash text-base"></i>
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredUsers.length === 0 && (
            <div className="text-muted-foreground py-12 text-center">
              No users found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

export default AllUsersTable;
