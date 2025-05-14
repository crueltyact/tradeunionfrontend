import "./Guide.css"
import APIService from "../../API/APIService";
import { useFetching } from "../hooks/UseFetching";
import Loader from "../Loader/Loader"
import { useEffect, useState } from "react";
import GuideItem from "../GuideItem/GuideItem"
import Button from "../UI/Button/Button"
import GuideModal from "../GuideModal/GuideModal"

const Guide = () => {
    const [guides, setGuides] = useState({ worker: [], student: [] });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add-section");
    const [currentGuideId, setCurrentGuideId] = useState(null);
    const [fetchGuides, isLoading, error] = useFetching(async () => {
        const response = await APIService.getAllGuides();
        setGuides(response.data);
    });
    useEffect(() => {
        fetchGuides();
    }, []);
    const handleDeleteSection = async (sectionId) => {
        if (!window.confirm('Вы уверены, что хотите удалить этот раздел?')) return;

        try {
            await APIService.deleteGuide(sectionId);
            setGuides(prev => ({
                worker: prev.worker.filter(section => section.id !== sectionId),
                student: prev.student.filter(section => section.id !== sectionId)
            }));
        } catch (error) {
            console.error('Ошибка при удалении раздела:', error);
            alert('Не удалось удалить раздел');
        }
    };

    const handleDeleteTheme = (sectionType, sectionId, themeId) => {
        setGuides((prev) => ({
            ...prev,
            [sectionType]: prev[sectionType].map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        themes: section.themes.filter((theme) => theme.id !== themeId),
                    }
                    : section
            ),
        }));
    };

    const openAddSectionModal = () => {
        setModalMode("add-section");
        setCurrentGuideId(null);
        setIsModalOpen(true);
    };

    const openAddThemeModal = (guideId) => {
        setModalMode("add-theme");
        setCurrentGuideId(guideId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        fetchGuides(); 
    };
    return (
        <>
            <section className="guides">
                <div className="container guides__inner">
                    <h1 className="guides__title">Справочники</h1>
                    <Button onClick={openAddSectionModal}>Добавить</Button>
                    {isLoading
                        ?
                        <Loader />
                        :
                        <div className="guide-lists">
                            <h2>Работнику</h2>
                            <div className="guide-list worker">
                                {guides.worker.map((section) => (
                                    <div key={section.id} className="guide-section">
                                        <div className="guide-section__title-wrapper">
                                            <h3 style={{fontSize: "24px"}}>{section.label}</h3>
                                            <Button onClick={() => openAddThemeModal(section.id)} style={{ padding: "6px 8px" }}>Добавить тему</Button>
                                            <Button style={{ padding: "6px 8px", backgroundColor: "red" }} onClick={() => handleDeleteSection(section.id)}>Удалить раздел</Button>
                                        </div>
                                        <ul className="guide-themes">
                                        {section.themes.map((theme) => (
                                            <GuideItem key={theme.id} theme={theme} onDelete={() => handleDeleteTheme("worker", section.id, theme.id)} />
                                        ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <h2>Обучающемуся</h2>
                            <div className="guide-list student">
                                {guides.student.map((section) => (
                                    <div key={section.id} className="guide-section">
                                        <div className="guide-section__title-wrapper">
                                            <h3 style={{fontSize: "24px"}}>{section.label}</h3>
                                            <Button onClick={() => openAddThemeModal(section.id)} style={{ padding: "6px 8px" }}>Добавить тему</Button>
                                            <Button style={{ padding: "8px 10px", backgroundColor: "red" }} onClick={() => handleDeleteSection(section.id)}>Удалить раздел</Button>
                                        </div>
                                        <ul className="guide-themes">
                                            {section.themes.map((theme) => (
                                                <GuideItem key={theme.id} theme={theme} onDelete={() => handleDeleteTheme("student", section.id, theme.id)} />
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </section>
            <GuideModal isOpen={isModalOpen} onClose={closeModal} guideId={currentGuideId} mode={modalMode} />
        </>
    );
  }
  
export default Guide;