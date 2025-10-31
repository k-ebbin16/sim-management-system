import Card from "../../components/Card/Card";
import CardContent from "../../components/Card/CardContent";
import { cn } from "../../utils/util";

function StatsGrid() {
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
  return (
    <section className="mb-8 grid grid-cols-1 gap-6 max-[1440px]:grid-cols-2 max-lg:grid-cols-2 max-sm:grid-cols-1 min-[1440px]:grid-cols-4">
      {stats.map((stat, index) => {
        return (
          <Card key={index} className="p-8">
            <CardContent>
              <div className="text-muted-foreground text-lg font-medium">
                {stat.title}
              </div>
              <i className={cn("h-5 w-5", stat.color, stat.icon)} />
            </CardContent>
            <div className="flex flex-col gap-1">
              <p className="text-primary text-3xl">{stat.value}</p>
              <p className="text-muted-foreground mt-1 text-xs">
                {stat.description}
              </p>
            </div>
          </Card>
        );
      })}
    </section>
  );
}

export default StatsGrid;
