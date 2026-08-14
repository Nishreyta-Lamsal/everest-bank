import NavbarMainBar from './desktop/NavbarMainBar';
import NavbarUtilityBar from './desktop/NavbarUtilityBar';
import NavbarMobile from './mobile/NavbarMobile';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <NavbarMobile />
      <div className="hidden lg:block">
        <NavbarUtilityBar />
        <NavbarMainBar />
      </div>
    </header>
  );
}
