import { INavbarProps } from '../../types';
import { useStore } from '../../utils/hooks/useStore';
import { NavItem } from './NavItem';

const Navbar = (props: INavbarProps) => {
    const { children } = props;
    const { state, toggleNavbar } = useStore();
    const {
        navbar: { visible },
    } = state;
    const toggleVisiblity = () => {
        toggleNavbar();
    };
    return (
        <div className="flex flex-col fixed w-full z-20">
            <nav
                className={`${
                    visible ? 'flex' : 'hidden'
                } flex-row  justify-between items-center bg-gray-900 w-full bg-opacity-50 px-4`}
            >
                {children}
            </nav>
            <div
                className="h-2 w-full bg-gradient-to-r from-yellow-400  via-red-500 to-pink-500 cursor-pointer"
                onClick={toggleVisiblity}
            />
        </div>
    );
};
export { Navbar, NavItem };
