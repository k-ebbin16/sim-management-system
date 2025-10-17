function Logo({ width, height, fontSize, bgColor, iconColor }) {
  return (
    <div
      className={`bg-${bgColor} flex h-${height} w-${width} items-center justify-center rounded-lg`}
    >
      <i
        className={`text-${iconColor} fa-solid fa-sim-card text-center text-${fontSize}`}
      ></i>
    </div>
  );
}

export default Logo;
