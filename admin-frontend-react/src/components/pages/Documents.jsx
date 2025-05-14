import "./Documents.css"
import Button from "../UI/Button/Button"
import APIService from "../../API/APIService";
import Loader from "../Loader/Loader"
import { useFetching } from "../hooks/UseFetching";
import { useEffect, useState } from "react";
import DocumentItem from "../DocumentItem/DocumentItem"
import DocumentModal from "../DocumentModal/DocumentModal"

const Documents = () => {
    const [documents, setDocuments] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fetchDocuments, isLoading, error] = useFetching(async () => {
        const response = await APIService.getAllDocuments()
        setDocuments(response.data)
    })
    useEffect(() => {
        fetchDocuments()
    },[])

    const handleDeleteDocument = (ID) => {
        setDocuments((prevDocs) => prevDocs.filter(document => document.ID !== ID));
    };
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        fetchDocuments();
    };
    const filteredDocs = {
        student: (documents || []).filter(document => document.Type === 'student'),
        worker: (documents || []).filter(document => document.Type === 'worker'),
    };
    return (
        <>
            <section className="documents">
                <div className="container documents__inner">
                    <h1 className="documents__title">Документы</h1>
                    <Button onClick={openModal}>Добавить</Button>
                    {isLoading
                        ?
                        <Loader />
                        :
                        <div className="document-lists">
                            <h2>Работнику</h2>
                            <div className="document-list worker">
                                {filteredDocs.worker.map((document) => (
                                    <DocumentItem key={document.ID} onDelete={handleDeleteDocument} document={document} />
                                ))}
                            </div>
                            <h2>Обучающемуся</h2>
                            <div className="document-list student">
                                {filteredDocs.student.map((document) => (
                                    <DocumentItem key={document.ID} onDelete={handleDeleteDocument} document={document} />
                                ))}
                            </div>
                        </div>
                    }
                    <DocumentModal isOpen={isModalOpen} onClose={closeModal} />
                </div>
            </section>
        </>
    );
  }
  
export default Documents;