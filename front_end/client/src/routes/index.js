import CoreLayout from "../layouts/CoreLayout/CoreLayout";
import Home from "./Home/index";
import * as Order from "./Order/index";

export function createRoutes(store) {
    return {
        path: '/',
        component: CoreLayout,
        indexRoute: Home,
        childRoutes: [
            Order.OrderRouter(store),
            Order.OrderKanbanRouter(store),
        ]
    };
}

export default createRoutes;
