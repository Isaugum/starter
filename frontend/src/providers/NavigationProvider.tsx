import {createBrowserRouter, RouteObject, RouterProvider} from "react-router";
import RootLayout from "@components/layouts/RootLayout/RootLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "@pages/Login/Login";
import Register from "@pages/Register/Register";
import {ProtectedRoute} from "@components/modules/ProtectedRoute/ProtectedRoute.tsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                element: <ProtectedRoute/>,
                children: [
                    {
                        index: true,
                        element: <Dashboard/>,
                    },
                ],
            },
            {
                path: "auth",
                children: [
                    {
                        path: "login",
                        element: <Login/>,
                    },
                    {
                        path: "register",
                        element: <Register/>,
                    },
                ],
            },
        ],
    },
] as RouteObject[]);

function NavigationProvider() {
    return <RouterProvider router={routes}/>;
}

export default NavigationProvider;
