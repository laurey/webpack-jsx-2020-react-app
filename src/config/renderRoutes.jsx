import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const ReactRouteInstanceMap = {
  get(route) {
    return route._internalRouteComponent;
  },
  has(route) {
    return route._internalRouteComponent !== undefined;
  },
  set(route, value) {
    route._internalRouteComponent = value;
  },
};

const CommonRoute = (props) => {
  const { path, exact, render, strict, location, sensitive, ...rest } = props;
  return (
    <Route
      path={path}
      exact={exact}
      strict={strict}
      location={location}
      sensitive={sensitive}
      render={(props) => render({ ...props, ...rest })}
    />
  );
};

function withAuthCommonRoute(route) {
  if (ReactRouteInstanceMap.has(route)) {
    return ReactRouteInstanceMap.get(route);
  }

  const { Routes: AuthRoutes } = route;
  let len = AuthRoutes.length - 1;
  let Component = (args) => {
    const { render, ...props } = args;
    return render(props);
  };
  while (len >= 0) {
    const AuthRoute = AuthRoutes[len];
    const OldComponent = Component;
    Component = (props) => (
      <AuthRoute {...props}>
        <OldComponent {...props} />
      </AuthRoute>
    );
    len -= 1;
  }

  const ret = (args) => {
    const { render, ...rest } = args;
    return (
      <CommonRoute
        {...rest}
        render={(props) => (
          <Component {...props} route={route} render={render} />
        )}
      />
    );
  };
  ReactRouteInstanceMap.set(route, ret);
  return ret;
}

let routeChanged = false;

function wrapWithInitialProps(WrappedComponent, initialProps, extraProps = {}) {
  class WrappedInitialPropsComponent extends React.Component {
    wrappedWithInitialProps = true;

    constructor(props) {
      super(props);
      this.state = {
        extraProps: { ...extraProps },
      };
      if (!routeChanged) {
        routeChanged = props.history && props.history.action !== "POP";
      }
    }

    async componentDidMount() {
      if (routeChanged) {
        this.getInitialProps();
      }
    }

    componentDidUpdate(prevProps) {
      const { location } = this.props;
      // check if path changed,
      if (
        prevProps.location.pathname !== location.pathname ||
        prevProps.location.search !== location.search
      ) {
        routeChanged = true;
        this.getInitialProps();
      }
    }

    componentWillUnmount() {
      routeChanged = true;
    }

    async getInitialProps() {
      const { match, location } = this.props;
      const { extraProps } = this.state;
      this.setState({
        extraProps: { ...extraProps, fetchingProps: true },
      });
      const nextExtraProps =
        (await WrappedComponent.getInitialProps({
          location,
          route: match,
          prevInitialProps: extraProps,
          ...initialProps,
        })) || {};
      nextExtraProps.fetchingProps = false;
      this.setState({
        extraProps: nextExtraProps,
      });
    }

    render() {
      return (
        <WrappedComponent {...{ ...this.props, ...this.state.extraProps }} />
      );
    }
  }

  WrappedInitialPropsComponent.displayName = "WrappedInitialPropsComponent";
  return WrappedInitialPropsComponent;
}

function renderRoutes(routes, extraProps = {}, switchProps = {}) {
  console.log("1111");
  return Array.isArray(routes) ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.key || i}
              from={route.path}
              to={route.redirect}
              exact={route.exact}
              strict={route.strict}
            />
          );
        }

        const RoutesRoute = route.Routes
          ? withAuthCommonRoute(route)
          : CommonRoute;
        return (
          <RoutesRoute
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            sensitive={route.sensitive}
            render={(props) => {
              const { location } = props;
              if (routeChanged) {
                extraProps = {};
              }

              const childRoutes = renderRoutes(route.routes, extraProps, {
                location,
              });

              if (route.component) {
                const newProps = {
                  ...props,
                  ...extraProps,
                };

                let { component: Component } = route;
                if (Component.getInitialProps) {
                  const initialProps = {};
                  if (!Component.wrappedWithInitialProps) {
                    Component = wrapWithInitialProps(
                      Component,
                      initialProps,
                      extraProps
                    );
                    route.component = Component;
                  }
                }
                return (
                  <Component key={route.path} {...newProps} route={route}>
                    {childRoutes}
                  </Component>
                );
              }

              return childRoutes;
            }}
          />
        );
      })}
    </Switch>
  ) : null;
}

export { renderRoutes, renderRoutes as default };
