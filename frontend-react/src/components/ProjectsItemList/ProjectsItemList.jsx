import ProjectsItem from "../ProjectsItem/ProjectsItem";

const ProjectsItemList = ({activeTab, projects}) => {
    const currentTabData = projects[activeTab];
    if (!currentTabData || currentTabData.length === 0) return <p>Проекты не найдены</p>
    return (
        <>
            <div className="projects-list">
                {currentTabData.map((item) => (
                    <ProjectsItem key={item.id} item={item} />
                ))}
            </div>
        </>
    );
  }
  
export default ProjectsItemList;