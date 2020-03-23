import React, { useMemo } from 'react';
import getRoutes from './routes';
import {BrowserRouter, HashRouter } from 'react-router-dom';
import {Switch,Route} from 'react-router';




const Router = ({ children }: any) => {

  const routes = useMemo(() => getRoutes(), []);
  return (
    <BrowserRouter>
        <HashRouter>
          <Route
            render={routeProps => children(
              <Switch>
                {routes.map(({ component,  exact, path }, i) => (
                  <Route
                    key={i}
                    component={component}
                    exact={exact}
                    path={path}
                  />
                ))}
              </Switch>,
              routeProps,
            )}
          />
        </HashRouter>
    </BrowserRouter>
  );
};

export default Router;