import { createContext, ReactNode, useReducer } from "react"

type IStoreProps = {
    children: ReactNode
}
type IAction = { type: 'TOGGLE_ADD_POST_DIALOG' }
type iDispatch = (action: IAction) => void
type IState = typeof initialState;

const initialState = {
    AddPost: {
        visible: false
    }
}

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case "TOGGLE_ADD_POST_DIALOG": {
            return {
                ...state,
                AddPost: {
                    ...state.AddPost,
                    visible: !state.AddPost.visible
                }
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

export const Context = createContext<{ state: IState, dispatch: iDispatch } | undefined>(undefined);

export const Store = (props: IStoreProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { children } = props;
    return <Context.Provider
        value={{ state, dispatch }}
    >
        {children}
    </Context.Provider>
}