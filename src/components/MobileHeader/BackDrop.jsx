function BackDrop({ hamburgerIsOpen, setHamburgerIsOpen }) {
  return (
    <div
      className={`bg-accent/20 fixed top-0 left-0 z-10 min-h-dvh w-screen transition duration-300 ${hamburgerIsOpen ? "opacity-100 backdrop-blur-xs" : "opacity-0 backdrop-blur-none"}`}
      onClick={() => {
        setHamburgerIsOpen(false);
      }}
    ></div>
  );
}

export default BackDrop;
