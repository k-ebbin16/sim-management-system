import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import CardContent from "../../components/Card/CardContent";
import Input from "../../components/Input";

function AllUsersTable() {
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
        <CardContent>
          {/* Search Box */}
          <div className="w-full">
            <div className="relative">
              <Input
                placeholder="Search users by name, email, or role..."
                className="pl-10"
                icon="fa-solid fa-magnifying-glass"
                type="text"
              />
            </div>
          </div>

          {/* Table */}
          
        </CardContent>
      </Card>
    </section>
  );
}

export default AllUsersTable;
