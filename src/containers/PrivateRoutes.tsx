import { Route, RouteProps } from "react-router-dom";
import { AddPost } from "../components/AddPost";

export const PrivateRoutes = (props: RouteProps) => {
  return (
    <>
      <AddPost />
      <Route {...props} />
    </>
  );
};
