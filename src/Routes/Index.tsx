import App from "@/App";
import AddNotice from "@/Pages/Notice/AddNotice";
import Notice from "@/Pages/Notice/Notice";
import UserList from "@/Pages/User/UserList";
import { createBrowserRouter } from "react-router";


const router= createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {
                path:"users",
                element:<UserList></UserList>
            },
            {
                path:"addNotice",
                element:<AddNotice></AddNotice>
            },
            {
                path:"Notice",
                element:<Notice></Notice>
            },
        ]
    }
])

export default router;