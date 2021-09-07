import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { routes } from "./config/routes";
import { PrivateRoutes } from "./containers/PrivateRoutes";
import { PublicRoutes } from "./containers/PublicRoutes";
import { Store } from "./Store";
const App = () => {
  return (
    <Store>
      <Router>
        <Switch>
          {Object.keys(routes).map((key) => {
            const value = routes[key];
            const { isPrivate } = value;
            const SelectedRoute = isPrivate ? (
              <PrivateRoutes {...value} key={key} />
            ) : (
              <PublicRoutes {...value} key={key} />
            );
            return SelectedRoute;
          })}
          <Route path='*'>
            <h2>404</h2>
          </Route>
        </Switch>
      </Router>
    </Store>
  );
};

export default App;
