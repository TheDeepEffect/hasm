import { createContext, ReactNode, useReducer } from "react";
import { getLocalStorage, setLocalStorage } from "../../utils/helpers";

type IStoreProps = {
  children: ReactNode;
};
type IAction =
  | { type: "TOGGLE_ADD_POST_DIALOGUE" }
  | { type: "TOGGLE_EDIT_PROFILE_DIALOGUE" }
  | { type: "TOGGLE_NAVBAR" }
  | { type: "TOGGLE_BOTTOM_ACTIVITY_BAR" };
type iDispatch = (action: IAction) => void;
type IState = {
  AddPost: {
    visible: boolean;
  };
  EditProfile: {
    visible: boolean;
  };
  navbar: {
    visible: boolean;
  };
  bottomActivityBar: {
    visible: boolean;
  };
};

const initialNavbarState = getLocalStorage("navbar");
const initialBottomBarState = getLocalStorage("bottom-bar");
const initialState = {
  AddPost: {
    visible: false,
  },
  EditProfile: {
    visible: false,
  },
  navbar: {
    visible: initialNavbarState,
  },
  bottomActivityBar: {
    visible: initialBottomBarState,
  },
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case "TOGGLE_ADD_POST_DIALOGUE": {
      return {
        ...state,
        AddPost: {
          ...state.AddPost,
          visible: !state.AddPost.visible,
        },
      };
    }
    case "TOGGLE_EDIT_PROFILE_DIALOGUE": {
      return {
        ...state,
        EditProfile: {
          ...state.EditProfile,
          visible: !state.EditProfile.visible,
        },
      };
    }
    case "TOGGLE_NAVBAR": {
      setLocalStorage("navbar", !state.navbar.visible);
      return {
        ...state,
        navbar: {
          ...state.navbar,
          visible: !state.navbar.visible,
        },
      };
    }
    case "TOGGLE_BOTTOM_ACTIVITY_BAR": {
      setLocalStorage("bottom-bar", !state.bottomActivityBar.visible);
      return {
        ...state,
        bottomActivityBar: {
          ...state.bottomActivityBar,
          visible: !state.bottomActivityBar.visible,
        },
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};

export const Context = createContext<
  { state: IState; dispatch: iDispatch } | undefined
>(undefined);

export const Store = (props: IStoreProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
