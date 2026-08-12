import NavbarMainBar from './NavbarMainBar';
import NavbarUtilityBar from './NavbarUtilityBar';

export default function Navbar() {
  return (
    <header className="bg-white w-full">
      <NavbarUtilityBar />
      <NavbarMainBar />
    </header>
  );
}
