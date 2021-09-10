import { ReactNode } from "react";
import { useStore } from "../../utils/hooks/useStore";
import { NavItem } from "./NavItem";

type INavbarProps = {
  children: ReactNode;
};
const Navbar = (props: INavbarProps) => {
  const { children } = props;
  const { state, dispatch } = useStore();
  const {
    navbar: { visible },
  } = state;
  const toggleVisiblity = () => {
    dispatch({ type: "TOGGLE_NAVBAR" });
  };
  return (
    <div className='flex flex-col fixed w-full z-20'>
      <nav
        className={`${
          visible ? "flex" : "hidden"
        } flex-row  justify-between items-center bg-gray-900 w-full bg-opacity-50 px-4`}
      >
        {children}
      </nav>
      <div
        className='h-2 w-full bg-gradient-to-r from-yellow-400  via-red-500 to-pink-500 cursor-pointer'
        onClick={toggleVisiblity}
      ></div>
    </div>
  );
};
export { Navbar, NavItem };
