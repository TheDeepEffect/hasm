import { useState } from "react"
import { FaRegComment } from "react-icons/fa";
import { GiPunch } from "react-icons/gi"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { Link, useRouteMatch } from "react-router-dom";
import { Comments } from "../Comments"
import { Username } from "../Username";
import { routesConfig } from "../../config/routesConfig";
import { Button } from "../Button";

export const BottomActivityBar = () => {
    const [isShowBar, setIsShowBar] = useState(true);
    const [isShowComments, setIsShowComments] = useState(false)
    const { path } = useRouteMatch();


    const handleOnBottombarClick = () => {
        if (isShowComments) {
            setIsShowComments(state => !state)
        }
        setIsShowBar((state) => !state)
    }

    if (path === routesConfig.profile.path) {
        return <div
            className="flex flex-col absolute bottom-0  w-full z-20"
        >
            <div className="h-2 w-full bg-gradient-to-r from-yellow-400  via-red-500 to-pink-500 cursor-pointer"
                onClick={handleOnBottombarClick}
            ></div>
            <div className={`${isShowBar ? "flex" : "hidden"} flex-col items-center  md:flex-row  justify-between  bg-gray-900 w-full bg-opacity-50 p-3`}>
                <div className="flex flex-col items-center justify-center mb-2">
                    Following
                    <span>700</span>
                </div>
                <button>
                    <AiOutlinePlusCircle
                        size={30}
                    />
                </button>
                <div className="flex flex-col items-center justify-center mb-2">
                    Followers
                    <span>400</span>
                </div>
                <div className="w-full md:w-1/4 text-center">
                    <Button>
                        Edit Profile
                    </Button>
                </div>
            </div>
        </div>
    }
    return <div
        className="flex flex-col absolute bottom-0  w-full z-20"
    >
        <div className="h-2 w-full bg-gradient-to-r from-yellow-400  via-red-500 to-pink-500 cursor-pointer"
            onClick={handleOnBottombarClick}
        ></div>
        <div className={`${isShowBar ? "flex" : "hidden"} flex-col items-center  md:flex-row  justify-between  bg-gray-900 w-full bg-opacity-50 p-3`}>
            <div className="flex w-full  md:w-1/12 justify-around">
                <button>
                    <GiPunch
                        size={32}
                    />
                </button>
                <button className="block  md:hidden">
                    <AiOutlinePlusCircle
                        size={30}
                    />
                </button>
                <button
                    onClick={() => setIsShowComments(state => !state)}
                    className={`${isShowComments ? "text-yellow-400" : ""}`}
                >

                    <FaRegComment
                        size={30}
                    />
                </button>
            </div>
            <button className="hidden md:block">
                <AiOutlinePlusCircle
                    size={30}
                />
            </button>
            <Link to="/user">
                <Username />
            </Link>
        </div>
        <Comments
            isVisible={isShowComments}
        />
    </div>
}