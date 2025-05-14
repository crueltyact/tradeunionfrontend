import "./Projects.css"
import FadeInSection from "../../FadeInSection"
import HeroSection from "../HeroSection/HeroSection";
import TabSwitcher from "../TabSwitcher/TabSwitcher"
import APIService from "../../API/APIService";
import Loader from "../Loader/Loader"
import { useFetching } from "../hooks/UseFetching";
import { useEffect, useState } from "react";
import ProjectsItemList from "../ProjectsItemList/ProjectsItemList"

const Projects = () => {
    const [projects, setProjects] = useState({ worker: [], student: [] })
    const [fetchProjects, isLoading, error] = useFetching(async () => {
        const response = await APIService.getAllProjects()
        setProjects(response.data)
        console.log(projects)
    })
    useEffect(() => {
        fetchProjects()
    },[])
    return (
        <>
            <FadeInSection delay={0.2}>
                <HeroSection title="Профком — это про проекты" style={{ backgroundImage: 'url("/projects_bg.jpg")' }} />
            </FadeInSection>

            <FadeInSection>
                {isLoading ? <Loader />
                : 
                <TabSwitcher
                 description={"В данном разделе представлены программы и инициативы, реализуемые Профсоюзом для членов организации."}
                >
                      {(activeTab) => <ProjectsItemList activeTab={activeTab} projects={projects} />}
                </TabSwitcher>
                }
            </FadeInSection>
        </>
    );
  }
  
export default Projects;