import { ReactNode } from 'react'
import { LinkProps } from 'react-router-dom'
import { login_login_AuthPayload_user } from '../generated/login'

export type IState = {
    name: string
    email: string
    username: string
    password: string
    confirmPassword: string
    imageFile: string | null
    imagePreview: string
}

export type IKey = keyof IState
type IPayload = {
    key: IKey
    value: string | null
}
export type IAction = { type: 'SET_STATE'; payload: IPayload }

export type IReducer = (state: IState, action: IAction) => IState

export type IUseLoginProps = {
    onCompleted?: () => void
}

export type IAddPostButtonProps = {
    className?: string
}

export type IFeedItem = { image_url: string }

export type IFeedNavigationWrapperProps = {
    children: ReactNode
}

export type IInputProps = {
    valid?: boolean
    message?: string
} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>
export type ILogoProps = {
    height?: string | number
    wdith?: string | number
    classes?: string
}

export type INavbarProps = {
    children: ReactNode
}

export type INavItemProps = LinkProps & React.RefAttributes<HTMLAnchorElement>

export type IPost = { image_url: string }

export type IProfileGridProps = {
    columns: string[][]
}

export type IUsernameProps = {
    profile_pic?: string
    username?: string
}

export type IAuthProviderProps = {
    children: ReactNode
}

export type ICurrenUser = {
    expiresAt: string
    user: login_login_AuthPayload_user | null
}

export type IStoreProps = {
    children: ReactNode
}
export type IStoreAction =
    | { type: 'TOGGLE_ADD_POST_DIALOGUE' }
    | { type: 'TOGGLE_EDIT_PROFILE_DIALOGUE' }
    | { type: 'TOGGLE_NAVBAR' }
    | { type: 'TOGGLE_BOTTOM_ACTIVITY_BAR' }
    | { type: 'SET_CURRENT_POST'; payload: number }
export type IStoreDispatch = (action: IStoreAction) => void

export type IStoreState = {
    AddPost: {
        visible: boolean
    }
    EditProfile: {
        visible: boolean
    }
    navbar: {
        visible: boolean
    }
    bottomActivityBar: {
        visible: boolean
    }
    currentPost: number
}

export type IValidState = {
    username: { valid: boolean; message: string }
    password: { valid: boolean; message: string }
}

export type IChunkProps = {
    arr: string[]
    size: number
}
export type IGET = {
    url: string
    headers?: HeadersInit
}

export type IAddPostState = {
    imageFile: string
    imagePreview: string
    description: string
    isPrivate: boolean
}
export type IAddPostKey = keyof IAddPostState
export type IAddPostValue = string | boolean | undefined

export type IUseLogoutProps = {
    onCompleted?: () => void
}

export type IInputValue = React.ChangeEvent<HTMLInputElement>
