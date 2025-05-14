import "./Projects.css"
import APIService from "../../API/APIService";
import Loader from "../Loader/Loader"
import { useFetching } from "../hooks/UseFetching";
import { useEffect, useState } from "react";
import ProjectsItem from "../ProjectsItem/ProjectsItem";
import Button from "../UI/Button/Button";
import ProjectsModal from "../ProjectsModal/ProjectsModal";

const Projects = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState({ worker: [], student: [] })
    const [fetchProjects, isLoading, error] = useFetching(async () => {
        const response = await APIService.getAllProjects()
        setProjects(response.data)
    })
    useEffect(() => {
        fetchProjects()
    },[])
    const handleDeleteProject = async (id) => {
        try {
            await APIService.deleteProject(id);
            setProjects(prev => ({
                worker: prev.worker.filter(p => p.id !== id),
                student: prev.student.filter(p => p.id !== id)
            }));
        } catch (error) {
            console.error('Ошибка при удалении проекта:', error);
            alert('Не удалось удалить проект');
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        fetchProjects();
    };
    return (
        <>
            <section className="projects">
                <div className="container projects__inner">
                    <h1 className="projects__title">Проекты</h1>
                    <Button onClick={openModal}>Добавить</Button>
                    {isLoading
                        ?
                        <Loader />
                        :
                        <div className="projects-lists">
                            <h2>Работнику</h2>
                            <div className="projects-list worker">
                                {projects.worker.map((item) => (   
                                    <ProjectsItem key={item.id} item={item} onDelete={handleDeleteProject} />
                                ))}
                            </div>
                            <h2>Обучающемуся</h2>
                            <div className="projects-list student">
                                {projects.student.map((item) => (
                                    <ProjectsItem key={item.id} item={item} onDelete={handleDeleteProject} />
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </section>
            <ProjectsModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
  }
  
export default Projects;