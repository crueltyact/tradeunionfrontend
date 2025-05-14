import "./Guide.css"
import FadeInSection from "../../FadeInSection"
import HeroSection from "../HeroSection/HeroSection";
import TabSwitcher from "../TabSwitcher/TabSwitcher"
import APIService from "../../API/APIService";
import { useFetching } from "../hooks/UseFetching";
import Loader from "../Loader/Loader"
import { useEffect, useState } from "react";
import GuideItemList from "../GuideItemList/GuideItemList";

const Guide = () => {
    const [guides, setGuides] = useState({ worker: [], student: [] });
    const [fetchGuides, isLoading, error] = useFetching(async () => {
        const response = await APIService.getAllGuides();
        setGuides(response.data);
    });
    useEffect(() => {
        fetchGuides();
    }, []);
    return (
        <>
            <FadeInSection delay={0.2}>
                <HeroSection title="Просто о сложном" style={{ backgroundImage: 'url("/guide_bg.jpg")' }} />
            </FadeInSection>

            <FadeInSection>
                {isLoading
                    ?
                        <Loader />
                    :
                    <TabSwitcher
                        description={"В этом разделе вы найдете нужные справочные материалы. Мы собрали всю необходимую информацию в удобном формате, чтобы вы могли легко найти ответы на свои вопросы. Все, что нужно, теперь под рукой!"}
                    >
                        {(activeTab) => <GuideItemList activeTab={activeTab} guides={guides} />}
                    </TabSwitcher>
                }
            </FadeInSection>

        </>
    );
  }
  
export default Guide;