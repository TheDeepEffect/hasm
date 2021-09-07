import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { GiPunch } from "react-icons/gi";
import { Link, useRouteMatch } from "react-router-dom";
import { Comments } from "../Comments";
import { Username } from "../Username";
import { routesConfig } from "../../config/routesConfig";
import { Button } from "../Button";
import { AddPostButton } from "../AddPostButton";
import { useStore } from "../../utils/Hooks/useStore";

export const BottomActivityBar = () => {
  const [isShowComments, setIsShowComments] = useState(false);
  const { path } = useRouteMatch();
  const { state, dispatch } = useStore();
  const {
    bottomActivityBar: { visible },
  } = state;
  console.log(state);

  const handleOnBottombarClick = () => {
    if (isShowComments) {
      setIsShowComments((state) => !state);
    }
    dispatch({ type: "TOGGLE_BOTTOM_ACTIVITY_BAR" });
  };

  const handleOnEditProfileClick = () => {
    dispatch({ type: "TOGGLE_EDIT_PROFILE_DIALOGUE" });
  };

  if (path === routesConfig.profile.path) {
    return (
      <div className='flex flex-col absolute bottom-0  w-full z-20'>
        <div
          className='h-2 w-full bg-gradient-to-r from-yellow-400  via-red-500 to-pink-500 cursor-pointer'
          onClick={handleOnBottombarClick}
        ></div>
        <div
          className={`${
            visible ? "flex" : "hidden"
          } flex-col items-center  md:flex-row  justify-between  bg-gray-900 w-full bg-opacity-50 p-3`}
        >
          <div className='flex flex-col items-center justify-center mb-2'>
            Following
            <span>700</span>
          </div>
          <AddPostButton />
          <div className='flex flex-col items-center justify-center mb-2'>
            Followers
            <span>400</span>
          </div>
          <div className='w-full md:w-1/4 text-center'>
            <Button onClick={handleOnEditProfileClick}>Edit Profile</Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='flex flex-col absolute bottom-0  w-full z-20'>
      <div
        className='h-2 w-full bg-gradient-to-r from-yellow-400  via-red-500 to-pink-500 cursor-pointer'
        onClick={handleOnBottombarClick}
      ></div>
      <div
        className={`${
          visible ? "flex" : "hidden"
        } flex-col items-center  md:flex-row  justify-between  bg-gray-900 w-full bg-opacity-50 p-3`}
      >
        <div className='flex w-full  md:w-1/12 justify-around'>
          <button>
            <GiPunch size={32} />
          </button>
          <AddPostButton className='block  md:hidden' />
          <button
            onClick={() => setIsShowComments((state) => !state)}
            className={`${isShowComments ? "text-yellow-400" : ""}`}
          >
            <FaRegComment size={30} />
          </button>
        </div>
        <AddPostButton className='hidden md:block' />
        <Link to='/user'>
          <Username />
        </Link>
      </div>
      <Comments isVisible={isShowComments} />
    </div>
  );
};
