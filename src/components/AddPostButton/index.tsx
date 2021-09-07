import { AiOutlinePlusCircle } from "react-icons/ai";
import { useStore } from "../../utils/Hooks/useStore";

type IAddPostButtonProps = {
  className?: string;
};
export const AddPostButton = (props: IAddPostButtonProps) => {
  const { dispatch } = useStore();
  const handleOnAddPostButtonClick = () => {
    dispatch({ type: "TOGGLE_ADD_POST_DIALOGUE" });
  };
  return (
    <button className={props.className} onClick={handleOnAddPostButtonClick}>
      <AiOutlinePlusCircle size={30} />
    </button>
  );
};
