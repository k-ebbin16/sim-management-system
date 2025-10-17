function Logo({ width, height, fontSize, bgColor, iconColor }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg text-center bg-${bgColor} text-${iconColor} h-${height} w-${width}`}
    >
      <i className={`fa-solid fa-sim-card text-${fontSize}`}></i>
    </div>
  );
}

export default Logo;
