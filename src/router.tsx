import { Navigate, createHashRouter } from "react-router-dom";
import App from "./App";
import { AppShell } from "./app-shell/app-shell";
import { Users } from "./components/users/users";
import { ErrorPage } from "./components/error/error-page";
import { UserDetails } from "./components/user-details/user-details";
import { Login } from "./components/login/login";

const router = createHashRouter([
    {
        path: '',
        element: <App />,
        children: [
            {
                path: 'app',
                element: <AppShell />,
                children: [
                    {
                        path: 'users',
                        element: <Users />
                    },
                    {
                        path: 'users/details',
                        element: <UserDetails />
                    },
                    {
                        path: '*',
                        element: <ErrorPage />,
                    }
                ]
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: '',
                element: <Navigate to="/login" />
            }
        ]
    }
])

export default router