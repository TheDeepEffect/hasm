import { Route, RouteProps } from "react-router-dom"
import { AddPost } from "../components/AddPost"
import { Store } from "../Store"

export const PrivateRoutes = (props: RouteProps) => {
    return <Store>
        <AddPost />
        <Route {...props} />
    </Store>
}