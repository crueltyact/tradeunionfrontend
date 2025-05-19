import "./Documents.css"
import FadeInSection from "../../FadeInSection"
import HeroSection from "../HeroSection/HeroSection";
import TabSwitcher from "../TabSwitcher/TabSwitcher"
import APIService from "../../API/APIService";
import Loader from "../Loader/Loader"
import { useFetching } from "../hooks/UseFetching";
import { useEffect, useState } from "react";
import DocumentItemList from "../DocumentItemList/DocumentItemList";

const Documents = () => {
    const [documents, setDocuments] = useState([])
    const [fetchDocuments, isLoading, error] = useFetching(async () => {
        const response = await APIService.getAllDocuments()
        setDocuments(response.data)
        console.log(response.data)
    })
    useEffect(() => {
        fetchDocuments()
    },[])
    return (
        <>
            <FadeInSection delay={0.2}>
                <HeroSection title="Cкачайте документы, которые вас интересуют" style={{ backgroundImage: 'url("/documents_bg.jpg")' }} />
            </FadeInSection>

            <FadeInSection>
                {isLoading ? <Loader />
                : 
                <TabSwitcher>
                      {(activeTab) => <DocumentItemList activeTab={activeTab} documents={documents} />}
                </TabSwitcher>
                }
            </FadeInSection>
        </>
    );
  }
  
export default Documents;