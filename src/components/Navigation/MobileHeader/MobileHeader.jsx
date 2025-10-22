import { Spin as Hamburger } from "hamburger-react";
import Logo from "../../Logo";

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
          className="bg-accent text-primary h-10 w-10 text-2xl"
          textSize="text-xl"
        />
      </div>
    </div>
  );
}

export default MobileHeader;
