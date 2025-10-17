function Card({ title, description }) {
  return (
    <div className="display border-border bg-card flex h-32 flex-col items-center justify-center gap-2 rounded-2xl border-2 shadow-lg transition-transform hover:scale-105">
      <h3 className="text-foreground text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground mx-auto w-4/5 text-center">
        {description}
      </p>
    </div>
  );
}

export default Card;
