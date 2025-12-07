import App from "@/App";
import AddNotice from "@/Pages/Notice/AddNotice";
import Notice from "@/Pages/Notice/Notice";
import NoticeDetails from "@/Pages/Notice/NoticeDetails";
import UpdateNotice from "@/Pages/Notice/updateNotice";
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
            {
                path:"NoticeDetails/:id",
                element:<NoticeDetails></NoticeDetails>
            },
            {
                path:"updateNotice/:id",
                element:<UpdateNotice></UpdateNotice>
            }
          
        ]
    }
])

export default router;