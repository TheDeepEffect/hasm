import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom"
import { Logo } from "../Logo"
import { FaUserAstronaut } from "react-icons/fa"
import { routesConfig } from "../../config/routesConfig";
import { Username } from "../Username";

export const Navbar = () => {
    const { path } = useRouteMatch();
    const [isShowNavbar, setIsShowNavbar] = useState<boolean>(true);

    if (path === routesConfig.profile.path) {
        return (
            <div className="flex flex-col fixed w-full z-20">
                <nav
                    className={`${isShowNavbar ? "flex" : "hidden"}  justify-between items-center bg-gray-900 w-full bg-opacity-50 px-4`}
                >
                    <Link to="/">
                        <Logo />
                    </Link>
                    <Link to="/user">
                        <Username />
                    </Link>
                </nav>
                <div className="h-2 w-full bg-gradient-to-r from-yellow-400  via-red-500 to-pink-500 cursor-pointer"
                    onClick={() => { setIsShowNavbar((state) => !state) }}
                ></div>
            </div>
        )
    }

    return <div className="flex flex-col fixed w-full z-20">
        <nav
            className={`${isShowNavbar ? "flex" : "hidden"} lex-row  justify-between items-center bg-gray-900 w-full bg-opacity-50 px-4`}
        >
            <Link to="/">
                <Logo />
            </Link>
            <div>
                <Link to="/user">
                    <FaUserAstronaut
                        size={32}
                    />
                </Link>
            </div>
        </nav>
        <div className="h-2 w-full bg-gradient-to-r from-yellow-400  via-red-500 to-pink-500 cursor-pointer"
            onClick={() => { setIsShowNavbar((state) => !state) }}
        ></div>
    </div>
}