import Home from "../pages/Home.jsx"
import News from "../pages/News.jsx"
import Projects from "../pages/Projects.jsx"
import Guide from "../pages/Guide.jsx"
import Documents from "../pages/Documents.jsx"
import Auth from "../pages/Auth.jsx"
import InviteUser from "../pages/InviteUser.jsx"
import Chat from "../pages/Chat.jsx"
export const appRoutes = [
    {path: '/', component: Home},
    {path: '/news', component: News},
    {path: '/projects', component: Projects},
    {path: '/guide', component: Guide},
    {path: '/documents', component: Documents},
    {path: '/invite', component: InviteUser},
    {path: '/chat', component: Chat},
]

export const publicRoutes = [
    {path: '/login', component: Auth },
]