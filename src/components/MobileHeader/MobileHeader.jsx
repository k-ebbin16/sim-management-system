import Logo from "../Logo";
import { Spin as Hamburger } from "hamburger-react";

function MobileHeader({ hamburgerIsOpen, setHamburgerIsOpen }) {
  return (
    <div className="bg-sidebar text-sidebar-foreground fixed z-9999 flex w-full items-center justify-between px-6 py-4 lg:hidden">
      <Hamburger
        toggled={hamburgerIsOpen}
        direction="right"
        toggle={setHamburgerIsOpen}
        color="var(--sidebar-foreground)"
      />

      <div className="flex w-full items-center justify-end gap-4">
        <Logo
          width="10"
          height="10"
          fontSize="2xl"
          bgColor="accent"
          iconColor="primary"
        />
        <h1 className="text-accent text-xl">SimCard Manager</h1>
      </div>
    </div>
  );
}

export default MobileHeader;
