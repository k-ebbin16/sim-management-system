function Card({ title, description }) {
  return (
    <div className="display flex h-32 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-blue-500 bg-blue-300 shadow-lg transition-transform hover:scale-105">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mx-auto w-4/5 text-center">{description}</p>
    </div>
  );
}

export default Card;
