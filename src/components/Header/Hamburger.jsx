function Hamburger({ menuShowing, handleHamburger }) {
  return (
    <button
      className="z-40 flex h-8 w-8 flex-col items-center justify-between bg-none lg:hidden"
      onClick={handleHamburger}
    >
      {/* Line 1 */}
      <span
        className={`bg-foreground block h-1 w-10 rounded transition-all duration-300 ${
          menuShowing ? "bg-primary translate-y-[10px] rotate-45" : ""
        }`}
      />
      {/* Line 2 */}
      <span
        className={`bg-foreground block h-1 w-10 rounded transition-all duration-300 ${
          menuShowing ? "opacity-0" : ""
        }`}
      />
      {/* Line 3 */}
      <span
        className={`bg-foreground block h-1 w-10 rounded transition-all duration-300 ${
          menuShowing ? "bg-primary -translate-y-[18px] -rotate-45" : ""
        }`}
      />
    </button>
  );
}

export default Hamburger;
