import Logo from "./Logo";
import NavItems from "./nav-items";
import ThemeChanger from "./ThemeChanger";
import UserInfo from "./UserInfo";

const Navbar = () => {
  return (
    <>
      <nav className='hidden md:block border-b border-border'>
        <div className='max-w-7xl mx-auto py-5 flex gap-3 items-center justify-between'>
          <Logo />
          <NavItems />
          <div className='flex gap-6'>
            <ThemeChanger />
            <UserInfo />
          </div>
        </div>
      </nav>

      <nav className='md:hidden border-b border-border'>
        <div className='max-w-7xl mx-auto py-5 flex gap-3 items-center justify-between'>
          <NavItems />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
