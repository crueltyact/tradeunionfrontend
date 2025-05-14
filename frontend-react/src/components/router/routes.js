import Home from "../pages/Home.jsx"
import News from "../pages/News.jsx"
import NewsIdPage from "../pages/NewsIdPage.jsx"
import Projects from "../pages/Projects.jsx"
import Guide from "../pages/Guide.jsx"
import Documents from "../pages/Documents.jsx"
export const appRoutes = [
    {path: '/', component: Home},
    {path: '/news', component: News},
    {path: '/news/:id', component: NewsIdPage},
    {path: '/projects', component: Projects},
    {path: '/guide', component: Guide},
    {path: '/documents', component: Documents},
]