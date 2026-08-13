import NavbarMainBar from './desktop/NavbarMainBar';
import NavbarUtilityBar from './desktop/NavbarUtilityBar';
import NavbarMobile from './mobile/NavbarMobile';

export default function Navbar() {
  return (
    <header className="w-full bg-white">
      <NavbarMobile />
      <div className="hidden xl:block">
        <NavbarUtilityBar />
        <NavbarMainBar />
      </div>
    </header>
  );
}
