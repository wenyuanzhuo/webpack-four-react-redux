// 伪代码
export const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
    routes ? (
        <Switch {...switchProps}>
            {routes.map((route, i) => ( 
            <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={props => (
                <route.component {...props} {...extraProps} route={route} />
            )}
            />
        ))}
        </Switch>
    ) : null