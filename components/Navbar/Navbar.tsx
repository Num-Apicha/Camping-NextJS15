import { DarkMode } from './DarkMode';
import DropdownListMenu from './DropdownListMenu';
import Logo from './Logo';
import Search from './Search';
import { Suspense } from 'react';

const Navbar = () => {
  return (
    <nav>
      <div className="container flex flex-col justify-between py-8 sm:flex-row sm:items-center gap-4">
        {/* Logo or brand name can go here */}
        <Logo />
        {/* Search */}
        <Suspense fallback={null}>
          <Search />
        </Suspense>
        {/*  DarkMode & Profile */}
        <div className="flex gap-4">
          <DarkMode />
          <DropdownListMenu />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
