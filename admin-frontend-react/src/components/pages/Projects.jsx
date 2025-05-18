import "./Projects.css"
import APIService from "../../API/APIService";
import Loader from "../Loader/Loader"
import { useFetching } from "../hooks/UseFetching";
import { useEffect, useState } from "react";
import ProjectsItem from "../ProjectsItem/ProjectsItem";
import Button from "../UI/Button/Button";
import ProjectsModal from "../ProjectsModal/ProjectsModal";
import EnrichProfileModal from "../EnrichProfileModal/EnrichProfileModal";

const Projects = () => {
    const [isEnrichModalOpen, setIsEnrichModalOpen] = useState(false);
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
            if (error.status === 403) {
                alert("Заполните персональные данные")
                setIsEnrichModalOpen(true);
            } else {
                alert('Не удалось удалить проект');
            }
            console.error('Ошибка при удалении проекта:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        fetchProjects();
    };
    const handleProfileFilled = () => {
        setIsEnrichModalOpen(false);
    }
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
                                {projects.worker && projects.worker.map((item) => (   
                                    <ProjectsItem key={item.id} item={item} onDelete={handleDeleteProject} />
                                ))}
                                {!projects.worker && <p>Проекты не найдены</p>}
                            </div>
                            <h2>Обучающемуся</h2>
                            <div className="projects-list student">
                                {projects.student && projects.student.map((item) => (
                                    <ProjectsItem key={item.id} item={item} onDelete={handleDeleteProject} />
                                ))}
                                {!projects.student && <p>Проекты не найдены</p>}
                            </div>
                        </div>
                    }
                </div>
            </section>
            <ProjectsModal isOpen={isModalOpen} onClose={closeModal} />
            <EnrichProfileModal
                isOpen={isEnrichModalOpen}
                onClose={() => setIsEnrichModalOpen(false)}
                onProfileFilled={handleProfileFilled}
            />
        </>
    );
  }
  
export default Projects;