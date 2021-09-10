import { Route, RouteProps, Redirect } from "react-router-dom";
import { AddPost } from "../components/AddPost";
import { useAuth } from "../utils/hooks/useAuth";
// @ts-ignore
import { CloudinaryContext } from "cloudinary-react";
export const PrivateRoutes = (props: RouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Redirect to='/login' />;
  }
  return (
    <CloudinaryContext cloudName='jasm'>
      <AddPost />
      <Route {...props} />
    </CloudinaryContext>
  );
};
