function StatsGrid({ stats }) {
  return (
    <section className="mb-8 grid grid-cols-1 gap-6 max-[1440px]:grid-cols-2 max-lg:grid-cols-2 max-sm:grid-cols-1 min-[1440px]:grid-cols-4">
      {stats.map((stat, index) => {
        return (
          <div
            key={index}
            className="border-border bg-card flex w-full flex-col rounded-2xl border-2 p-8"
          >
            <div className="flex flex-row items-center justify-between pb-8">
              <div className="text-muted-foreground text-lg font-medium ">
                {stat.title}
              </div>
              <i className={`h-5 w-5 ${stat.color} ${stat.icon}`} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-primary text-3xl">{stat.value}</p>
              <p className="text-muted-foreground mt-1 text-xs">
                {stat.description}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default StatsGrid;
