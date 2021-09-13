import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useStore } from "../../utils/hooks/useStore";
import { Button } from "../Button";
import { Input } from "../Input";

export const AddPost = () => {
  const { state, dispatch } = useStore();
  const {
    AddPost: { visible },
  } = state;

  const handleOnCloseClick = (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch({ type: "TOGGLE_ADD_POST_DIALOGUE" });
  };
  const [image, setImage] = useState("");
  const handleOnImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const filePrivew = URL.createObjectURL(file);
      setImage(filePrivew);
    }
  };

  return (
    <div
      className={`${
        visible ? "flex" : "hidden"
      } min-h-screen min-w-full fixed bg-transparent items-center justify-center z-50 backdrop-filter  backdrop-blur-lg overflow-x-auto`}
    >
      <div className='flex items-center justify-center text-white bg-black bg-opacity-50 w-5/6 h-screen relative'>
        <button className='absolute right-3 top-2' onClick={handleOnCloseClick}>
          <AiOutlineCloseCircle size={30} />
        </button>
        <div className='w-full h-full flex flex-col items-center justify-around  p-2'>
          <div className='text-4xl'>Add Post</div>
          <form className='flex flex-col items-center justify-around h-full w-full'>
            <div className='mb-3 ring-2 ring-red-500 h-2/4 w-4/6 md:w-3/6'>
              <label className='cursor-pointer'>
                {image ? (
                  ""
                ) : (
                  <p className='flex items-center justify-center w-full h-full'>
                    Click here to add image
                  </p>
                )}
                <img
                  className={`max-h-screen max-w-screen object-contain ${
                    image ? "w-5/6 h-5/6" : ""
                  }`}
                  src={image}
                  alt=''
                />
                <Input
                  type='file'
                  className='hidden z-20'
                  onChange={handleOnImageChange}
                />
              </label>
            </div>
            <textarea
              className='h-1/4 w-3/6 text-black'
              placeholder='Description...'
            />
            <label className='flex items-center justify-center w-4/6 md:w-3/6'>
              <input type='checkbox' className='mr-2' />
              Keep this post private
            </label>
            <Button>Add</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
